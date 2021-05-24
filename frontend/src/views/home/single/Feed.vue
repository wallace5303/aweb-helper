<template>
  <div>
    <standard-form-row title="" block style="padding-bottom: 11px;">
      <router-link v-if="!token" :to="{ name: 'login' }">
        <a-button type="default" icon="login" style="margin-right:10px;">
          去登录
        </a-button>
      </router-link>
      <a-radio-group v-model="module" @change="handleChangeType(module)">
        <a-radio-button value="recommend">推荐</a-radio-button>
        <a-radio-button value="new">最新</a-radio-button>
        <a-radio-button value="collection">收藏最多</a-radio-button>
      </a-radio-group>
      <a-input-search style="margin-left: 16px; width: 272px;" @search="handleSearch"/>
    </standard-form-row>
    <a-card
      style="margin-top: 0px"
      :bordered="true"
    >
      <div class="operate">
        <a-button type="dashed" style="width: 100%" icon="plus" @click="handleAdd">发布</a-button>
      </div>
      <a-list
        size="large"
        rowKey="id"
        :loading="loading"
        itemLayout="vertical"
        :dataSource="feedList"
      >
        <a-list-item :key="item.id" slot="renderItem" slot-scope="item">
          <template slot="actions">
            <a @click="handleCollection(item)"><icon-text type="star-o" :text="item.col_times"/></a>
            <a @click="handleLike(item)"><icon-text type="like-o" :text="item.like" /></a>
          </template>
          <a-list-item-meta>
            <a slot="title" :href="item.url" target="_blank"><strong>{{ item.title }}</strong></a>
            <template slot="description">
              <span v-if="item.url">
                <a :href="item.url" target="_blank"><a-tag>{{ item.url }}</a-tag></a>
              </span>
            </template>
          </a-list-item-meta>
          <img
            v-if="item.pic"
            slot="extra"
            width="272"
            alt="pic"
            :src="item.pic"
          />
          <feed-list :description="item.content" :owner="item.username" :avatar="item.avatar" :href="item.link" :updateAt="item.created_at" />
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
      <feed-add-form
        ref="feedAddModal"
        :visible="addFeedVisible"
        :loading="feedConfirmLoading"
        :model="mdl2"
        @cancel="handleCancelFeed"
        @ok="handleOkFeed"
      />
    </a-card>
  </div>
</template>

<script>
import storage from 'store'
import { ACCESS_TOKEN } from '@/store/mutation-types'
import FeedList from './modules/FeedList'
import IconText from '@/views/home/single/components/IconText'
import { outApi } from '@/api/main'
import UserWebForm from './modules/UserWebForm'
import FeedAddForm from './modules/FeedAddForm'
import { StandardFormRow } from '@/components'

