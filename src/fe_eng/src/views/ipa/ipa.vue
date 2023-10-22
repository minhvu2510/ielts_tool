<template>
  <div>
    <!--<el-row class="page-title">-->
    <!--<h4 style="float: left">-->
    <!--Topic {{this.$route.params.nameTopic}}-->
    <!--</h4>-->
    <!--<div style="float: right;margin-top: 10px">-->
    <!--<el-button type="success" icon="el-icon-circle-plus" plain>Thêm hotline cho khách hàng</el-button>-->
    <!--</div>-->
    <!--</el-row>-->
    <el-row>
      <div class="app-container" >
        <el-row :gutter="10">
          <el-col :xs="24" :sm="24" :md="24">
            <el-card shadow="never">
              <div slot="header" class="clearfix" style="position: relative;">
                <el-row>
                  <el-col :span="1">
                    <span style="font-weight: bold; font-size: 20px">IPA</span>
                  </el-col>
                  <el-col :span="2">
                    <el-button @click="dialogFormVisible = true" size="mini" style="padding-left: 10px" type="primary">
                      <i class="fas fa-plus-circle"></i> Thêm mới
                    </el-button>
                  </el-col>
                  <el-col :span="2">
                    <el-button @click="getdata()" type="primary" plain>Spell</el-button>
                  </el-col>
                  <el-col :span="3">
                    <el-input type="text" v-model="level2" size="small"></el-input>
                  </el-col>
                  <el-col :span="3">
                    <el-select v-model="level2" placeholder="Select" size="small">
                      <el-option
                        v-for="item in options"
                        :key="item"
                        :label="item"
                        :value="item"
                      />
                    </el-select>
                  </el-col>
                </el-row>

                <div style="float: right">
                  <el-button @click="confuse()" type="primary">Confuse</el-button>
                  <el-button @click="check = !check" type="success" plain>Hide en</el-button>
                  <el-button @click="check1 = !check1" type="warning" plain>Hide vn</el-button>
                </div>
              </div>
              <el-row :gutter="20" style="margin-left: 0!important; margin-right: 0!important">
                <el-col :xs="24" :sm="24" :lg="12">
                  <el-table
                    :data="words1"
                    stripe
                    style="width: 100%">
                    <el-table-column
                      label="Ipa"
                      width="100">
                      <template slot-scope="scope">
                        <div v-if="scope.row.edit === false">
                            <div v-if="check"> {{(scope.row.ipa)}} <button class="btn btn-primary btn-sm" @click.prevent="playSound(scope.row.spell)"><span class="el-icon-video-play"></span></button></div>
                        </div>
                        <div v-else>
                          <el-input placeholder="Please input" v-model="scope.row.word"></el-input>
                          <el-input placeholder="Please input" v-model="scope.row.audio"></el-input>
                        </div>
                      </template>
                    </el-table-column>
                    <el-table-column
                      label="Description"
                      width="200">
                      <template slot-scope="scope">
                        <div v-if="scope.row.edit === false">
                          <div>{{scope.row.description}}</div>
                        </div>
                        <div v-else>
                          <el-input placeholder="Please input" v-model="scope.row.description"></el-input>
                        </div>
                      </template>
                    </el-table-column>
                    <el-table-column
                      label="Example"
                      width="100">
                      <template slot-scope="scope">
                        <div v-if="scope.row.edit === false">
                          <div>{{scope.row.example[0].word}} - {{scope.row.example[0].spell}}</div>
                        </div>
                        <div v-else>
                          <el-input placeholder="Please input" v-model="scope.row.example"></el-input>
                        </div>
                      </template>
                    </el-table-column>
                    <el-table-column
                      label="Type"
                      width="150">
                      <template slot-scope="scope">
                        <div v-if="scope.row.edit === false">
                          <div v-if="scope.row.type === '1'">Nguyên âm đơn</div>
                            <div v-if="scope.row.type === '2'">Nguyên âm đôi</div>
                            <div v-if="scope.row.type === '3'">Phụ âm</div>
                            <div v-if="scope.row.type === '4'">Phụ âm</div>
                        </div>
                        <div v-else>
                          <el-input placeholder="Please input" v-model="scope.row.type"></el-input>
                        </div>
                      </template>
                    </el-table-column>
                    <el-table-column
                      prop="level"
                      label="LE"
                      width="50">
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
                      label="Ipa"
                      width="100">
                        <template slot-scope="scope">
                            <div v-if="scope.row.edit === false">
                                <div v-if="check"> {{(scope.row.ipa)}} <button class="btn btn-primary btn-sm" @click.prevent="playSound(scope.row.spell)"><span class="el-icon-video-play"></span></button></div>
                            </div>
                            <div v-else>
                                <el-input placeholder="Please input" v-model="scope.row.word"></el-input>
                                <el-input placeholder="Please input" v-model="scope.row.audio"></el-input>
                            </div>
                        </template>
                    </el-table-column>
                    <el-table-column
                      label="Description"
                      width="200">
                        <template slot-scope="scope">
                            <div v-if="scope.row.edit === false">
                                <div>{{scope.row.description}}</div>
                            </div>
                            <div v-else>
                                <el-input placeholder="Please input" v-model="scope.row.description"></el-input>
                            </div>
                        </template>
                    </el-table-column>
                    <el-table-column
                      label="Example"
                      width="100">
                        <template slot-scope="scope">
                            <div v-if="scope.row.edit === false">
                                <div>{{scope.row.example[0].word}} - {{scope.row.example[0].spell}}</div>
                            </div>
                            <div v-else>
                                <el-input placeholder="Please input" v-model="scope.row.example"></el-input>
                            </div>
                        </template>
                    </el-table-column>
                    <el-table-column
                      prop="value"
                      label="Type"
                      width="150">
                        <template slot-scope="scope">
                            <div v-if="scope.row.edit === false">
                                <div v-if="scope.row.type === '1'">Nguyên âm đơn</div>
                                <div v-if="scope.row.type === '2'">Nguyên âm đôi</div>
                                <div v-if="scope.row.type === '3'">Phụ âm</div>
                                <div v-if="scope.row.type === '4'">Phụ âm</div>
                            </div>
                            <div v-else>
                                <el-input placeholder="Please input" v-model="scope.row.type"></el-input>
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
          <el-form-item label="Word">
            <el-input v-model="en" clearable></el-input>
          </el-form-item>
          <el-form-item label="Spell">
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
    <!--<el-button @click="addVoca()">Cancel</el-button>-->
  </div>
