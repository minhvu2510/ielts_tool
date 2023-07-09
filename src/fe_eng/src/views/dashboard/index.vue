<template>
  <div style="padding: 2%;padding-top: 10px; background-image: url('https://gonefisching.com/wp-content/uploads/2020/04/Tres-Lagunas-Cordillera-Huayhuash.jpg');">
    <el-row :gutter="40" style="padding: 20px;padding-top: 10px">
      <el-col :xs="24" :sm="24" :lg="8" :md="12">
        <div class="grid-content bg-purple">
          <div class="hea3" style="border-right: 1px #e6e6e6 solid">
            <div style="margin-bottom: 40px;border: black">
              <el-button @click="pushdata()" style="font-size: 18px" type="text">Raise</el-button>
            </div>
          </div>
          <el-row>
            <el-col :span="14">
              <el-row style="padding-left: 5px;padding-top: 5px">
                <el-input
                  size="mini"
                  placeholder="EN"
                  clearable
                  v-model="en">
                </el-input>
              </el-row>
              <el-row style="padding-left: 5px;padding-bottom: 2px;padding-top: 15px">
                <el-input
                  @keyup.native.enter="pushdata()"
                  size="mini"
                  placeholder="VN"
                  clearable
                  v-model="vn">
                </el-input>
              </el-row>
            </el-col>
            <el-col :span="10">
              <center style="padding-top: 25px">
                <el-input-number style="width: 100px;" size="mini" v-model="lev"></el-input-number>
              </center>
            </el-col>
          </el-row>
          <!--==================================-->
          <!--<el-row style="padding-top: 2px;padding-bottom: 2px">-->
            <!--<center>-->
              <!--<el-input-number size="mini" v-model="lev"></el-input-number>-->
            <!--</center>-->
            <!--&lt;!&ndash;<el-rate v-model="lev" :max='15'></el-rate>&ndash;&gt;-->
          <!--</el-row>-->
          <!--<div style="height: 4px;width: 100%;background-color: rgba(227, 222, 110, 0.97)"></div>-->
        </div>
      </el-col>
      <el-col :xs="24" :sm="24" :lg="8" :md="12">
        <div class="grid-content bg-purple">
          <div class="hea">
            <div v-if="total">Progress: <countTo :startVal='0' :endVal='total' :duration='3500'></countTo></div>
          </div>
          <el-row>
            <el-col :xs="8" :sm="8" :lg="8" :md="12" style="border-right: 1px #e6e6e6 solid">
              <el-row>
                <el-col :span="10"><center><div class="dd"><br></div></center></el-col>
                <el-col :span="14" style="margin-top: 3px;color: #616366"><span>Expert</span></el-col>
              </el-row>
              <div>
                <div style="text-align: center;padding-top: 15px;font-size: 24px;color: #616366">
                  <countTo :startVal='0' :endVal='expert' :duration='3500'></countTo>
                </div>
              </div>
              <br>
              <!--<center style="vertical-align:middle">22</center>-->
            </el-col>
            <el-col :xs="8" :sm="8" :lg="8" :md="12" style="border-right: 1px #e6e6e6 solid">
              <el-row>
                <el-col :span="5"><center><div class="dd1"><br></div></center></el-col>
                <el-col :span="19" style="margin-top: 3px;color: #616366"><span>Vague</span></el-col>
                <!--<div class="dd">-->
                <!--</div>-->
              </el-row>
              <div>
                <div style="text-align: center;padding-top: 15px;font-size: 24px;color: #616366"><countTo :startVal='0' :endVal='vague' :duration='3500'></countTo></div>
              </div>
              <br>
            </el-col>
            <el-col :xs="8" :sm="8" :lg="8" :md="12">
              <el-row>
                <el-col :span="6"><center><div class="dd2"><br></div></center></el-col>
                <el-col :span="18" style="margin-top: 3px;color: #616366"><span>Forget</span></el-col>
                <!--<div class="dd">-->
                <!--</div>-->
              </el-row>
              <div>
                <div style="text-align: center;padding-top: 15px;font-size: 24px;color: #616366"><countTo :startVal='0' :endVal='forget' :duration='3500'></countTo></div>
              </div>
              <br>
            </el-col>
          </el-row>
          <div style="height: 4px;width: 100%;background-color: rgba(75, 179, 197, 0.97)"></div>
        </div>
      </el-col>
      <el-col :xs="24" :sm="24" :lg="8" :md="12">
        <div class="grid-content bg-purple">
          <div class="hea1">
            <div>Counter <countTo :startVal='0' :endVal='innings' :duration='3000'></countTo></div>
          </div>
          <el-row>
            <el-col :span="12" style="border-right: 1px #e6e6e6 solid">
              <el-row>
                <el-col :span="10"><center><div class="dd"><br></div></center></el-col>
                <el-col :span="14" style="margin-top: 3px;color: #616366"><span>Done</span></el-col>
              </el-row>
              <div>
                <div style="text-align: center;padding-top: 15px;font-size: 24px;color: #616366"><countTo :startVal='0' :endVal='innings' :duration='3500'></countTo></div>
              </div>
              <br>
            </el-col>
            <el-col :span="12">
              <el-row>
                <el-col :span="10"><center><div class="dd2"><br></div></center></el-col>
                <el-col :span="14" style="margin-top: 3px;color: #616366"><span>Incomplete</span></el-col>
              </el-row>
              <div>
                <div style="text-align: center;padding-top: 15px;font-size: 24px;color: #616366"><countTo :startVal='0' :endVal='incomplete' :duration='3500'></countTo></div>
              </div>
            </el-col>
          </el-row>
          <div style="height: 4px;width: 100%;background-color: rgba(63, 173, 79, 0.97)"></div>
        </div>
      </el-col>
    </el-row>
    <div style="padding: 20px">
      <el-row :gutter="20">
        <el-col :xs="24" :sm="24" :lg="12">
          <el-card style="height: 410px;overflow: scroll;">
            <div slot="header" class="clearfix">
              <i class="fas fa-user-tag fa-fw"></i> <strong>Hot</strong>
            </div>
            <el-row>
              <el-col style="border-right: 1px #e6e6e6 solid" v-for="i in exten" :key="i.key" :span="6">
                <center><p>{{i.key}}</p></center>
              </el-col>
            </el-row>
            <!--<pie-chart></pie-chart>-->
          </el-card>
        </el-col>
        <el-col :xs="24" :sm="24" :lg="12">
          <el-card style="height: 410px;overflow: scroll;">
            <div slot="header" class="clearfix">
              <i class="fas fa-user-tag fa-fw"></i> <strong>Note</strong>
              <el-button size="mini" type="success" @click="check_add =! check_add" plain>Add</el-button>
            </div>
            <div v-if="check_add === false">
              <div v-for="not in note" :key="not.note">
                <el-row>
                  <p>{{not.note}}</p>
                </el-row>
              </div>
              <!--<pie-chart></pie-chart>-->
            </div>
            <div v-else>
              <el-input
                type="textarea"
                :rows="10"
                placeholder="Please input"
                v-model="note_ad">
              </el-input>
              <center style="padding-top: 5px">
                <el-input-number max="15" style="width: 100px;" size="mini" v-model="lev_note"></el-input-number>
              </center>
              <center style="padding-top: 5px">
                <el-button size="mini" type="success" @click="pushNote()" plain>Confirm</el-button>
              </center>
            </div>
          </el-card>
        </el-col>
      </el-row>
      <el-row>
        <el-card style="height: 410px;overflow: scroll;">
          <div slot="header" class="clearfix">
            <i class="fas fa-user-tag fa-fw"></i> <strong>Note</strong>
            <el-button size="mini" type="success" @click="check_add =! check_add" plain>Add</el-button>
          </div>
          <pie-chart></pie-chart>
          <div>
          </div>
        </el-card>
      </el-row>
    </div>
  </div>
