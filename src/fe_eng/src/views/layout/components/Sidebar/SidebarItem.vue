<template>
  <div>
    <div class="menu-wrapper">
      <template>
        <router-link :to="'/dashboard'">
          <el-menu-item index="aq222">
            <i class="fas fa-chart-bar fa-fw"></i>
            <span slot="title">Dashboard</span>
          </el-menu-item>
        </router-link>
        <router-link :to="'/topic'">
          <el-menu-item index="Study">
            <i class="fas fa-address-card"></i>
            <span slot="title">Study by topic</span>
          </el-menu-item>
        </router-link>
        <router-link :to="'/topics'">
          <el-menu-item index="topics">
            <i class="fa fa-book"></i>
            <span slot="title">Topics</span>
          </el-menu-item>
        </router-link>
        <router-link :to="'/difficult'">
          <el-menu-item index="difficult">
            <i class="fa fa-adjust"></i>
            <span slot="title">Top difficult</span>
          </el-menu-item>
        </router-link>
        <router-link :to="'/confuse'">
          <el-menu-item index="confuse">
            <i class="fas fa-mortar-pestle"></i>
            <span slot="title">Study by confuse</span>
          </el-menu-item>
        </router-link>
        <router-link :to="'/chose'">
          <el-menu-item index="listen">
            <i class="fas fa-assistive-listening-systems"></i>
            <span slot="title">Listen</span>
          </el-menu-item>
        </router-link>
        <router-link :to="'/showAll'">
          <el-menu-item index="listens">
            <i class="fas fa-assistive-listening-systems"></i>
            <span slot="title">Show All</span>
          </el-menu-item>
        </router-link>
        <router-link :to="'/history'">
          <el-menu-item index="history">
            <i class="fas fa-history"></i>
            <span slot="title">Study</span>
          </el-menu-item>
        </router-link>
        <router-link :to="'/memo'">
          <el-menu-item index="history">
            <i class="fas fa-database"></i>
            <span slot="title">Memo</span>
          </el-menu-item>
        </router-link>
      </template>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import VueSingleSelect from 'vue-single-select'
