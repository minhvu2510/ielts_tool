<template>
  <div>
    <el-card shadow="never">
      <div slot="header" class="clearfix" style="position: relative;">
        <span style="font-weight: bold; font-size: 20px"> {{(topics.length)}}</span>
        <el-button @click="dialogFormVisible = true" size="mini" style="padding-left: 10px" type="primary"><i class="fas fa-plus-circle"></i> Thêm mới</el-button>
        <!--<el-button @click="getdata()" type="primary" plain>Show level</el-button>-->
        <!--<el-input-number style="width: 90px" size="mini" v-model="level2" controls-position="right" :min="1" :max="15"></el-input-number>-->
        <!--<div style="float: right">-->
          <!--<el-button @click="confuse()" type="primary">Confuse</el-button>-->
        <!--</div>-->
      </div>
      <el-row :gutter="20" style="margin-left: 0!important; margin-right: 0!important">
        <el-col :xs="24" :sm="24" :lg="24">
          <el-table
            :data="topics"
            stripe
            style="width: 100%">
            <el-table-column
              label="Topic"
              sortable
              width="250">
              <template slot-scope="scope">
                <div v-if="scope.row.edit === false">
                  <div v-if="check"> {{(scope.row.topic)}} <i @click="pronounce(scope.row.topic)" class="el-icon-video-play"></i></div>
                </div>
                <div v-else>
                  <el-input placeholder="Please input" v-model="scope.row.topic"></el-input>
                </div>
              </template>
            </el-table-column>
            <el-table-column
              prop="order"
              sortable
              label="order">
            </el-table-column>
            <el-table-column
              label="order"
              width="200">
              <template slot-scope="scope">
                <div v-if="scope.row.edit === false">
                  <div>{{(scope.row.order)}}</div>
                </div>
                <div v-else>
                  <el-input-number style="width: 80px" size="mini" v-model="scope.row.order" controls-position="right" :min="0" :max="105"></el-input-number>
                </div>
              </template>
            </el-table-column>
            <el-table-column
              label="favorite"
              width="200">
              <template slot-scope="scope">
                <div v-if="scope.row.edit === false">
                  <div>{{(scope.row.favorite)}}</div>
                </div>
                <div v-else>
                  <el-input-number style="width: 80px" size="mini" v-model="scope.row.favorite" controls-position="right" :min="0" :max="15"></el-input-number>
                </div>
              </template>
            </el-table-column>
            <el-table-column
              prop="level"
              label="LE"
              width="100">
              <template slot-scope="scope">
                <div v-if="scope.row.edit === false">
                  {{(scope.row.level)}}
                </div>
                <div v-else>
                  <el-input-number style="width: 80px" size="mini" v-model="scope.row.level" controls-position="right" :min="0" :max="15"></el-input-number>
                </div>
              </template>
            </el-table-column>
            <el-table-column
              label="Manager"
              width="130">
              <template slot-scope="scope">
                <el-button type="text" plain size="mini" v-if="scope.row.edit === true" @click="updateTopic(scope.row)">
                  Lưu
                </el-button>
                <el-button type="text" plain size="mini" v-if="scope.row.edit === true" @click="handleCancelEditUser(scope.row)">
                  Hủy
                </el-button>
                <el-tooltip class="item" effect="dark" content="Sửa đổi" placement="top-start" :enterable="false">
                  <el-button icon="el-icon-edit" type="text" plain size="mini" @click="handleEditUser(scope.row)" v-if="scope.row.edit === false">
                  </el-button>
                </el-tooltip>
                <el-tooltip v-if="scope.row.edit === false" class="item" effect="dark" content="Xoá khỏi hệ thống" placement="top-start" :enterable="false">
                  <!--<el-button type="text"><i class="far fa-edit"></i></el-button>-->
                  <el-button  type="text" plain size="mini" @click="handleDeleteUser(scope.row)">
                    <i class="el-icon-delete"></i>
                  </el-button>
                </el-tooltip>
              </template>
            </el-table-column>
          </el-table>
        </el-col>
        <el-dialog title="Add vocabulary" :visible.sync="dialogFormVisible">
          <el-form>
            <el-form-item label="Topic">
              <el-input v-model="ad_topic" clearable></el-input>
            </el-form-item>
            <el-form-item label="Level">
              <el-input-number style="width: 90px" size="mini" v-model="ad_level" controls-position="right" :min="0" :max="15"></el-input-number>
            </el-form-item>
            <el-form-item label="Favorite">
              <el-input-number style="width: 90px" size="mini" v-model="ad_favorite" controls-position="right" :min="0" :max="15"></el-input-number>
            </el-form-item>
          </el-form>
          <span slot="footer" class="dialog-footer">
    <el-button @click="dialogFormVisible = false">Cancel</el-button>
    <el-button type="primary" @click="addTopic()">Confirm</el-button>
  </span>
        </el-dialog>
      </el-row>
    </el-card>
  </div>
</template>

<script>
  import { getTopics } from '@/api/department'
  export default {
    name: 'topics',
    data() {
      return {
        dialogFormVisible: false,
        level: 15,
        level2: 1,
        en: '',
        vn: '',
        words1: [],
        words2: [],
        check: true,
        check1: true,
        topics: [],
        ad_topic: '',
        ad_level: 12,
        ad_favorite: 0
      }
    },
    mounted() {
      this.getdata()
    },
    methods: {
      getdata() {
        getTopics().then(res => {
          // this.topics = res.data.data
          const words = res.data.data
          for (const j in words) {
            words[j]['edit'] = false
          }
          this.topics = words
        })
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
      },
      handleCancelEditUser(word) {
        word.edit = false
      },
      handleEditUser(word) {
        word.edit = true
      },
      addTopic() {
        const newWord = {
          'topic': this.ad_topic,
          'level': this.ad_level,
          'favorite': this.ad_favorite,
          'idi': this.ad_topic
        }
        this.$http.post(process.env.TEST_LOCAL + '/topics', newWord)
          .then(function(response) {
            if (response.body.status === true) {
              this.$notify({
                title: 'Success',
                message: response.body.message,
                type: 'success'
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
      updateTopic(row) {
        const newIp = {
          'topic': row.topic,
          'level': row.level,
          'favorite': row.favorite,
          'idi': row.idi,
          'order': row.order
        }
        // this.$http.put(process.env.C2C + '/domain', newIp, { headers: { 'Authorization': getToken() }})
        this.$http.put(process.env.TEST_LOCAL + '/topics', newIp)
          .then(function(response) {
            // console.log(response)
            if (response.body.status === true) {
              this.$notify({
                title: 'Success',
                message: response.body.message,
                type: 'success'
              })
              this.getdata()
            } else {
              this.$notify.error({
                title: 'Error',
                message: response.body.message
              })
            }
          }, respone => {
            this.$notify.error({
              title: 'Error',
              message: respone.body.message
            })
          })
      },
      handleDeleteUser(row) {
        const newIp = {
          'idi': row.idi
        }
        // this.$http.put(process.env.C2C + '/domain', newIp, { headers: { 'Authorization': getToken() }})
        this.$http.delete(process.env.TEST_LOCAL + '/topics', { body: newIp })
          .then(function(response) {
            // console.log(response)
            if (response.body.status === true) {
              this.$notify({
                title: 'Success',
                message: response.body.message,
                type: 'success'
              })
              this.getdata()
            } else {
              this.$notify.error({
                title: 'Error',
                message: response.body.message
              })
            }
          }, respone => {
            this.$notify.error({
              title: 'Error',
              message: respone.body.message
            })
          })
      }
    }
  }
</script>

<style scoped>

</style>