</template>

<script>
  import PanelGroup from './admin/components/PanelGroup'
  // import LineChart from './admin/components/LineChart'
  import pieChart from './admin/components/PieChart'
  import countTo from 'vue-count-to'
  import { addExtension, getExtention, userInfor, getNote, addNote } from '@/api/department'
  import moment from 'moment'
  import { getToken } from '@/utils/auth'
  export default {
    name: 'dashboard-admin',
    components: {
      PanelGroup,
      // LineChart,
      pieChart,
      countTo
    },
    data() {
      return {
        lev: 14,
        en: '',
        vn: '',
        chartOptions: null,
        chart: null,
        chart1: null,
        total: 0,
        expert: 0,
        vague: 0,
        forget: 0,
        note: [],
        packages: {
          total: 0
        },
        exten: null,
        pro: 0,
        available: 0,
        used: 0,
        innings: 0,
        incomplete: 0,
        check_add: false,
        lev_note: 15,
        note_ad: ''
      }
    },
    mounted() {
      this.getdata()
    },
    created() {
      this.getdata()
      this.getuser()
      this.getNote()
    },
    methods: {
      getdata() {
        const params = {
          start: moment(new Date().toDateString()).format('DD-MM-YYYY')
        }
        getExtention(params).then(res => {
          console.log(getToken())
          this.total = res.data.total
          this.expert = res.data.expert
          this.vague = res.data.vague
          this.forget = res.data.forget
          this.exten = res.data.data
        })
      },
      getuser() {
        const params = {
          start: moment(new Date().toDateString()).format('DD-MM-YYYY')
        }
        userInfor(params).then(res => {
          this.innings = res.data.innings
          this.incomplete = res.data.incomplete
        })
      },
      getNote() {
        getNote().then(res => {
          console.log(res)
          this.note = res.data.data
        })
        console.log(this.note)
      },
      pushdata() {
        const params = {
          key: this.en,
          value: this.vn,
          level: this.lev,
          creat_day: moment(new Date().toDateString()).format('DD-MM-YYYY')
        }
        addExtension(params).then(res => {
          if (res.data.status === true) {
            this.$notify({
              title: 'Thành công',
              message: res.data.message,
              type: 'success'
            })
            this.getdata()
          } else {
            this.$notify({
              title: 'emergency',
              message: res.data.message,
              type: 'error'
            })
          }
          // this.$notify({
          //   title: 'Thành công',
          //   message: 'Thêm vai trò mới thành công!',
          //   type: 'success'
          // })
        })
      },
      pushNote() {
        const params = {
          note: this.note_ad,
          level: this.lev_note
        }
        addNote(params).then(res => {
          if (res.data.status === true) {
            this.$notify({
              title: 'Thành công',
              message: res.data.message,
              type: 'success'
            })
            this.getNote()
            this.check_add = false
          } else {
            this.$notify({
              title: 'emergency',
              message: res.data.message,
              type: 'error'
            })
          }
        })
      }
    }
  }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  .dashboard-editor-container {
    padding: 32px;
    background-color: rgb(240, 242, 245);
    .chart-wrapper {
      background: #fff;
      padding: 16px 16px 0;
      margin-bottom: 32px;
    }
  }
  .bg-purple {
    background: #ffffff;
  }
  .bg-purple-light {
    background: #ffffff;
  }
  .grid-content {
    border-radius: 4px;
    min-height: 135px;
  }
  .hea {
    font-size: 21px;
    padding-top: 14px;
    color: white;
    text-align: center;
    height: 50px;
    width: 100%;
    background-color: rgb(111, 162, 213);
  }
  .hea1 {
    font-size: 21px;
    padding-top: 14px;
    color: white;
    text-align: center;
    height: 50px;
    width: 100%;
    background-color: rgba(85, 173, 122, 0.97);
  }
  .hea2 {
    font-size: 21px;
    padding-top: 14px;
    color: white;
    text-align: center;
    height: 50px;
    width: 100%;
    background-color: rgba(227, 222, 110, 0.97);
  }
  .hea3 {
    font-size: 21px;
    padding-top: 14px;
    color: white;
    text-align: center;
    height: 50px;
    width: 100%;
    background-color: rgba(215, 214, 108, 0.97);
  }
  .dd {
    margin-top: 7px;
    height: 10px;
    width: 10px;
    -moz-border-radius: 25px;
    -webkit-border-radius: 25px;
    --border-radius: 25px;
    background-color: rgba(49, 183, 83, 0.97);
  }
  .dd1 {
    margin-top: 7px;
    height: 10px;
    width: 10px;
    -moz-border-radius: 25px;
    -webkit-border-radius: 25px;
    --border-radius: 25px;
    background-color: rgba(37, 141, 197, 0.97);
  }
  .dd2 {
    margin-top: 7px;
    height: 10px;
    width: 10px;
    -moz-border-radius: 25px;
    -webkit-border-radius: 25px;
    --border-radius: 25px;
    background-color: rgba(239, 11, 25, 0.97);
  }
</style>
