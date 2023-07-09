<template>
  <div>
    <iframe src="https://www.toeicmoingay.com/" width="1300" height="2400" frameborder="0" ></iframe>
  </div>
</template>

<script>
  export default {
    name: 'history',
    data() {
      return {
        show: false,
        activety: null,
        pag: 1,
        new_data: null,
        total: 0
      }
    },
    mounted() {
      // this.get_method(this.pag)
    },
    methods: {
      get_method(page) {
        this.$http.get(process.env.SWAPI_URL + '/activity', { headers: { 'Authorization': this.$session.get('token') }, params: { offset: page, limit: 15 }})
          .then(function(response) {
            if (response.body.status === true) {
              this.activety = response.data.data
              this.total = response.data.total
              this.k = (parseInt(response.data.total / 15) * 10) + 1
              console.log(this.total)
            }
          }, respone => {
            if (respone.body.status === false) {
              // console.log('aaa')
              // this.$session.destroy()
              // this.$cookies.remove('token')
              // this.$cookies.remove('otp')
              // this.$router.push('/login')
            }
          })
      },
      handleCurrentChange() {
        this.get_method(this.pag)
      }
    }
  }
</script>

<style scoped>

</style>
