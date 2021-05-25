<template>
  <div>
    <standard-form-row title="" block style="padding-bottom: 11px;">
      <router-link v-if="!token" :to="{ name: 'login' }">
        <a-button type="default" icon="login" style="margin-right:10px;">
          去登录
        </a-button>
      </router-link>
      <!-- <a-button type="link" style="margin-right:10px;" @click="defaultWeb">
        默认
      </a-button> -->
      <a-input-search
        placeholder="强大的搜索功能"
        style="width: 272px; margin-right:10px;"
        v-model="searchContent"
        @change="resetDefault(searchContent)"
        @search="webSearch">
        <a-button slot="enterButton">
          搜一搜
        </a-button>
      </a-input-search>
      <a-input-search
        placeholder=""
        style="width: 272px; margin-right:10px;"
        v-model="inputText"
        @search="baiduSearch">
        <a-button slot="enterButton">
          百度一下
        </a-button>
      </a-input-search>
      <!-- <router-link :to="{ name: 'homeManageWebSite' }">
        <a-button type="default" style="margin-right:10px;">
          添加
        </a-button>
      </router-link> -->
      <p/>
      <span>热门搜索：</span>
      <template v-for="tag in hotTags">
        <a-checkable-tag
          :key="tag"
          @change="changeTag(tag)"
        >
          {{ tag }}
        </a-checkable-tag>
      </template>
    </standard-form-row>
    <a-card
      v-if="todayRecommend.length !== 0"
      class="project-list"
      :loading="loading"
      style="margin-bottom: 24px;"
      :bordered="false"
      title="今日推荐"
      :body-style="{ padding: 0 }">
      <a slot="extra">
        <router-link :to="{ name: 'homeFind' }">
          更多
        </router-link>
      </a>
      <div>
        <a-card-grid class="project-card-grid2" :key="i" v-for="(item, i) in todayRecommend">
          <a-card :bordered="false" :body-style="{ padding: 0 }">
            <a-card-meta>
              <div slot="description" class="card-description2">
                <a class="todayRecommend" :href="item.url" target="_blank">
                  {{ item.name }}
                </a>
              </div>
            </a-card-meta>
            <div class="project-item">
              <a href="/#/">{{ item.one_tag }}</a>
              <span class="collection-times">
                <a-icon type="star-o"/> {{ item.col_times }}
              </span>
            </div>
          </a-card>
        </a-card-grid>
      </div>
    </a-card>
    <a-card
      style="width:100%"
      :bordered="false"
    >
      <a-spin :spinning="loading"/>
      <a-row :gutter="24">
        <a-col :xl="24" :lg="24" :md="24" :sm="24" :xs="24">
          <div>
            <a-card
              :key="wtid"
              :loading="loading"
              v-for="(webs, wtid) in webList"
              class="project-list"
              style="margin-bottom: 24px;"
              :bordered="false"
              :title="webs.title"
              :head-style="{'border-bottom': '0px solid #e8e8e8', padding: 0}"
              :body-style="{padding: 0}">
              <div>
                <a-card-grid class="project-card-grid" :key="i" v-for="(web, i) in webs.list">
                  <a-card :bordered="false" :body-style="{ padding: 0 }">
                    <a-card-meta >
                      <div slot="title" class="card-title">
                        <a-avatar v-if="web.img" shape="square" size="small" :src="web.img"></a-avatar>
                        <a-avatar v-else :style="web.style || 'color: #fff;backgroundColor:#2BA245;'" shape="square" size="small" :src="web.img">{{ web.name.substr(0,1) }}</a-avatar>
                        <a class="overflow" v-if="web.url" :href="web.url" target="_blank">
                          <a-tooltip>
                            <template v-if="web.name.length > 5" slot="title">
                              {{ web.name }}
                            </template>
                            {{ web.name }}
                          </a-tooltip>
                        </a>
                        <!-- <a v-else @click="handleAdd()">{{ web.name }}</a> -->
                        <router-link v-else :to="{ name: 'homeManageWebSite' }">
                          <a>{{ web.name }}</a>
                        </router-link>
                      </div>
                    </a-card-meta>
                  </a-card>
                </a-card-grid>
              </div>
            </a-card>
          </div>
        </a-col>
      </a-row>
      <!-- <web-form
        ref="webSaveModal"
        :visible="visible"
        :loading="confirmLoading"
        :model="mdl"
        @cancel="handleCancel"
        @ok="handleOk"
      /> -->
    </a-card>
  </div>

