<template>
  <div>
    <el-row>
      <div class="app-container">
        <el-row :gutter="20">
          <el-col :xs="24" :sm="24" :md="24">
            <el-card shadow="never">
              <div slot="header" class="clearfix" style="position: relative;">
                <span style="font-weight: bold; font-size: 20px">Topic {{this.$route.params.nameTopic}}</span>
                <el-button @click="dialogFormVisible = true" size="mini" style="padding-left: 10px" type="primary"><i class="fas fa-plus-circle"></i> Thêm mới</el-button>
                <el-button @click="getdata()" type="primary" plain>Show level</el-button>
                <el-input-number style="width: 90px" size="mini" v-model="level2" controls-position="right" :min="1" :max="15"></el-input-number>
                <div style="float: right">
                  <el-button @click="confuse()" type="primary">Confuse</el-button>
                </div>
              </div>
              <el-row :gutter="20" style="margin-left: 0!important; margin-right: 0!important">
                <el-col :xs="24" :sm="24" :lg="12">
                  <el-table
                    :data="words1"
                    stripe
                    style="width: 100%">
                    <el-table-column
                      label="EN"
                      width="150">
                      <template slot-scope="scope">
                        <div v-if="scope.row.edit === false">
                          <div v-if="check"> {{(scope.row.key)}} <i @click="pronounce(scope.row.key)" class="el-icon-video-play"></i></div>
                        </div>
                        <div v-else>
                          <el-input placeholder="Please input" v-model="scope.row.key"></el-input>
                        </div>
                      </template>
                    </el-table-column>
                    <el-table-column
                      label="VN"
                      width="200">
                      <template slot-scope="scope">
                        <div v-if="scope.row.edit === false">
                          <div v-if="check1">{{(scope.row.value)}}</div>
                        </div>
                        <div v-else>
                          <el-input placeholder="Please input" v-model="scope.row.value"></el-input>
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
                          <el-input-number style="width: 80px" size="mini" v-model="scope.row.level" controls-position="right" :min="1" :max="15"></el-input-number>
                        </div>
                      </template>
                    </el-table-column>
                    <el-table-column
                      label="Manager"
                      width="130">
                      <template slot-scope="scope">
                        <el-button type="text" plain size="mini" v-if="scope.row.edit === true" @click="handleUpdateUserRole(scope.row)">
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
                <el-col :xs="24" :sm="24" :lg="12">
                  <el-table
                    :data="words2"
                    stripe
                    style="width: 100%">
                    <el-table-column
                      prop="key"
                      label="EN"
                      width="150">
                      <template slot-scope="scope">
                        <div v-if="scope.row.edit === false">
                          <div v-if="check"> {{(scope.row.key)}} <i @click="pronounce(scope.row.key)" class="el-icon-video-play"></i></div>
                        </div>
                        <div v-else>
                          <el-input placeholder="Please input" v-model="scope.row.key"></el-input>
                        </div>
                      </template>
                    </el-table-column>
                    <el-table-column
                      prop="value"
                      label="VN"
                      width="200">
                      <template slot-scope="scope">
                        <div v-if="scope.row.edit === false">
                          <div v-if="check1">{{(scope.row.value)}}</div>
                        </div>
                        <div v-else>
                          <el-input placeholder="Please input" v-model="scope.row.value"></el-input>
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
                          <el-input-number style="width: 80px" size="mini" v-model="scope.row.level" controls-position="right" :min="1" :max="15"></el-input-number>
                        </div>
                      </template>
                    </el-table-column>
                    <el-table-column
                      label="Manager"
                      width="130">
                      <template slot-scope="scope">
                        <el-button type="text" plain size="mini" v-if="scope.row.edit === true" @click="handleUpdateUserRole(scope.row)">
                          Lưu
                        </el-button>
                        <el-button type="text" plain size="mini" v-if="scope.row.edit === true" @click="handleCancelEditUser(scope.row)">
                          Hủy
                        </el-button>
                        <el-tooltip class="item" effect="dark" content="Sửa đổi" placement="top-start" :enterable="false">
                          <el-button  icon="el-icon-edit" type="text" plain size="mini" @click="handleEditUser(scope.row)" v-if="scope.row.edit === false">
                          </el-button>
                        </el-tooltip>
                        <el-tooltip v-if="scope.row.edit === false" class="item" effect="dark" content="Xoá khỏi hệ thống" placement="top-start" :enterable="false">
                          <el-button  type="text" plain size="mini" @click="handleDeleteUser(scope.row)">
                            <i class="el-icon-delete"></i>
                          </el-button>
                        </el-tooltip>
                      </template>
                    </el-table-column>
                  </el-table>
                </el-col>
              </el-row>
            </el-card>
          </el-col>
        </el-row>
      </div>
      <el-dialog title="Add vocabulary" :visible.sync="dialogFormVisible">
        <el-form>
          <el-form-item label="EN">
            <el-input v-model="en" clearable></el-input>
          </el-form-item>
          <el-form-item label="VN">
            <el-input @keyup.native.enter="addVoca" v-model="vn" clearable></el-input>
          </el-form-item>
          <el-form-item label="Level">
            <el-rate
              v-model="level"
              :max=15
              :colors="['#99A9BF', '#F7BA2A', '#FF9900']">
            </el-rate>
            <span>{{level}}</span>
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
    <el-button @click="dialogFormVisible = false">Cancel</el-button>
    <el-button type="primary" @click="addVoca()">Confirm</el-button>
  </span>
      </el-dialog>
    </el-row>
  </div>
