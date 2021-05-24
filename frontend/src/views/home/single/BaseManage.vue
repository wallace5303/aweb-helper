<template>
  <page-header-wrapper
    :title="false"
    :breadcrumb="false"
    :tab-list="tabList"
    :tab-active-key="tabActiveKey"
    :tab-change="handleTabChange"
  >
    <router-view />
  </page-header-wrapper>
</template>

<script>
const getActiveKey = (path) => {
  switch (path) {
    case '/homeWeb':
      return '1'
    case '/homeFind':
      return '2'
    case '/homePrivateweb':
      return '3'
    case '/homeManageWebSite':
      return '4'
    case '/homeManageWebType':
      return '5'
    case '/homeAwesome':
      return '6'
    default:
      return '1'
  }
}
export default {
  name: 'BaseManage',
  data () {
    return {
      tabList: [
        { key: '1', tab: '我的' },
        // { key: '6', tab: '精选' },
        { key: '2', tab: '发现' },
        { key: '3', tab: '隐私' },
        { key: '4', tab: '编辑' },
        { key: '5', tab: '分类' }
      ],
      tabActiveKey: '1',
      noTitle: false
    }
  },
  created () {
    this.tabActiveKey = getActiveKey(this.$route.path)

    this.$watch('$route', (val) => {
      this.tabActiveKey = getActiveKey(val.path)
    })
  },
  methods: {
    handleTabChange (key) {
      this.tabActiveKey = key
      switch (key) {
        case '1':
          this.$router.push('/homeWeb')
          break
        case '2':
          this.$router.push('/homeFind')
          break
        case '3':
          this.$router.push('/homePrivateweb')
          break
        case '4':
          this.$router.push('/homeManageWebSite')
          break
        case '5':
          this.$router.push('/homeManageWebType')
          break
        case '6':
          this.$router.push('/homeAwesome')
          break
        default:
          this.$router.push('/home')
      }
    }
  }
}
</script>

<style lang="less" scoped>
/deep/ .ant-page-header-footer {
  margin-top: 0px;
}
/deep/ .ant-page-header {
  padding: 5px 24px;
}
</style>