</template>

<script>
export default {
  name: 'showTable',
  data() {
    return {
      dialogFormVisible: false,
      level: 15,
      level2: '',
      en: '',
      vn: '',
      words1: [],
      words2: [],
      check: true,
      lent: 0,
      check1: true,
      options: ['/ɪ/', '/iː/', '/e/', '/ə/', '/ɜ:/', '/ʊ/', '/u:/', '/ɒ/', '/ɔ:/', '/ʌ/', '/ɑ:/', '/æ/', ' /ɪə/', '/eə/', '/eɪ/', '/ɔɪ/ ', '/aɪ/', '/əʊ/', '/aʊ/', '/ʊə/', '/i:/', '/i:/']
    }
  },
  mounted() {
    this.getdata()
  },
  methods: {
    getdata() {
      this.$http.get(process.env.TEST_LOCAL + '/ipaeng', { headers: { 'Authorization': 'vudz' }, params: { spell: this.level2 }})
        .then(function(response) {
          let words = []
          this.words1 = []
          this.words2 = []
          words = response.body.data
          console.log('words')
          console.log(words)
          this.lent = words.length
          for (const j in words) {
            words[j]['edit'] = false
          }
          console.log(parseInt(words.length / 2))
          if (words.length > 1) {
            for (let i = 0; i < words.length / 2; i++) {
              words[i]['dm'] = 1
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
          console.log(this.words1)
        })
    },
    pronounce(nounce) {
      var msg = new SpeechSynthesisUtterance()
      msg.voiceURI = 'native'
      msg.text = nounce
      msg.lang = 'en-US'

      msg.onend = function(e) {
        console.log('Finishedqqq in ' + event.elapsedTime + ' seconds.')
      }

      speechSynthesis.speak(msg)
      console.log(nounce)
    },
    playSound(sound) {
      if (sound) {
        var audio = new Audio(sound)
        audio.play()
      }
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
        'word': word.word,
        'means': word.means,
        'spell': word.spell,
        'typeSpell': word.typeSpell,
        'level': word.level,
        'audio': word.audio,
        'phonetic': word.phonetic,
        '_id': word._id.$oid
      }
      // this.$http.put(process.env.C2C + '/domain', newIp, { headers: { 'Authorization': getToken() }})
      this.$http.put(process.env.TEST_LOCAL + '/ipa', newIp)
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
      this.$http.delete(process.env.TEST_LOCAL + '/ipa', { body: newIp })
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
