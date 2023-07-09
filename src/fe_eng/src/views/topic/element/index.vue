<template>
  <el-tabs  style="padding-left: 10px; background-image: url('https://images.unsplash.com/photo-1506744038136-46273834b3fb?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjExMDk0fQ&w=1000&q=80');">
    <el-tab-pane label="Show words"><show></show></el-tab-pane>
    <el-tab-pane label="Study"><study></study></el-tab-pane>
    <el-tab-pane label="VN"><vn></vn></el-tab-pane>
  </el-tabs>
</template>

<script>
  import show from './part/showTable'
  import study from './part/Study'

  import vn from './part/VnToE'
  export default {
    name: 'index',
    components: {
      show,
      study,
      vn
    }
  }
</script>

<style scoped>

</style>