</template>

<script>
import storage from 'store'
import { ACCESS_TOKEN } from '@/store/mutation-types'
import { timeFix } from '@/utils/util'
import { mapState } from 'vuex'
import { PageHeaderWrapper } from '@ant-design-vue/pro-layout'
import { Radar, StandardFormRow } from '@/components'
import { outApi } from '@/api/main'
// import WebForm from './modules/WebSaveForm'
const DataSet = require('@antv/data-set')

export default {
  name: 'Web',
  components: {
    PageHeaderWrapper,
    // WebForm,
    Radar,
    StandardFormRow
  },
  data () {
    return {
      token: null,
      loading: true,
      inputText: '',
      searchContent: '',
      webList: {},
      visible: false,
      confirmLoading: false,
      mdl: null,
      todayRecommend: [],
      hotTags: []
    }
  },
  computed: {
  },
  created () {
  },
  mounted () {
    this.getToken()
    this.getHotSearchTags()
    this.getTodayRecommend()
    this.getMySites()
    this.getDefaultSites()
  },
  methods: {
    getToken () {
      this.token = storage.get(ACCESS_TOKEN)
      // console.log('NODE_ENV', process.env.NODE_ENV)
      // console.log('VUE_APP_PREVIEW', process.env.VUE_APP_PREVIEW)
    },
    handleAdd () {
      this.visible = true
    },
    changeTag (tag) {
      this.webSearch(tag)
    },
    defaultWeb () {
      this.searchContent = ''
      this.getMySites()
      this.getDefaultSites()
    },
    resetDefault (value) {
      if (value === '') {
        this.getMySites()
        this.getDefaultSites()
      }
    },
    baiduSearch (value) {
      this.inputText = value
      window.open('https://www.baidu.com/s?wd=' + this.inputText, '_blank')
      this.inputText = ''
    },
    // gotoItem (item) {
    //   window.open('https://www.baidu.com/s?wd=' + item, '_blank')
    //   this.inputText = ''
    // },
    // show (ev) {
    //   if (ev.keyCode === 38 || ev.keyCode === 40) {
    //     if (this.nowIndex < -1) {
    //       return false
    //     }
    //     if (this.nowIndex !== this.result.length && this.nowIndex !== -1) {
    //       this.inputText = this.result[this.nowIndex]
    //     }
    //     return false
    //   }
    //   if (ev.keyCode === 13) {
    //     window.open('https://www.baidu.com/s?wd=' + this.inputText, '_blank')
    //     this.inputText = ''
    //   }
    //   this.text = this.inputText
    //   this.$http.post('https://sp0.baidu.com/5a1Fazu8AA54nxGko9WTAnF6hhy/su',
    //     { wd: this.inputText },
    //     {
    //       emulateJSON: true
    //   }).then(res => {
    //     this.result = res.data.s
    //   })
    // },
    // down () {
    //   this.nowIndex++
    //   if (this.nowIndex === this.result.length) {
    //     this.nowIndex = -1
    //     this.inputText = this.text
    //   }
    // },
    // up () {
    //   this.nowIndex--
    //   if (this.nowIndex < -1) {
    //     this.nowIndex = -1
    //     return false
    //   }
    //   if (this.nowIndex === -1) {
    //     this.nowIndex = this.result.length
    //     this.inputText = this.text
    //   }
    // },
    webSearch (value) {
      value = value.trim()
      if (value === 'undefined' || !value || !/[^\s]/.test(value)) {
        return false
      }
      this.searchContent = value
      this.getSearchAllWeb()
    },
    getHotSearchTags () {
      const params = {
        out_url: 'hotSearchTags',
        method: 'POST',
        data: {}
      }
      outApi(params).then(res => {
        if (res.code !== 0) {
          return false
        }
        this.hotTags = res.data
        }).catch(err => {
          console.log('err:', err)
        })
    },
    getTodayRecommend () {
      const params = {
        out_url: 'todayRecommend',
        method: 'POST',
        data: {}
      }
      outApi(params).then(res => {
        if (res.code !== 0) {
          return false
        }
        this.todayRecommend = res.data.list
        console.log('todayRecommend:', res.data.list)
        }).catch(err => {
          console.log('err:', err)
        }).finally(() => {
          // this.loading = false
        })
    },
    getMySites () {
      if (!this.token) {
        return false
      }
      this.loading = true
      const params = {
        out_url: 'mySites',
        method: 'POST',
        data: {
          category: 1
        }
      }
      outApi(params).then(res => {
        if (res.code !== 0) {
          return false
        }
        this.webList = res.data
      }).catch(err => {
        console.log('err:', err)
      }).finally(() => {
        this.loading = false
      })
    },
    getDefaultSites () {
      if (this.token) {
        return false
      }
      const params = {
        out_url: 'defaultSites',
        method: 'POST',
        data: {
          category: 1
        }
      }
      outApi(params).then(res => {
        this.loading = false
        if (res.code !== 0) {
          return false
        }
        this.webList = res.data
        }).catch(err => {
          console.log('err:', err)
        })
    },
    getSearchAllWeb () {
      this.loading = true
      const params = {
        out_url: 'searchAllWeb',
        method: 'POST',
        data: {
          desc: this.searchContent
        }
      }
      outApi(params).then(res => {
        if (res.code !== 0) {
          return false
        }
        this.webList = res.data
      }).catch(err => {
        console.log('err:', err)
      }).finally(() => {
        this.loading = false
      })
    }
    // handleCancel () {
    //   this.visible = false
    //   this.confirmLoading = false
    //   const form = this.$refs.webSaveModal.form
    // },
    // handleOk () {
    //   const form = this.$refs.webSaveModal.form
    //   this.confirmLoading = true
    //   form.validateFields((errors, values) => {
    //     if (!errors) {
    //       const saveMySiteParams = {
    //         out_url: 'saveMySite',
    //         method: 'POST',
    //         data: {
    //           type: values.type,
    //           name: values.name,
    //           url: values.url,
    //           sort: 0
    //         }
    //       }
    //       outApi(saveMySiteParams).then(res => {
    //         this.confirmLoading = false
    //         if (res.code !== 0) {
    //           this.$message.info('添加失败')
    //           return false
    //         }
    //           this.visible = false
    //           this.$message.info('添加成功')
    //           this.getMySites()
    //         }).catch(err => {
    //           console.log('err:', err)
    //         })
    //     } else {
    //       this.confirmLoading = false
    //     }
    //   })
    // }
  }
}
</script>

