<template>
  <div>
    <el-row>
      <div class="app-container">
        <el-row :gutter="20">
          <el-col :xs="24" :sm="24" :md="24">
            <el-card shadow="never">
              <div slot="header" class="clearfix" style="position: relative;">
                <span style="font-weight: bold; font-size: 20px">Topic {{this.$route.params.nameTopic}}</span>
                <div style="float: right">
                  <input type="text" v-if="edit" v-model="userTime">
                  <el-tag type="success">{{ minutes }}:{{ seconds }}</el-tag>
                  <el-button @click="checkAnser()" type="primary">Start</el-button>
                  <el-button @click="check = !check" type="success" plain>Show answer</el-button>
                  <el-button @click="test = !test" type="warning" plain>Hide vn</el-button>
                  <!--<el-button @click="editTimer()" type="warning" plain>Hidesss vn</el-button>-->
                </div>
              </div>
              <div v-if="show">
                <div>
                  <el-progress :percentage="percent" status="success"></el-progress>
                </div>
                <el-row :gutter="20" style="margin-left: 0!important; margin-right: 0!important">
                  <el-col :span="8">
                    <center>
                      <h2>{{item.value}}</h2>
                      <p>{{count}}</p>
                    </center>
                  </el-col>
                  <el-col :span="16">
                    <div v-if="check">
                      <el-row>
                        <el-col :span="12" v-for="i in answer" :key="i.key" style="padding-top: 40px">
                          <el-radio v-model="radio" :label="i">{{i}}</el-radio>
                        </el-col>
                      </el-row>
                    </div>
                  </el-col>
                </el-row>
                <el-row style="padding-top: 40px">
                  <center>
                    <el-button @click="memorize()" type="danger"><i class="fas fa-download"></i></el-button>
                    <el-button @click="exampale()" type="primary"><i class="fas fa-forward"></i></el-button>
                  </center>
                </el-row>
              </div>
              <div v-else>
                <center>
                  <img src="../../../../assets/tt.jpg" class="image">
                  <h3 class="test" style="font-family: 'Merriweather', serif" :class="{'test2': test}">code by vunm</h3>
                </center>
              </div>
            </el-card>
          </el-col>
        </el-row>
      </div>
    </el-row>
  </div>
</template>

<script>
  export default {
    name: 'VnToE',
    data() {
      return {
        test: true,
        show: false,
        radio: '',
        check: true,
        words: [],
        item: '',
        answer: ['', '', '', ''],
        ramdom: 1,
        timer: null,
        totalTime: (15 * 60),
        resetButton: false,
        title: 'Countdown to rest time!',
        edit: false,
        userTime: 26,
        percent: 0,
        count: 0
      }
    },
    mounted() {
      this.getdata()
      // this.checkAnser()
      // this.getramdom()
    },
    methods: {
      getdata() {
        this.$http.get(process.env.TEST_LOCAL + '/preview', { headers: { 'Authorization': 'vudz' }, params: { table: this.$route.params.nameTopic, level: 1 }})
          .then(function(response) {
            this.words = response.body.data
            console.log(this.words)
            // this.item = this.words[Math.floor(Math.random() * this.words.length)]
          })
      },
      getramdom() {
        console.log(this.words)
        this.item = this.words[Math.floor(Math.random() * this.words.length)]
        console.log(this.item)
      },
      memorize() {
        const newWord = {
          'key': this.item.key,
          'table': this.$route.params.nameTopic
        }
        this.$http.post(process.env.TEST_LOCAL + '/showexample', newWord)
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
      },
      checkAnser() {
        this.show = true
        if (this.totalTime === (15 * 60)) {
          this.startTimer()
        }
        this.answer = ['', '', '', '']
        this.radio = ''
        this.ramdom = Math.floor((Math.random() * this.words.length) + 0)
        this.item = this.words[this.ramdom]
        console.log(this.item)
        var y = Math.floor((Math.random() * 4) + 0)
        this.answer[y] = this.item.key
        for (const i in this.answer) {
          console.log('===' + i)
          if (this.answer[i] === '') {
            var x1 = Math.floor((Math.random() * this.words.length) + 0)
            if (this.answer.indexOf(this.words[x1].key) < 0) {
              this.answer[i] = this.words[x1].key
            } else {
              for (let i1 = 0; i1 < this.words.length; i1++) {
                if (this.answer.indexOf(this.words[i1].key) < 0) {
                  this.answer[i] = this.words[i1].key
                }
              }
            }
          }
        }
      },
      exampale() {
        if (this.radio === '') {
          this.count = this.count + 1
          this.percent = parseInt((this.count / (this.words.length + 7)) * 100)
          this.item = this.words[this.ramdom]
          this.checkAnser()
        } else {
          this.count = this.count + 1
          this.percent = parseInt((this.count / (this.words.length + 7)) * 100)
          this.item = this.words[this.ramdom]
          if (this.radio === this.item.key) {
            this.$message({
              message: 'Congrats, this is a success message.',
              type: 'success'
            })
          } else {
            this.$message({
              message: 'Congrats, this is a success message.',
              type: 'warning'
            })
            this.memorize()
          }
          this.checkAnser()
        }
      },
      startTimer: function() {
        this.timer = setInterval(() => this.countdown(), 1000)
        this.resetButton = true
        this.edit = false
      },
      stopTimer: function() {
        clearInterval(this.timer)
        this.timer = null
        this.resetButton = true
      },
      resetTimer: function() {
        this.totalTime = (this.userTime * 60)
        clearInterval(this.timer)
        this.timer = null
        this.resetButton = false
      },
      editTimer: function() {
        this.edit = !this.edit
      },
      padTime: function(time) {
        return (time < 10 ? '0' : '') + time
      },
      countdown: function() {
        this.totalTime--
      }
    },
    computed: {
      minutes: function() {
        const minutes = Math.floor(this.totalTime / 60)
        return this.padTime(minutes)
      },
      seconds: function() {
        const seconds = this.totalTime - (this.minutes * 60)
        return this.padTime(seconds)
      }
    }
  }
</script>

<style scoped>
  .image {
    width: 350px;
    height: 250px;
  }
</style>
