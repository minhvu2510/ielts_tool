<template>
  <el-tabs  style="padding-left: 10px; background-image: url('https://images.unsplash.com/photo-1506744038136-46273834b3fb?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjExMDk0fQ&w=1000&q=80');">
    <el-tab-pane label="Ipa"><ipa></ipa></el-tab-pane>
    <el-tab-pane label="Study"><study></study></el-tab-pane>
  </el-tabs>
</template>

<script>
import study from './part/Study'
import ipa from '../ipa.vue'

export default {
  name: 'index',
  components: {
    study,
    ipa,
  }
}
</script>

<style scoped>

</style>