<style lang="less" scoped>
  //@import "./web.less";
  .project-list {
    .project-card-grid {
        width: 12.5%;
        padding: 15px;
      }
    .project-card-grid2 {
        width: 16.66666%;
        padding: 15px;
      }
    .card-title {
      font-size: 0;
      a {
        color: rgba(0, 0, 0, 0.85);
        margin-left: 12px;
        line-height: 24px;
        height: 24px;
        display: inline-block;
        vertical-align: top;
        font-size: 14px;

        &:hover {
          color: #1890ff;
        }
      }
    }
    .card-description {
      color: rgba(0, 0, 0, 0.45);
      height: 44px;
      line-height: 22px;
      overflow: hidden;
    }
    .card-description2 {
      color: rgba(0, 0, 0, 0.75);
      height: 44px;
      line-height: 22px;
      overflow: hidden;
    }
    .overflow {
      display:block;
      white-space:nowrap;
      overflow:hidden;
      text-overflow:ellipsis;
      width: 100px;
    }
    .todayRecommend {
      color: rgba(0, 0, 0, 0.75);
      display: inline-block;
      flex: 1 1 0;

      &:hover {
        color:#52C41A;
      }
    }
  }
  .project-item {
    display: flex;
    margin-top: 8px;
    overflow: hidden;
    font-size: 12px;
    height: 20px;
    line-height: 20px;

    a {
      color: rgba(0, 0, 0, 0.45);
      display: inline-block;
      flex: 1 1 0;

      &:hover {
        color: #1890ff;
      }
    }

    .collection-times {
      color: rgba(0, 0, 0, 0.45);
      flex: 0 0 auto;
      float: right;
    }
  }
  /deep/ .ant-card-head {
    min-height: 18px;
    font-size: 14px;
  }
  /deep/ .ant-card-head-title {
    padding: 8px 0;
  }
  /deep/ .ant-card-extra {
    padding: 8px 0;
  }
</style>
