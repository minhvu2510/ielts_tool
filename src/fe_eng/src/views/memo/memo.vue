<template>
  <div>
    <el-row :gutter="10">
      <el-col :span="8" >
        <el-row>
          <div class="app-container">
            <el-input
              type="textarea"
              :rows="28"
              placeholder="Please input"
              v-model="textarea">
            </el-input>
          </div>
          <center>
            <el-button type="primary" @click="sendServer" plain>Primary</el-button>
          </center>
        </el-row>
        <br/>
      </el-col>
      <el-col :span="8" >
        <div class="mv">
        </div>
      </el-col>
      <el-col :span="8" ></el-col>
    </el-row>
  </div>
</template>

<script>
  export default {
    name: 'memo',
    data() {
      return {
        textarea: ''
      }
    },
    methods: {
      sendServer() {
        console.log(this.textarea)
        const newWord = {
          'key': this.textarea,
          'table': 'mv'
        }
        this.$http.post(process.env.TEST_LOCAL + '/memo', newWord)
          .then(function(response) {
            if (response.body.status === true) {
              this.$notify({
                title: 'Success',
                message: response.body.message,
                type: 'success',
                position: 'bottom-right'
              })
              this.getdata()
              // this.$session.set('username', this.$store.state.username)
            } else {
              this.$notify.error({
                title: 'Error',
                message: response.body.message
              })
            }
          }, respone => {
            this.notify('warning', respone.body.message)
          })
      }
    }
  }
</script>

<style scoped>
  .mv  {
    height: 700px;
    position: relative;
    background-size: contain;
    /*background-repeat: no-repeat;*/
    /*background-position: center;*/
    background-image: url("../../assets/icona.jpg");
    background-color: #cccccc;
  }
</style>