export default {
  name: 'SidebarItem',
  components: {
    VueSingleSelect
  },
  data() {
    return {
      numberOffice: '',
      numberService: '',
      temp: [],
      tempOffice: [],
      tempService: [],
      accounts: '',
      searchkey: '',
      searchkeys: '',
      filters: '',
      filterss: '',
      hotlines: '',
      k: 1,
      pag: 1,
      searht: '',
      searchbill: ''
      // ============
    }
  },
  watch: {
    'pag'() {
      // console.log(this.pag)
      this.gethotlines(this.pag)
    },
    'filters'() {
      this.pag = 1
    },
    'searchkeys'() {
      if (this.searchkeys === '') {
        this.gethotlines(this.pag)
      }
    },
    '$store.state.hide.update'() {
      // console.log('vudeptrai=========')
      if (this.$session.get('otp')) {
        this.getall()
      }
    },
    'searchbill'() {
      this.getall(this.searchbill)
    },
    'searchkey'() {
      this.getall(this.searchkey)
    }
    // '$store.state.check_add_hotline'() {
    //   this.gethotlines(this.pag)
    //   this.$store.state.check_add_hotline = ''
    // },
    // 'searchkey'() {
    //   if (this.searchkey === '') {
    //     this.gethotlines(this.pag)
    //   }
    // }
  },
  mounted() {
    // this.getall()
    // this.gethotlines(this.pag)
    // console.log('aaaaaaaaaa' + this.routes[0].toString())
  },
  computed: {
    ...mapGetters(['sidebar'])
  },
  methods: {
    getall(key) {
      // this.$http.get(process.env.SWAPI_URL + '/account', { headers: { 'Authorization': this.$session.get('token') }, params: { status: this.filters, keyword: key }})
      //   .then(function(response) {
      //     // console.log(response)
      //     // console.log(response)
      //     if (response.body.status === true) {
      //       this.accounts = response.data.data
      //       // console.log(response.data.data)
      //     }
      //   }, respone => {
      //     if (respone.body.status === false) {
      //       // this.$session.destroy()
      //       // this.$cookies.remove('token')
      //       // this.$cookies.remove('otp')
      //       // this.$router.push('/login')
      //     }
      //   })
    },
    gethotlines(page) {
      // this.$http.get(process.env.SWAPI_URL + '/hotline', { headers: { 'Authorization': this.$session.get('token') }, params: { store: 'yes', offset: page, limit: 12, status: this.filterss, keyword: this.searchkeys }})
      //   .then(function(response) {
      //     if (response.body.status === true) {
      //       this.hotlines = response.data.data
      //       this.k = response.data.total
      //       console.log('this is k' + this.k)
      //     }
      //   }, respone => {
      //     if (respone.body.status === false) {
      //       this.$session.destroy()
      //       this.$cookies.remove('token')
      //       this.$cookies.remove('otp')
      //       this.$router.push('/login')
      //     }
      //   })
    },
    check_search(key, list) {
      return list.includes(key)
    },
    a() {
      alert('aaaa')
    },
    filtered() {
      // this.$http.get(process.env.SWAPI_URL + '/account', { headers: { 'Authorization': this.$session.get('token') }, params: { status: this.filters }})
      //   .then(function(response) {
      //     this.accounts = response.data.data
      //   })
    },
    filteredht(page) {
      // this.$http.get(process.env.SWAPI_URL + '/hotline', { headers: { 'Authorization': this.$session.get('token') }, params: { store: 'yes', offset: page, limit: 12, kind: this.filterss }})
      //   .then(function(response) {
      //     // console.log(this.filters)
      //     this.hotlines = response.data.data
      //     this.hotlines = response.data.data
      //     this.k = response.data.total
      //     console.log('aaaaaeeeeeeeeeeeeeeee' + this.k)
      //   })
    },
    formatPhone(obj) {
      var numbers = obj.replace(/\D/g, '')
      var char = { 4: '.', 7: '.' }
      obj = ''
      for (var i = 0; i < numbers.length; i++) {
        obj += (char[i] || '') + numbers[i]
      }
      return obj
    },
    hasOneShowingChildren(children) {
      const showingChildren = children.filter(item => {
        return !item.hidden
      })
      if (showingChildren.length === 1) {
        return true
      }
      return false
    },
    handleClickToggle() {
      if (!this.sidebar.opened) this.$store.dispatch('toggleSideBar')
    },
    search(keyword, item) {
      return item.includes(keyword)
    },
    teee(id) {
      this.$router.push('/hotline/' + id)
    },
    click(email) {
      this.$router.push('/billing/' + email)
    },
    // teeeee(id) {
    //   this.$router.push('/billing/' + id)
    // },
    PushAccount(id) {
      alert(id)
      // console.log('aaaaaaaaaa')
      // this.$router.push('/account/' + id)
    },
    phonerouter(id) {
      this.$router.push('/hotline_account/' + id)
    }
  }
}
</script>

