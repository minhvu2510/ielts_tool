<template>
  <el-menu class="navbar" mode="horizontal">
    <hamburger class="hamburger-container" :toggleClick="toggleSideBar" :isActive="sidebar.opened"></hamburger>

    <div id="logo">
      <div class="logo-img">
        <!--<img src="../../../assets/v.jpg" alt="">-->
      </div>
      <span class="service-name" style="font-size: 22px;font-family:Dialog ">MV</span>
    </div>

    <div class="right-menu">

      <el-tooltip effect="dark" content="Fullscreen" placement="bottom">
        <screenfull class="screenfull right-menu-item"></screenfull>
      </el-tooltip>

      <el-dropdown class="avatar-container right-menu-item" trigger="click" :show-timeout="0">
        <div class="avatar-wrapper">
          <img class="user-avatar" src="../../../assets/icona.jpg">
          <i class="el-icon-caret-bottom" style="color:#fff;"></i>
        </div>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item divided>
            <span @click="logout" style="display:block;">
              <i class="fas fa-power-off fa-fw"></i> Đăng xuất
            </span>
            <!--<span @click="logout" style="display:block;">{{$t('navbar.logOut')}}</span>-->
          </el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </el-menu>
</template>

<script>
import { mapGetters } from 'vuex'
import Hamburger from '@/components/Hamburger'
import Screenfull from '@/components/Screenfull'

export default {
  components: {
    Hamburger,
    Screenfull
  },
  computed: {
    ...mapGetters([
      'sidebar',
      'email',
      'avatar'
    ])
  },
  methods: {
    goToMailbox() {
      window.open('http://mail.vce.vn')
    },
    toggleSideBar() {
      this.$store.dispatch('toggleSideBar')
    },
    logout() {
      this.$session.destroy()
      this.$cookies.remove('token')
      this.$cookies.remove('otp')
      this.$router.push('/login')
      // this.$store.dispatch('LogOut')
    },
    goToPage(page) {
      switch (page) {
        case 'manage-user':
          this.$router.push('/quan-ly-user/index')
          break
      }
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.navbar {
  height: 50px;
  line-height: 50px;
  border-radius: 0px !important;
  background: #384d63;
  border-bottom: #34495e;
  #logo {
    line-height: 58px;
    height: 50px;
    float: left;
    padding: 0 10px;
    .logo-img {
      height: 50px;
      display: inline-block;
      img {
        margin-top: 10px;
        height: 30px;
      }
    }
    .service-name {
      top: -2px;
      position: absolute;
      left: 87px;
      font-weight: bold;
      color: #fff;
    }
  }
  .hamburger-container {
    line-height: 58px;
    height: 50px;
    float: left;
    /*padding-left: auto;*/
    /*padding-left: 1000px;*/
    padding: 0 10px;
    /*padding: 0 300px;*/
  }
  .breadcrumb-container{
    float: left;
  }
  .errLog-container {
    display: inline-block;
    vertical-align: top;
  }
  .right-menu {
    float: right;
    height: 100%;
    &:focus{
     outline: none;
    }
    .right-menu-item {
      display: inline-block;
      margin: 0 8px;
    }
    .screenfull {
      height: 20px;
    }
    .international{
      vertical-align: top;
    }
    .theme-switch {
      vertical-align: 15px;
    }
    .avatar-container {
      height: 50px;
      margin-right: 30px;
      .avatar-wrapper {
        cursor: pointer;
        margin-top: 5px;
        position: relative;
        .user-avatar {
          width: 40px;
          height: 40px;
          border-radius: 10px;
        }
        .el-icon-caret-bottom {
          position: absolute;
          right: -20px;
          top: 25px;
          font-size: 12px;
        }
      }
    }
  }
}
</style>
