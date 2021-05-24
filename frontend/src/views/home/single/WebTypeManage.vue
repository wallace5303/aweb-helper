<template>
  <div>
    <standard-form-row title="" block style="padding-bottom: 11px;">
      <router-link v-if="!token" :to="{ name: 'login' }">
        <a-button type="default" icon="login" style="margin-right:10px;">
          去登录
        </a-button>
      </router-link>
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
        <a-list-item :key="index" v-for="(item, index) in myTypes" style="padding-top: 10px;padding-bottom: 10px;">
          <a-list-item-meta>
            <a slot="title">{{ item.name }}</a>
          </a-list-item-meta>
          <div class="list-number">
            <a-tooltip>
              <template slot="title">
                数字大的在前
              </template>
              <span>排序：{{ item.sort }}</span>
            </a-tooltip>
          </div>
          <div class="list-view">
            <a @click="handleEdit(item)">编辑</a>
            <a-divider type="vertical" />
            <a-popconfirm
              title="确定删除么？"
              @confirm="delConfirm(item.uwtid)">
              <a-icon slot="icon" type="question-circle-o" style="color: red" />
              <a href="#">删除</a>
            </a-popconfirm>
          </div>
        </a-list-item>
        <span />
      </a-list>
      <user-web-type-form
        ref="webSaveModal"
        :visible="visible"
        :loading="confirmLoading"
        :model="mdl"
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
import UserWebTypeForm from './modules/UserWebTypeForm'
import { outApi } from '@/api/main'
import { StandardFormRow } from '@/components'

export default {
  name: 'WebTypeManage',
  components: {
    UserWebTypeForm,
    StandardFormRow
  },
  data () {
    return {
      token: null,
      myTypes: [],
      loading: false,
      loadingMore: false,
      visible: false,
      confirmLoading: false,
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
      const expiresTime = new Date().getTime() + 1000 * 60 * 1
      storage.set(UNLOCK_FLAG, expiresTime)
      this.unlockFlag = 1
      this.isShowData = true
      this.getMyTypes()
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
    handleChangeType (category) {
      this.category = category
      this.myTypes = []
      this.getMyTypes()
    },
    handleAdd () {
      if (!this.token) {
        this.$message.error('请登录')
        return false
      }
      this.visible = true
      this.mdl = {
        id: 0,
        name: '',
        sort: 0
      }
    },
    delConfirm (delId) {
      const params = {
        out_url: 'myTypesDel',
        method: 'POST',
        data: {
          uwtid: delId
        }
      }
      outApi(params).then(res => {
        if (res.code === 0) {
          this.getMyTypes()
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
      this.visible = true
      this.mdl = {
        id: record.uwtid,
        name: record.name,
        sort: record.sort
      }
    },
    getMyTypes () {
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
        }).finally(() => {
          this.loading = false
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
            out_url: 'myTypesSave',
            method: 'POST',
            data: {
              uwtid: values.id,
              name: values.name,
              category: this.category,
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
.list-number {
  width: 10%;
  text-align: left;
}
.list-view {
  width: 20%;
  text-align: center;
}
</style>
