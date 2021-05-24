<template>
  <a-list
    itemLayout="horizontal"
  >
    <a-list-item >
      <a-list-item-meta>
        <a slot="title">账号状态</a>
        <span slot="description">
          <span class="security-list-description">状态</span>
          <span> ：</span>
          <span class="security-list-value">{{ onlineStatus }}</span>
        </span>
      </a-list-item-meta>
      <template>
        <div v-if="opButton === 'login'">
          <a slot="actions">
            <router-link :to="{ name: 'login' }">
              登录
            </router-link>
          </a>
        </div>
        <div v-else>
          <a slot="actions" @click="logout">退出</a>
        </div>
      </template>
    </a-list-item>
    <!-- <a-list-item >
      <a-list-item-meta>
        <a slot="title">打断点</a>
        <span slot="description">
          <span class="security-list-description">当前状态</span>
          <span> 22 </span>
          <span class="security-list-value">223</span>
        </span>
      </a-list-item-meta>
      <template>
        <a slot="actions">退出</a>
      </template>
    </a-list-item> -->
  </a-list>
</template>

<script>
import storage from 'store'
import { ACCESS_TOKEN, USER_INFO } from '@/store/mutation-types'
import { mapActions } from 'vuex'

export default {
  data () {
    return {
      onlineStatus: '离线',
      opButton: 'login'
    }
  },
  mounted () {
    this.initialize()
  },
  methods: {
    ...mapActions(['Login', 'Logout']),
    initialize () {
      const token = storage.get(ACCESS_TOKEN)
      if (token) {
        this.onlineStatus = '在线'
        this.opButton = 'logout'
      }
    },
    logout () {
      this.Logout()
        .then((res) => {
          console.log(res)
          this.onlineStatus = '离线'
          this.opButton = 'login'
        })
        .catch(err => console.log(err))
        .finally(() => {
          console.log('logout')
          this.$router.push({ name: 'login' })
        })
    }
  }
}
</script>

<style scoped>

</style>
