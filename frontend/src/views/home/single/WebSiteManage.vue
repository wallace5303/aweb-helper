<template>
  <div>
    <standard-form-row title="" block style="padding-bottom: 11px;">
      <router-link v-if="!token" :to="{ name: 'login' }">
        <a-button type="default" icon="login" style="margin-right:10px;">
          去登录
        </a-button>
      </router-link>
      <span style="margin-right: 10px;">
        <a-select placeholder="类型" style="width:100px;" v-decorator="['type2']" @change="handleType2">
          <a-select-option value="0">全部</a-select-option>
          <a-select-option :key="index" v-for="(item, index) in myTypes" :value="item.uwtid">{{ item.name }}</a-select-option>
        </a-select>
      </span>
      <a-radio-group style="margin-right: 10px;" v-model="category" @change="handleChangeType(category)">
        <a-radio-button value="1">普通</a-radio-button>
        <a-radio-button value="2">隐私</a-radio-button>
      </a-radio-group>
      <a-input-search
        v-model="pwdText"
        type="password"
        v-if="category === '2' && !unlockFlag"
        placeholder="请输入密码"
        style="margin-right: 10px;width: 200px;"
        @search="handleUnlock">
        <a-button slot="enterButton">
          解锁
        </a-button>
      </a-input-search>
      <span v-else-if="category === '2' && unlockFlag">
        <a-button style="margin-right: 10px;" @click="handleLock">
          立即上锁
        </a-button>
      </span>
      <a-radio-group style="margin-right: 10px;" v-model="sort" @change="handleSort(sort)">
        <a-radio-button value="uwsid">时间</a-radio-button>
        <a-radio-button value="name">名称</a-radio-button>
      </a-radio-group>
      <!-- <a-input-search style="margin-left: 16px; width: 272px;" @search="handleSearch"/> -->
    </standard-form-row>
    <a-card
      v-if="isShowData"
      style="margin-top: 0px"
      :bordered="true"
      title="">
      <div class="operate">
        <a-button type="dashed" style="width: 100%" icon="plus" @click="handleAdd">添加</a-button>
      </div>
      <a-list :loading="loading" size="large">
        <a-list-item :key="index" v-for="(item, index) in webList" style="padding-top: 10px;padding-bottom: 10px;">
          <a-list-item-meta :description="item.url">
            <a-avatar v-if="item.img" slot="avatar" size="default" shape="square" :src="item.img"></a-avatar>
            <a-avatar
              v-else
              :style="item.style || 'color: #fff;backgroundColor:#2BA245;'"
              slot="avatar"
              size="default"
              shape="square"
              :src="item.img"
            >
              {{ item.name.substr(0,1) }}
            </a-avatar>
            <a slot="title" :href="item.url" target="_blank">{{ item.name }}</a>
          </a-list-item-meta>
          <div class="list-number">
            <span>{{ item.type_name }}</span>
          </div>
          <div class="list-number">
            <a-tooltip>
              <template slot="title">
                数字大的在前
              </template>
              <span>排序：{{ item.sort }}</span>
            </a-tooltip>
          </div>
          <div class="list-view">
            <a :href="item.url" target="_blank">查看</a>
            <a-divider type="vertical" />
            <a @click="handleEdit(item)">编辑</a>
            <a-divider type="vertical" />
            <!-- <a @click="handleDel(item)">删除</a> -->
            <a-popconfirm
              title="确定删除么？"
              @confirm="delConfirm(item.uwsid)">
              <a-icon slot="icon" type="question-circle-o" style="color: red" />
              <a href="#">删除</a>
            </a-popconfirm>
          </div>
        </a-list-item>
        <span />
        <div slot="footer" v-if="pageInfo.next_page_url" style="text-align: center; margin-top: 1px;">
          <a-button @click="loadMore" :loading="loadingMore">加载更多</a-button>
        </div>
      </a-list>
      <user-web-form
        ref="webSaveModal"
        :visible="visible"
        :loading="confirmLoading"
        :model="mdl"
        :category="category"
        :pMyTypes="myTypes"
        @cancel="handleCancel"
        @ok="handleOk"
      />
    </a-card>
  </div>
</template>

<script>
import md5 from 'md5'
import storage from 'store'
import { ACCESS_TOKEN, MPWD, UNLOCK_FLAG } from '@/store/mutation-types'
import UserWebForm from './modules/UserWebForm'
import { outApi } from '@/api/main'
import { StandardFormRow } from '@/components'

