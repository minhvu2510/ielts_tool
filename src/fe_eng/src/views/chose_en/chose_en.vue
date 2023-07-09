<template>
  <div>
    <el-row>
      <div class="app-container">
        <el-row :gutter="20">
          <el-col :xs="24" :sm="24" :md="24">
            <el-card shadow="never">
              <div slot="header" class="clearfix" style="position: relative;">
                <span style="font-weight: bold; font-size: 20px">VN test</span>
                <el-button @click="checkAnser()" type="primary">Start</el-button>
                <el-tag type="success">{{ minutes }}:{{ seconds }}</el-tag>
                <div style="float: right">
                  <input type="text" v-if="edit" v-model="userTime">
                  <!--<el-tag type="success">{{ minutes }}:{{ seconds }}</el-tag>-->
                  <!--<el-button @click="startTimer()" type="primary">Start</el-button>-->
                  <el-button v-if="check_start"  @click="check = !check" type="success" plain>Show answer</el-button>
                  <!--<el-button v-if="check_start" @click="test = !test" type="warning" plain>Hide vn</el-button>-->
                  <!--<el-button @click="editTimer()" type="warning" plain>Hidesss vn</el-button>-->
                </div>
              </div>
              <div v-if="check_start">
                <!--<p>minhvu</p>-->
                <!--<div v-for="i in vocab" :key="i.key">-->
                <!--<p>{{i.key}}</p>-->
                <!--</div>-->
                <el-row :gutter="20" style="margin-left: 0!important; margin-right: 0!important">
                  <el-col :span="12">
                    <center>
                      <h2>{{item.value}}</h2>
                      <el-progress :percentage="percent" status="success"></el-progress>
                      <p>{{count}}</p>
                    </center>
                  </el-col>
                  <el-col :span="12">
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
                    <!--<el-button @click="memorize()" type="danger"><i class="fas fa-download"></i></el-button>-->
                    <el-button @click="exampale()" type="primary"><i class="fas fa-forward"></i></el-button>
                  </center>
                </el-row>
              </div>
              <div v-else>
                <center>
                  <img src="../../assets/mv2.jpg" class="image">
                  <h3 class="test" style="font-family: 'Merriweather', serif">code by vunm</h3>
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
  import { getConfuse } from '@/api/department'
  export default {
    name: 'chose_en',
    data() {
      return {
        check_start: false,
        totalTime: (15 * 60),
        resetButton: false,
        title: 'Countdown to rest time!',
        edit: false,
        userTime: 26,
        percent: 0,
        count: 0,
        level_get: 9,
        words: [],
        item: '',
        radio: '',
        check: true,
        answer: []
      }
    },
    mounted() {
      this.getdata()
    },
    methods: {
      getdata() {
        const params = {
          level: this.level_get
        }
        getConfuse(params).then(res => {
          console.log('===========================')
          console.log(res)
          this.words = res.data.data
        })
      },
      checkAnser() {
        this.check_start = true
        console.log(this.check_start)
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
          this.percent = parseInt((this.count / (this.words.length + 7)) * 100)
          this.item = this.words[this.ramdom]
          if (this.radio === this.item.key) {
            this.count = this.count + 1
            this.$message({
              message: 'Congrats, this is a success message.',
              type: 'success'
            })
            this.checkAnser()
          } else {
            this.$message({
              message: 'Congrats, có một sự nhầm lẫn ko hề nhẹ',
              type: 'warning'
            })
          }
        }
      },
      startTimer: function() {
        this.check_start = true
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
    height: 300px;
  }
</style>