export default {
  name: 'Feed',
  components: {
    FeedList,
    StandardFormRow,
    UserWebForm,
    FeedAddForm,
    IconText
  },
  data () {
    return {
      loading: true,
      loadingMore: false,
      category: '1',
      myTypes: [],
      feedList: [],
      pageInfo: {},
      data: [],
      module: 'recommend',
      token: null,
      page: 1,
      desc: '',
      clickColTimes: [],
      clickLikeTimes: [],
      visible: false,
      addFeedVisible: false,
      confirmLoading: false,
      feedConfirmLoading: false,
      mdl: null,
      mdl2: null
    }
  },
  mounted () {
    this.getToken()
    this.getFeedList()
    this.getMyTypes()
  },
  methods: {
    handleSearch (value) {
      this.page = 1
      this.desc = value
      this.feedList = []
      this.getFeedList()
    },
    handleChangeType (module) {
      this.module = module
      this.page = 1
      this.desc = ''
      this.feedList = []
      this.getFeedList()
    },
    handleAdd () {
      if (!this.token) {
        this.$message.error('请登录')
        return false
      }
      this.addFeedVisible = true
      this.mdl2 = {
        title: '',
        type: 0,
        content: '',
        url: '',
        link: '',
        pic: ''
      }
    },
    getToken () {
      this.token = storage.get(ACCESS_TOKEN)
    },
    handleCollection (record) {
      if (!this.token) {
        this.$message.error('请登录')
        return false
      }
      this.visible = true
      this.mdl = {
        id: record.fid,
        name: record.title,
        url: record.url
      }
      record.col_times += 1
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
    // handleCollection (record) {
    //   if (!this.token) {
    //     this.$message.error('请登录')
    //     return false
    //   }
    //   this.loading = true
    //   const saveMySiteParams = {
    //     out_url: 'saveMySite',
    //     method: 'POST',
    //     data: {
    //       fid: record.fid,
    //       name: record.title,
    //       url: record.url
    //     }
    //   }
    //   outApi(saveMySiteParams).then(res => {
    //     if (res.code !== 0) {
    //       this.$message.info('添加失败')
    //       return false
    //     }
    //     this.loading = false
    //     record.col_times += 1
    //   }).catch(err => {
    //     console.log('err:', err)
    //     this.$message.info('网络异常')
    //   })
    // },
    handleLike (record) {
      if (!this.token) {
        this.$message.error('请登录')
        return false
      }
      this.dataIncr(record, 'like')
    },
    dataIncr (record, type) {
      const params = {
        out_url: 'dataIncr',
        method: 'POST',
        data: {
          fid: record.fid,
          type: type
        }
      }
      outApi(params).then(res => {
        console.log('dataIncr:', res)
        if (res.code !== 0) {
          return false
        }
        record.like += 1
      }).catch(err => {
        console.log('err:', err)
      })
    },
    getFeedList () {
      this.loading = true
      const params = {
        out_url: 'feedList',
        method: 'POST',
        data: {
          module: this.module,
          desc: this.desc,
          page: this.page
        }
      }
      outApi(params).then(res => {
        this.loading = false
        this.loadingMore = false
        if (res.code !== 0) {
          return false
        }
        this.pageInfo = res.data
        this.feedList = this.feedList.concat(this.pageInfo.data)
        }).catch(err => {
          console.log('err:', err)
        })
    },
    loadMore () {
      this.loadingMore = true
      this.page += 1
      this.getFeedList()
    },
    handleCancel () {
      this.visible = false
      this.confirmLoading = false
      const form = this.$refs.webSaveModal.form
    },
    handleCancelFeed () {
      this.addFeedVisible = false
      this.feedConfirmLoading = false
      const form = this.$refs.feedAddModal.form
    },
    handleOk () {
      const form = this.$refs.webSaveModal.form
      this.confirmLoading = true
      form.validateFields((errors, values) => {
        // console.log('feed values:', values)
        if (!errors) {
          const saveMySiteParams = {
            out_url: 'saveMySite',
            method: 'POST',
            data: {
              fid: values.id,
              category: this.category,
              type: values.type,
              name: values.name,
              url: values.url,
              sort: 0
            }
          }
          outApi(saveMySiteParams).then(res => {
            this.confirmLoading = false
            if (res.code !== 0) {
              this.$message.info('添加失败')
              return
            }
            this.visible = false
          }).catch(err => {
            console.log('err:', err)
          })
        } else {
          this.confirmLoading = false
        }
      })
    },
    handleOkFeed () {
      const form = this.$refs.feedAddModal.form
      this.feedConfirmLoading = true
      form.validateFields((errors, values) => {
        console.log('add feed values:', values)
        if (!errors) {
          const params = {
            out_url: 'feedSend',
            method: 'POST',
            data: {
              title: values.title,
              link: values.link,
              url: values.url,
              content: values.content,
              pic: values.pic
            }
          }
          outApi(params).then(res => {
            this.feedConfirmLoading = false
            if (res.code !== 0) {
              this.$message.error('添加失败')
              return
            }
            this.addFeedVisible = false
            this.$message.info('正在审核中...')
            // this.handleChangeType('new')
          }).catch(err => {
            console.log('err:', err)
          })
        } else {
          this.feedConfirmLoading = false
        }
      })
    }
  }
}
</script>

<style scoped>

</style>
