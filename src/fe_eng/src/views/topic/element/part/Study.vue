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
                <div style="padding-top: -5px">
                  <el-progress :percentage="percent" status="success"></el-progress>
                </div>
                <el-row :gutter="20" style="margin-left: 0!important; margin-right: 0!important">
                  <el-col :span="8">
                    <center>
                      <h2>{{item.key}}</h2>
                      <p>{{count}}</p>
                      <el-button @click="pronounce(item.key)" type="warning" icon="el-icon-phone-outline" circle></el-button>
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
    name: 'Study',
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
        this.answer[y] = this.item.value
        for (const i in this.answer) {
          console.log('===' + i)
          if (this.answer[i] === '') {
            var x1 = Math.floor((Math.random() * this.words.length) + 0)
            if (this.answer.indexOf(this.words[x1].value) < 0) {
              this.answer[i] = this.words[x1].value
            } else {
              for (let i1 = 0; i1 < this.words.length; i1++) {
                if (this.answer.indexOf(this.words[i1].value) < 0) {
                  this.answer[i] = this.words[i1].value
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
          if (this.radio === this.item.value) {
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
        var msg = new SpeechSynthesisUtterance(this.item.key)
        window.speechSynthesis.speak(msg)
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
      },
      pronounce(nounce) {
        var msg = new SpeechSynthesisUtterance()
        msg.voiceURI = 'native'
        msg.text = nounce
        msg.lang = 'en-US'

        msg.onend = function(e) {
          console.log('Finished in ' + event.elapsedTime + ' seconds.')
        }

        speechSynthesis.speak(msg)
        console.log(nounce)
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
  html {
    font-size: 10px;
  }

  .container {
    height: 100%;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #222831;
  }
  .container #app {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  .container #app > * {
    margin-bottom: 2rem;
  }
  .container .timer {
    font-size: 9rem;
    color: #EEEEEE;
  }
  .container .controls {
    display: flex;
    justify-content: space-evenly;
    width: 100%;
  }
  .container .controls > * {
    color: #FD7014;
    transition: 0.1s ease;
  }
  .container .controls > *:hover {
    cursor: pointer;
    -webkit-transform: scale(1.2);
    transform: scale(1.2);
  }
  .container .input input {
    background-color: #393E46;
    border: none;
    font-size: 2rem;
    padding: 1em;
    text-align: center;
    color: #EEEEEE;
  }
  .container .input .fade-enter-active, .container .input .fade-leave-active {
    transition: opacity .5s;
  }
  .container .input .fade-enter, .container .input .fade-leave-to {
    opacity: 0;
  }
  .image {
    width: 350px;
    height: 250px;
  }
  .test{
    color: red;
  }
  .test2{
    color: black;
  }
</style>
