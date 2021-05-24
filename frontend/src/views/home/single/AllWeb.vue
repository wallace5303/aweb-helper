<template>
  <div>
    <standard-form-row title="" block style="padding-bottom: 11px;">
      <a-radio-group v-model="module" @change="handleChangeType(module)" style="margin-right:10px;">
        <a-radio-button value="recommend">推荐</a-radio-button>
        <a-radio-button value="new">最新</a-radio-button>
        <a-radio-button value="collection">收藏最多</a-radio-button>
      </a-radio-group>
      <a-input-search
        style="width: 272px;"
        v-model="searchContent"
        @change="resetDefault(searchContent)"
        @search="handleSearch"
        placeholder="如：nodejs">
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
        <a-button type="dashed" style="width: 100%">添加后 - 在“我的”查看</a-button>
        <!-- 添加后 - 在“我的”查看
        <a-divider dashed="true" /> -->
      </div>
      <a-list :loading="loading" size="large" :pagination="paginationOpt">
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
          <div class="list-times">
            <div class="list-content-item">
              <a-icon type="star-o" style="margin-right: 8px" />
              <span>{{ item.col_times }}</span>
            </div>
          </div>
          <div class="list-view">
            <div class="list-content-item">
              <a :href="item.url" target="_blank">查看</a>
            </div>
          </div>
          <div class="list-view">
            <a @click="handleEdit(item)">添加</a>
          </div>
        </a-list-item>
        <span />
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
import storage from 'store'
import { ACCESS_TOKEN } from '@/store/mutation-types'
import UserWebForm from './modules/UserWebForm'
import { outApi } from '@/api/main'
import { StandardFormRow } from '@/components'

export default {
  name: 'StandardList',
  components: {
    UserWebForm,
    StandardFormRow
  },
  data () {
    return {
      token: null,
      category: '1',
      myTypes: [],
      webList: {},
      webPageList: {},
      paginationOpt: {
        current: 1,
        total: 0,
        pageSize: 10,
        'show-quick-jumper': true,
        onChange: (current) => {
          this.paginationOpt.current = current
          this.page = current
          this.getAllWebs()
        }
      },
      loading: true,
      searchContent: '',
      // 查询参数
      page: 1,
      type2: 0,
      module: 'recommend',
      desc: '',
      visible: false,
      confirmLoading: false,
      mdl: null
    }
  },
  mounted () {
    this.getToken()
    this.getAllWebs()
    this.getMyTypes()
  },
  methods: {
    getToken () {
      this.token = storage.get(ACCESS_TOKEN)
    },
    handleSearch (value) {
      this.page = 1
      this.paginationOpt.current = 1
      this.desc = value
      this.getAllWebs()
    },
    handleChangeType (module) {
      this.module = module
      this.page = 1
      this.desc = ''
      this.paginationOpt.current = 1
      this.getAllWebs()
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
    resetDefault (value) {
      if (value === '') {
        this.getAllWebs()
      }
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
    getAllWebs () {
      const params = {
        out_url: 'allWebSites',
        method: 'POST',
        data: {
          module: this.module,
          desc: this.desc,
          page: this.page,
          type2: this.type2
        }
      }
      outApi(params).then(res => {
        this.loading = false
        if (res.code !== 0) {
          return
        }
        this.webPageList = res.data && res.data.list
        this.webList = this.webPageList.data
        this.paginationOpt.total = this.webPageList.total
        this.paginationOpt.pageSize = this.webPageList.per_page
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
              this.$message.info('添加成功')
            }).catch(err => {
              console.log('err:', err)
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
