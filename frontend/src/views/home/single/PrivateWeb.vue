<template>
  <div>
    <standard-form-row title="" block style="padding-bottom: 11px;">
      <router-link v-if="!token" :to="{ name: 'login' }">
        <a-button type="default" icon="login" style="margin-right:10px;">
          去登录
        </a-button>
      </router-link>
      <a-input-search
        v-model="pwdText"
        type="password"
        v-if="!unlockFlag"
        placeholder="请输入密码"
        style="width: 200px;"
        @search="handleUnlock">
        <a-button slot="enterButton">
          解锁
        </a-button>
      </a-input-search>
      <span v-else>
        <a-button style="margin-right:10px;" @click="handleLock">
          立即上锁
        </a-button>
        <router-link :to="{ name: 'homeManageWebSite', params: { category: '2' } }">
          <a-button type="default">
            自定义添加
          </a-button>
        </router-link>
      </span>
    </standard-form-row>
    <a-card
      v-if="token && unlockFlag"
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
                        <router-link v-else :to="{ name: 'homeManageWebSite', params: { category: '2' }}">
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
        :category="category"
        @cancel="handleCancel"
        @ok="handleOk"
      /> -->
    </a-card>
  </div>
</template>
<script>
import md5 from 'md5'
import storage from 'store'
import { ACCESS_TOKEN, MPWD, UNLOCK_FLAG } from '@/store/mutation-types'
import { timeFix } from '@/utils/util'
import { mapState } from 'vuex'
import { PageHeaderWrapper } from '@ant-design-vue/pro-layout'
import { Radar, StandardFormRow } from '@/components'
import { outApi } from '@/api/main'
// import WebForm from './modules/WebSaveForm'
const DataSet = require('@antv/data-set')

export default {
  name: 'PrivateWeb',
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
      webList: {},
      visible: false,
      confirmLoading: false,
      mdl: null,
      pwdText: '',
      unlockFlag: 0,
      category: '2'
    }
  },
  computed: {
  },
  created () {
  },
  mounted () {
    this.getToken()
    this.getUnlockFlag()
    this.getMySites()
  },
  methods: {
    getToken () {
      this.token = storage.get(ACCESS_TOKEN)
    },
    handleAdd () {
      this.visible = true
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
      this.pwdText = ''
      // this.getMySites()
    },
    handleLock () {
      // 设置过期时间
      storage.remove(UNLOCK_FLAG)
      this.unlockFlag = 0
    },
    getUnlockFlag () {
      const flagTime = Number(storage.get(UNLOCK_FLAG))
      const currentTime = new Date().getTime()
      this.unlockFlag = currentTime < flagTime ? 1 : 0
    },
    getMySites () {
      if (!this.token) {
        return false
      }
      const params = {
        out_url: 'mySites',
        method: 'POST',
        data: {
          category: this.category
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
    //           return
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
    .overflow {
      display:block;
      white-space:nowrap;
      overflow:hidden;
      text-overflow:ellipsis;
      width: 100px;
    }
  }

</style>
