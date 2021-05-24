<template>
  <div :class="wrpCls">
    <span class="menu-distance">
      <a-icon type="project" style="margin-right:5px;"/>
      <a class="a-deco" href="https://gitee.com/wallace5303/aweb-helper" target="_blank">
        开源
      </a>
    </span>
    <span class="menu-distance">
      <a-icon type="user" style="margin-right:5px;"/>
      <span v-if="currentUser.username" >{{ currentUser.username }}</span>
      <span v-else >
        <router-link :to="{ name: 'login' }">
          登录
        </router-link>
      </span>
    </span>
    <!-- <avatar-dropdown :menu="showMenu" :current-user="currentUser" :class="prefixCls" /> -->
    <!-- <select-lang :class="prefixCls" /> -->
  </div>
</template>

<script>
import storage from 'store'
import { USER_INFO } from '@/store/mutation-types'
import AvatarDropdown from './AvatarDropdown'
import SelectLang from '@/components/SelectLang'
import { mapGetters } from 'vuex'

export default {
  name: 'RightContent',
  components: {
    AvatarDropdown,
    SelectLang
  },
  props: {
    prefixCls: {
      type: String,
      default: 'ant-pro-global-header-index-action'
    },
    isMobile: {
      type: Boolean,
      default: () => false
    },
    topMenu: {
      type: Boolean,
      required: true
    },
    theme: {
      type: String,
      required: true
    }
  },
  data () {
    return {
      showMenu: true,
      currentUser: {
        username: '',
        avatar: ''
      },
      electron_egg: 'http://box.kaka996.com/cms/p/electronegg.html',
      box_page: 'http://box.kaka996.com/cms/p/box.html'
    }
  },
  computed: {
    wrpCls () {
      return {
        'ant-pro-global-header-index-right': true,
        [`ant-pro-global-header-index-${(this.isMobile || !this.topMenu) ? 'light' : this.theme}`]: true
      }
    }
  },
  mounted () {
    this.getUserinfo()
  },
  methods: {
    getUserinfo () {
      const userinfo = storage.get(USER_INFO)
      if (userinfo) {
        this.currentUser = userinfo
      }
    },
    collectionWeb () {
      const h = this.$createElement
      this.$info({
        title: '收藏本站或设置为主页，永不丢失',
        content: h('div', {}, [
          h('p', 'http://b.kaka996.com/')
        ]),
        onOk () {}
      })
    }
  }
}
</script>
<style lang="less" scoped>
.menu-distance {
  margin-right: 10px;
}
.a-deco {
  text-decoration:none;color: black;
}
</style>
