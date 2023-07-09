<template>

  <el-scrollbar class="scrollBars">
    <el-menu mode="vertical" unique-opened :default-active="$route.path" :collapse="isCollapse" background-color="#304156" text-color="#bfcbd9" active-text-color="#409EFF">
      <sidebar-item/>
    </el-menu>
  </el-scrollbar>


</template>

<script>
import { mapGetters } from 'vuex'
import SidebarItem from './SidebarItem'
import ScrollBar from '@/components/ScrollBar'

export default {
  components: { SidebarItem, ScrollBar },
  computed: {
    ...mapGetters([
      'sidebar'
    ]),
    isCollapse() {
      return !this.sidebar.opened
    }
  },
  mounted() {
    console.log()
  }
}
</script>

<style>
  .scrollBars {
    height: auto;
    background-color: #304156;
    transition: width 3s;
  }
  .sidebar-container .el-scrollbar__wrap {
    overflow-x: hidden;
    transition: width 3s;
  }
</style>
