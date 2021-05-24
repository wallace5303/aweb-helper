<template>
  <global-footer class="footer custom-render">
    <template v-slot:links>
      <p>Copyright @ 2019~2021 盒子 版权所有</p>
      <p>京ICP备15041380号-2</p>
    </template>
    <!-- <template v-slot:copyright>
      <a href="https://github.com/vueComponent" target="_blank">vueComponent</a>
    </template> -->
  </global-footer>
</template>

<script>
import { GlobalFooter } from '@ant-design-vue/pro-layout'

export default {
  name: 'ProGlobalFooter',
  components: {
    GlobalFooter
  }
}
</script>