export default {
  name: 'WebSiteManage',
  components: {
    UserWebForm,
    StandardFormRow
  },
  data () {
    return {
      token: null,
      webList: [],
      pageInfo: {},
      myTypes: [],
      loading: false,
      loadingMore: false,
      page: 1,
      sort: 'uwsid',
      visible: false,
      confirmLoading: false,
      type2: 0,
      mdl: null,
      pwdText: '',
      category: this.$route.params.category || '1',
      isShowData: true
    }
  },
  mounted () {
    this.getToken()
    this.getUnlockFlag()
    this.getMyTypes()
    this.getManageUserSite()
  },
  methods: {
    getToken () {
      this.token = storage.get(ACCESS_TOKEN)
    },
    handleUnlock (value) {
      if (!this.token) {
        this.$message.error('请登录')
        return false
      }
      const mpwd = storage.get(MPWD)
      if (mpwd !== md5(value)) {
        this.$message.error('密码错误')
        return false
      }
      // 设置过期时间
      const expiresTime = new Date().getTime() + 1000 * 60 * 5
      storage.set(UNLOCK_FLAG, expiresTime)
      this.unlockFlag = 1
      this.isShowData = true
      this.getMyTypes()
      this.getManageUserSite()
      this.pwdText = ''
    },
    handleLock () {
      // 设置过期时间
      storage.remove(UNLOCK_FLAG)
      this.unlockFlag = 0
      // 切换到普通
      this.handleChangeType('1')
    },
    getUnlockFlag () {
      const flagTime = Number(storage.get(UNLOCK_FLAG))
      const currentTime = new Date().getTime()
      this.unlockFlag = currentTime < flagTime ? 1 : 0
    },
    handleSearch (value) {
      this.sort = 'uwsid'
      this.page = 1
      this.getManageUserSite()
    },
    handleChangeType (category) {
      this.category = category
      this.sort = 'uwsid'
      this.page = 1
      this.webList = []
      this.getMyTypes()
      this.getManageUserSite()
    },
    handleSort (sort) {
      this.sort = sort
      this.page = 1
      this.webList = []
      this.getManageUserSite()
    },
    handleType2 (value) {
      this.type2 = value
      this.page = 1
      this.webList = []
      this.getManageUserSite()
    },
    handleAdd () {
      if (!this.token) {
        this.$message.error('请登录')
        return false
      }
      this.mdl = {
        id: 0,
        name: '',
        url: '',
        sort: 0
      }
      this.visible = true
    },
    delConfirm (delId) {
      this.loading = true
      const params = {
        out_url: 'delMySite',
        method: 'POST',
        data: {
          uwsid: delId,
          category: this.category
        }
      }
      outApi(params).then(res => {
        if (res.code === 0) {
          this.handleChangeType(this.category)
          this.$message.info('删除成功')
        }
      }).catch(err => {
        console.log('err:', err)
      }).finally(() => {
      })
    },
    handleEdit (record) {
      if (!this.token) {
        this.$message.error('请登录')
        return false
      }
      this.mdl = {
        id: record.uwsid,
        name: record.name,
        url: record.url,
        sort: record.sort
      }
      this.visible = true
    },
    getManageUserSite () {
      if (!this.token) {
        this.isShowData = false
        return false
      } else if (this.category === '2' && !this.unlockFlag) {
        this.isShowData = false
        return false
      } else {
        this.isShowData = true
      }
      this.loading = true
      const params = {
        out_url: 'manageUserSite',
        method: 'POST',
        data: {
          page: this.page,
          sort: this.sort,
          type2: this.type2,
          category: this.category
        }
      }
      outApi(params).then(res => {
        if (res.code === 0) {
          this.pageInfo = res.data.list
          this.webList = this.webList.concat(this.pageInfo.data)
        }
      }).catch(err => {
        console.log('err:', err)
      }).finally(() => {
        this.loading = false
        this.loadingMore = false
      })
    },
    loadMore () {
      this.loadingMore = true
      this.page += 1
      this.getManageUserSite()
    },
    getMyTypes () {
      if (!this.token) {
        return false
      } else if (this.category === '2' && !this.unlockFlag) {
        return false
      }

      const params = {
        out_url: 'myTypes',
        method: 'POST',
        data: {
          category: this.category
        }
      }
      outApi(params).then(res => {
        if (res.code !== 0) {
          return false
        }
        this.myTypes = res.data
        }).catch(err => {
          console.log('err:', err)
        })
    },
    handleCancel () {
      this.visible = false
      this.confirmLoading = false
      const form = this.$refs.webSaveModal.form
    },
    handleOk () {
      const form = this.$refs.webSaveModal.form
      this.confirmLoading = true
      form.validateFields((errors, values) => {
        const alertMessageFail = '网络异常'
        if (!errors) {
          const params = {
            out_url: 'saveMySite',
            method: 'POST',
            data: {
              uwsid: values.id,
              category: this.category,
              type: values.type,
              name: values.name,
              url: values.url,
              sort: values.sort
            }
          }
          outApi(params).then(res => {
            if (res.code !== 0) {
              this.$message.info(alertMessageFail + '[' + res.code + ']')
              return false
            }
            this.handleChangeType(this.category)
          }).catch(err => {
            console.log('err:', err)
          }).finally(() => {
            this.visible = false
            this.confirmLoading = false
          })
        } else {
          this.confirmLoading = false
        }
      })
    }
  }
}
</script>

<style lang="less" scoped>
.ant-avatar-lg {
    width: 48px;
    height: 48px;
    line-height: 48px;
}
.list-number {
  width: 10%;
  text-align: left;
}
.list-view {
  width: 20%;
  text-align: center;
}
</style>