<style>
  .submenu-has-icon .el-submenu__title,
  .submenu-has-icon .el-menu-item {
    padding-left: 20px!important;
  }

  #app .el-submenu .submenu-has-no-icon.el-menu-item {
    padding-left: 40px!important;
    background-color: #0e1f31c2!important;
  }

  .sidebar-item-button {
    position: absolute!important;
    right: 35px;
    top: 10px;
  }

  .el-menu--vertical {
    width: 290px;
  }

  .number-index {
    font-size: 16px;
    font-weight: bold;
    margin: 0 18px 0 18px;
    padding: 18px 0 18px 0;
  }

  /*.list-numbers {*/
    /*height: 200px;*/
    /*overflow-x: hidden;*/
    /*overflow-y: scroll;*/
  /*}*/

  .nav-item-ellipsis {
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
    display: block;
    max-width: 125px;
  }

  .list-numbers {
    max-height: 220px;
    overflow-y: scroll;
    overflow-x: hidden;
  }

  .list-numbers::-webkit-scrollbar {
    width: 3px;
  }

  .list-numbers::-webkit-scrollbar-thumb:vertical {
    margin: 15px;
    background-color: rgba(153, 153, 153, 0.5);
    -webkit-border-radius: 3px;
  }

  .list-numbers::-webkit-scrollbar-button:start:decrement,
  .list-numbers::-webkit-scrollbar-button:end:increment {
    height: 4px;
    display: block;
  }

  .list-numbers::-webkit-scrollbar {
    width: 4px;
  }
  .list-numbers::-webkit-scrollbar-track {
    border-radius: 3px;
    background: #060a36;
    border: 3px solid transparent;
  }
  .list-numbers::-webkit-scrollbar-thumb{
    border-radius: 3px;
    background: #18304e;
    border: 3px solid transparent;
  }

  body > .el-menu--vertical.vcc-pbx-menu::-webkit-scrollbar {
    width: 3px;
  }

  body > .el-menu--vertical.vcc-pbx-menu::-webkit-scrollbar-thumb:vertical {
    margin: 15px;
    background-color: rgba(153, 153, 153, 0.5);
    -webkit-border-radius: 3px;
  }

  body > .el-menu--vertical.vcc-pbx-menu::-webkit-scrollbar-button:start:decrement,
  body > .el-menu--vertical.vcc-pbx-menu::-webkit-scrollbar-button:end:increment {
    height: 4px;
    display: block;
  }

  body > .el-menu--vertical.vcc-pbx-menu::-webkit-scrollbar {
    width: 4px;
  }
  body > .el-menu--vertical.vcc-pbx-menu::-webkit-scrollbar-track {
    border-radius: 3px;
    background: #458ee9;
    border: 3px solid transparent;
  }
  body > .el-menu--vertical.vcc-pbx-menu::-webkit-scrollbar-thumb{
    border-radius: 3px;
    background: #3220df;
    border: 3px solid transparent;
  }
  .el-submenu .el-menu-item {
    height: 40px;
    line-height: 40px;
  }
  .el-menu-item, .el-submenu__title {
    height: 45px;
    line-height: 45px;
  }
  .el-menu-item.is-disabled {
    opacity: 0.5;
  }
  .el-menu--collapse .el-menu .el-submenu, .el-menu--popup {
    /*height: 560px;*/
    min-width: 387px;
    /*min-height: auto;*/
  }
  .in {
    width: 100%;
    height: 30px;
    border: 1px solid #ccc;
    border-radius: 4px;
    box-sizing: border-box
  }
  /*------------*/
  .form-control {
    display: block;
    width: 100%;
    height: 34px;
    padding: 6px 12px;
    font-size: 14px;
    line-height: 1.42857143;
    color: #6e6e6e;
    background-color: #fff;
    background-image: none;
    border: 1px solid #ccc;
    border-radius: 4px;
    -webkit-box-shadow: inset 0 1px 1px rgba(0, 0, 0, .075);
    box-shadow: inset 0 1px 1px rgba(0, 0, 0, .075);
    -webkit-transition: border-color ease-in-out .15s, -webkit-box-shadow ease-in-out .15s;
    -o-transition: border-color ease-in-out .15s, box-shadow ease-in-out .15s;
    transition: border-color ease-in-out .15s, box-shadow ease-in-out .15s;
  }
  .form-control:focus {
    border-color: #66afe9;
    outline: 0;
    -webkit-box-shadow: inset 0 1px 1px rgba(0,0,0,.075), 0 0 8px rgba(102, 175, 233, .6);
    box-shadow: inset 0 1px 1px rgba(0,0,0,.075), 0 0 8px rgba(102, 175, 233, .6);
  }
  .form-control::-moz-placeholder {
    color: #999;
    opacity: 1;
  }
  .form-control:-ms-input-placeholder {
    color: #999;
  }
  .form-control::-webkit-input-placeholder {
    color: #999;
  }
  .form-control::-ms-expand {
    background-color: transparent;
    border: 0;
  }
  .form-control[disabled],
  .form-control[readonly],
  fieldset[disabled] .form-control {
    background-color: #eee;
    opacity: 1;
  }
  .form-control[disabled],
  fieldset[disabled] .form-control {
    cursor: not-allowed;
  }

</style>
