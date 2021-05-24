<template>
  <div>
    <standard-form-row title="" block style="padding-bottom: 11px;">
      <a-radio-group v-model="module" @change="handleChangeType(module)" style="margin-right:10px;">
        <a-radio-button value="collection">收藏最多</a-radio-button>
        <a-radio-button value="new">最新</a-radio-button>
        <a-radio-button value="recommend">推荐</a-radio-button>
      </a-radio-group>
      <a-input-search
        style="width: 272px;"
        v-model="searchContent"
        @change="resetDefault(searchContent)"
        @search="handleSearch"
        placeholder="强大的搜索功能">
        <a-button slot="enterButton">
          搜索
        </a-button>
      </a-input-search>
    </standard-form-row>
    <a-card
      style="margin-top: 0px"
      :bordered="true"
      title="">
      <div class="operate">
        <!-- <a-button type="dashed" style="width: 100%">添加后 - 在“我的”查看</a-button> -->
        <!-- 添加后 - 在“我的”查看
        <a-divider dashed="true" /> -->
        <a-button type="dashed" style="width: 100%" icon="plus" @click="handleShare">分享</a-button>
      </div>
      <a-list :loading="loading" size="large">
        <a-list-item :key="index" v-for="(item, index) in webList" style="padding-top: 10px;padding-bottom: 10px;">
          <a-list-item-meta :description="item.desc">
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
          <a-tag :key="tindex" v-for="(tag, tindex) in item.tag">{{ tag }}</a-tag>
          <div class="list-times">
            <div class="list-content-item">
              <a-icon type="star-o" style="margin-right: 8px" />
              <span>{{ item.col_times }}</span>
            </div>
          </div>
          <!-- <div class="list-view">
            <div class="list-content-item">
              <a :href="item.url" target="_blank">查看</a>
            </div>
          </div> -->
          <div class="list-view">
            <a @click="handleEdit(item)">添加</a>
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
      <all-web-form
        ref="allWebModal"
        :visible="allWebVisible"
        :loading="allWebConfirmLoading"
        :model="allWebMdl"
        @cancel="allWebHandleCancel"
        @ok="allWebHandleOk"
      />
    </a-card>
  </div>
</template>

<script>
import storage from 'store'
import { ACCESS_TOKEN } from '@/store/mutation-types'
import UserWebForm from './modules/UserWebForm'
import AllWebForm from './modules/AllWebForm'
import { outApi } from '@/api/main'
import { StandardFormRow } from '@/components'

export default {
  name: 'StandardList',
  components: {
    UserWebForm,
    AllWebForm,
    StandardFormRow
  },
  data () {
    return {
      token: null,
      category: '1',
      webList: [],
      pageInfo: {},
      myTypes: [],
      loading: false,
      loadingMore: false,
      // 查询参数
      page: 1,
      type2: 0,
      module: 'collection',
      desc: '',
      visible: false,
      confirmLoading: false,
      allWebVisible: false,
      allWebConfirmLoading: false,
      mdl: null,
      allWebMdl: null,
      searchContent: ''
    }
  },
  mounted () {
    this.getToken()
    this.getWebFind()
    this.getMyTypes()
  },
  methods: {
    getToken () {
      this.token = storage.get(ACCESS_TOKEN)
    },
    handleSearch (value) {
      this.page = 1
      this.desc = value
      this.module = 'collection'
      this.getWebFind('reset')
    },
    handleChangeType (module) {
      this.module = module
      this.page = 1
      this.desc = ''
      this.getWebFind('reset')
    },
    handleEdit (record) {
      if (!this.token) {
        this.$message.error('请登录')
        return false
      }
      this.visible = true
      this.mdl = {
        id: record.wsid,
        name: record.name,
        url: record.url
      }
    },
    handleShare () {
      if (!this.token) {
        this.$message.error('请登录')
        return false
      }
      this.allWebVisible = true
      this.allWebMdl = {
        id: 0,
        name: '',
        url: '',
        desc: ''
      }
    },
    resetDefault (value) {
      if (value === '') {
        this.handleChangeType('collection')
      }
    },
    getWebFind (isReset) {
      this.loading = true
      const params = {
        out_url: 'webFind',
        method: 'POST',
        data: {
          module: this.module,
          desc: this.desc,
          page: this.page
        }
      }
      outApi(params).then(res => {
        if (res.code !== 0) {
          return false
        }
        this.pageInfo = res.data.list
        if (isReset) {
          this.webList = this.pageInfo.data
        } else {
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
      this.getWebFind()
    },
    getMyTypes () {
      if (!this.token) {
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
        // console.log('allweb values:', values)
        if (!errors) {
          const saveMySiteParams = {
            out_url: 'saveMySite',
            method: 'POST',
            data: {
              category: this.category,
              wsid: values.id,
              type: values.type,
              name: values.name,
              url: values.url,
              sort: values.sort
            }
          }
          outApi(saveMySiteParams).then(res => {
            this.confirmLoading = false
            if (res.code !== 0) {
              this.$message.info('添加失败')
              return
            }
              this.visible = false
              this.$message.info('添加成功')
            }).catch(err => {
              console.log('err:', err)
            })
        } else {
          this.confirmLoading = false
        }
      })
    },
    allWebHandleCancel () {
      this.allWebVisible = false
      this.allWebConfirmLoading = false
      const form = this.$refs.allWebModal.form
    },
    allWebHandleOk () {
      const form = this.$refs.allWebModal.form
      this.allWebConfirmLoading = true
      form.validateFields((errors, values) => {
        console.log('allweb values:', values)
        if (!errors) {
          const saveAllWebParams = {
            out_url: 'saveAllWeb',
            method: 'POST',
            data: {
              name: values.name,
              url: values.url,
              desc: values.desc
            }
          }
          outApi(saveAllWebParams).then(res => {
            if (res.code !== 0) {
              this.$message.info('添加失败')
              return
            }
              this.$message.info('添加成功')
              this.handleChangeType('new')
            }).catch(err => {
              console.log('err:', err)
            }).finally(() => {
              this.allWebVisible = false
              this.allWebConfirmLoading = false
            })
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
.list-times {
  width: 10%;
  text-align: left;
}
.list-view {
  width: 10%;
  text-align: center;
}
.list-content-item {
    color: rgba(0, 0, 0, .45);
    display: inline-block;
    vertical-align: middle;
    font-size: 14px;
    margin-left: 40px;
    span {
        line-height: 20px;
    }
    p {
        margin-top: 4px;
        margin-bottom: 0;
        line-height: 22px;
    }
}
</style>
