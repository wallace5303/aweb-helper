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
        placeholder="">
        <a-button slot="enterButton">
          搜索
        </a-button>
      </a-input-search>
    </standard-form-row>
    <div class="ant-pro-pages-list-applications-filterCardList">
      <a-list :loading="loading" :data-source="projects" :grid="{ gutter: 24, xl: 4, lg: 3, md: 3, sm: 2, xs: 1 }" style="margin-top: 24px;">
        <a-list-item slot="renderItem" slot-scope="item">
          <a-card :body-style="{ paddingBottom: 20 }" hoverable>
            <a-card-meta :title="item.title">
              <!-- <template slot="avatar">
                <a-avatar size="small" :src="item.avatar"/>
              </template> -->
            </a-card-meta>
            <template slot="actions">
              <a-tooltip title="">
                <a-icon type="eye" /> 查看
              </a-tooltip>
              <a-tooltip title="">
                <a-icon type="star" /> 256
              </a-tooltip>
            </template>
            <a-tag class="tag" :key="tindex" v-for="(tag, tindex) in item.tag">{{ tag }}</a-tag>
            <div class="description">
              {{ item.description }}
            </div>
          </a-card>
        </a-list-item>
      </a-list>
    </div>
  </div>
</template>

<script>
import storage from 'store'
import { ACCESS_TOKEN } from '@/store/mutation-types'
import { outApi } from '@/api/main'
import { StandardFormRow } from '@/components'

export default {
  name: 'StandardList',
  components: {
    StandardFormRow
  },
  data () {
    return {
      token: null,
      category: '1',
      webList: [],
      pageInfo: {},
      loading: false,
      loadingMore: false,
      // 查询参数
      page: 1,
      type2: 0,
      module: 'collection',
      desc: '',
      projects: [
        {
          title: '《不可替代的团队领袖培养计划》',
          cover: '11',
					col_times: 32,
					tag: ['读书', '前端'],
          description: '《不可替代的团队领袖培养计划》leetcode/lintcode题解/算法学习sae笔记aweawe笔记afwe笔记wew笔记wewe'
        },
        {
          title: 'LeetCode题解',
          cover: '11',
					col_times: 32,
					tag: [],
          description: 'LeetCode题解'
        },
        {
          title: '前端开发笔记本',
          cover: '11',
					col_times: 32,
					tag: ['读书', '前端'],
          description: '前端开发笔记本'
        },
        {
          title: 'leetcode/lintcode题解/算法学习笔记',
          cover: '11',
					col_times: 32,
					tag: ['读书', '前端'],
          description: 'leetcode/lintcode题解/算法学习笔记'
        },
        {
          title: '借助开源项目，学习软件开发',
          cover: '11',
					col_times: 32,
					tag: ['读书', '前端'],
          description: 'miaoshu'
        },
        {
          title: '老齐的技术资料',
          cover: '11',
					col_times: 32,
					tag: ['读书', '前端'],
          description: 'miaoshu'
        }
      ],
      visible: false,
      searchContent: ''
    }
  },
  mounted () {
    this.getToken()
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
.tag {
	margin-top: 10px;
}
.description {
	margin-top: 10px;
	height: 45px;
  overflow: hidden;
  text-align: left;
}
</style>
