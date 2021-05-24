<template>
  <div class="page-header-index-wide page-header-wrapper-grid-content-main">
    <a-row :gutter="24">
      <a-col :md="24">
        <a-card
          style="width:100%"
          :bordered="false"
          :tabList="tabListNoTitle"
          :activeTabKey="noTitleKey"
          @tabChange="key => handleTabChange(key, 'noTitleKey')"
        >
          <feed-page v-if="noTitleKey === 'feed'"></feed-page>
          <web-page v-else-if="noTitleKey === 'web'"></web-page>
          <all-web-page v-else-if="noTitleKey === 'all_web'"></all-web-page>
          <web-site-manage v-else-if="noTitleKey === 'web_site_manage'"></web-site-manage>
        </a-card>
      </a-col>
    </a-row>
  </div>
</template>

<script>
import { PageView, RouteView } from '@/layouts'
import { FeedPage, WebPage, AllWebPage, WebSiteManage } from './page'

import { mapGetters } from 'vuex'

export default {
  components: {
    RouteView,
    PageView,
    FeedPage,
    AllWebPage,
    WebSiteManage,
    WebPage
  },
  data () {
    return {
      tabListNoTitle: [
        {
          key: 'feed',
          tab: '动态'
        },
        {
          key: 'web',
          tab: '我的'
        },
        {
          key: 'all_web',
          tab: '全部'
        },
        {
          key: 'web_site_manage',
          tab: '管理'
        }
      ],
      noTitleKey: 'feed'
    }
  },
  computed: {

  },
  methods: {
    handleTabChange (key, type) {
      this[type] = key
    }
  }
}
</script>

<style lang="less" scoped>
.page-header-wrapper-grid-content-main {
  width: 100%;
  height: 100%;
  min-height: 100%;
  transition: 0.3s;
}
</style>