</template>

<script>
  import { getConfuse } from '@/api/department'
  export default {
    name: 'showAll',
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
        check1: true
      }
    },
    mounted() {
      this.getdata()
    },
    methods: {
      getdata() {
        const params = {
          level: this.level2
        }
        getConfuse(params).then(res => {
          console.log('===========================')
          console.log(res)
          // this.words = res.data.data
          let words = []
          this.words1 = []
          this.words2 = []
          words = res.data.data
          for (const j in words) {
            words[j]['edit'] = false
          }
          console.log(parseInt(words.length / 2))
          if (words.length > 1) {
            for (let i = 0; i < words.length / 2; i++) {
              this.words1.push(words[i])
            }
            // this.words1.sort(function() { return 0.5 - Math.random() })
            for (let i = (words.length % 2) ? parseInt(words.length / 2) + 1 : parseInt(words.length / 2); i < words.length; i++) {
              this.words2.push(words[i])
              // this.words2[i]['edit'] = false
            }
            // this.words2.sort(function() { return 0.5 - Math.random() })
          } else {
            this.words1 = words
          }
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
      confuse() {
        this.words1.sort(function() { return 0.5 - Math.random() })
        this.words2.sort(function() { return 0.5 - Math.random() })
      },
      addVoca() {
        const newWord = {
          'key': this.en,
          'value': this.vn,
          'level': this.level,
          'table': this.$route.params.nameTopic
        }
        this.$http.post(process.env.TEST_LOCAL + '/preview', newWord)
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
      update(word) {
        // console.log(word.en)
        const newIp = {
          'key': word.key,
          'value': word.value,
          'level': word.level,
          'table': this.$route.params.nameTopic,
          '_id': word._id.$oid
        }
        // this.$http.put(process.env.C2C + '/domain', newIp, { headers: { 'Authorization': getToken() }})
        this.$http.put(process.env.TEST_LOCAL + '/preview', newIp)
          .then(function(response) {
            // console.log(response)
            if (response.body.status === true) {
              this.$notify({
                title: 'Success',
                message: response.body.message,
                type: 'success'
              })
              // this.getdata()
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
      delete(word) {
        const newIp = {
          'table': this.$route.params.nameTopic,
          '_id': word._id.$oid
        }
        this.$http.delete(process.env.TEST_LOCAL + '/preview', { body: newIp })
        // this.$http.delete(process.env.TEST_LOCAL + '/test1', newIp)
          .then(function(response) {
            if (response.body.status === true) {
              this.$notify({
                title: 'Success',
                message: response.body.message,
                type: 'success'
              })
              this.getdata()
            }
          }, respone => {
            this.$notify.error({
              title: 'Error',
              message: respone.body.message
            })
          })
      },
      handleDeleteUser(word) {
        word.edit = false
        this.delete(word)
      },
      handleCancelEditUser(word) {
        word.edit = false
      },
      handleEditUser(word) {
        word.edit = true
      },
      handleUpdateUserRole(word) {
        this.update(word)
        word.edit = false
      }
    }
  }
</script>

<style scoped>

</style>
