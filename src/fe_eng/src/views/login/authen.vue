<template>
  <div class="content">
    <div class="wrapper fadeInDown">
      <div id="formContent">
        <div class="fadeIn first">
          <img src="../../assets/vunm.jpeg" height="200" width="200"/>
        </div>
        <el-input style="width: 70%" type="text" v-model="Name" class="fadeIn second" placeholder="Name" @keyup.enter="sentOtp"></el-input>
        <el-input style="width: 70%;padding-top: 10px" type="text" v-model="Email" class="fadeIn second" placeholder="Email" @keyup.enter="sentOtp"></el-input>
        <el-input
          :type="pass"
          style="padding-top: 10px;width: 70%"
          size="medium"
          placeholder="Pass">
          <!--<i slot="suffix" class="el-input__icon el-icon-view" @click="aaa"></i>-->
          <!--<i slot="suffix" class=" fas fa-eye" @click.native="aaa"></i>-->
          <!--<i slot="suffix" class="el-input__icon fa fa-eye-slash" @click="aaa"><el-button slot="suffix" type="text" @click="aaa" style="color: #d3d3d3"></el-button></i>-->
          <el-button v-show="check" slot="suffix" type="text" @click="aaa" style="color: #b4b4b4;padding-top: 15px"><i class="fas fa-eye"></i></el-button>
          <el-button v-show="!check" slot="suffix" type="text" @click="aaa" style="color: #b4b4b4;padding-top: 15px"><i class="fas fa-eye-slash"></i></el-button>
        </el-input>
        <input type="submit" class="fadeIn fourth" value="Confirm" @click="sentOtp">
      </div>
    </div>
  </div>

</template>

<script>
  export default {
    name: 'authen',
    data() {
      return {
        otp: ''
      }
    },
    methods: {
      notify(type, title) {
        return this.$notify({
          group: 'foo',
          type: type,
          title: title
        })
      },
      sentOtp() {
        console.log(this.$store.state.username)
        if (this.otp) {
          const newHotline = {
            'otp': this.otp,
            'step_2': 'yes',
            'token': this.$session.get('token')
          }
          this.$http.post(process.env.SWAPI_URL + '/login', newHotline)
            .then(function(response) {
              if (response.body.status === true) {
                // this.$session.set('username', this.$store.state.username)
                this.$session.set('otp', 'true')
                this.$cookies.set('otp', 'true')
                this.$router.push('/loading')
              } else {
                this.notify('warning', response.body.message)
              }
            }, respone => {
              this.notify('warning', respone.body.message)
            })
        }
      }
    }
  }
</script>

<style scoped>
  .wrapper {
    display: flex;
    align-items: center;
    flex-direction: column;
    justify-content: center;
    width: 100%;
    min-height: 100%;
    padding: 40px;
  }

  #formContent {
    -webkit-border-radius: 10px 10px 10px 10px;
    border-radius: 10px 10px 10px 10px;
    background: #fff;
    padding: 30px;
    width: 90%;
    max-width: 450px;
    position: relative;
    padding: 0px;
    -webkit-box-shadow: 0 30px 60px 0 rgba(0,0,0,0.3);
    box-shadow: 0 30px 60px 0 rgba(0,0,0,0.3);
    text-align: center;
  }

  input[type=button], input[type=submit], input[type=reset]  {
    background-color: #56baed;
    border: none;
    color: white;
    padding: 15px 80px;
    text-align: center;
    text-decoration: none;
    display: inline-block;
    text-transform: uppercase;
    font-size: 13px;
    -webkit-box-shadow: 0 10px 30px 0 rgba(95,186,233,0.4);
    box-shadow: 0 10px 30px 0 rgba(95,186,233,0.4);
    -webkit-border-radius: 5px 5px 5px 5px;
    border-radius: 5px 5px 5px 5px;
    margin: 5px 20px 40px 20px;
    -webkit-transition: all 0.3s ease-in-out;
    -moz-transition: all 0.3s ease-in-out;
    -ms-transition: all 0.3s ease-in-out;
    -o-transition: all 0.3s ease-in-out;
    transition: all 0.3s ease-in-out;
  }

  input[type=button]:hover, input[type=submit]:hover, input[type=reset]:hover  {
    background-color: #39ace7;
  }

  input[type=button]:active, input[type=submit]:active, input[type=reset]:active  {
    -moz-transform: scale(0.95);
    -webkit-transform: scale(0.95);
    -o-transform: scale(0.95);
    -ms-transform: scale(0.95);
    transform: scale(0.95);
  }

  input[type=text] {
    background-color: #f6f6f6;
    border: none;
    color: #0d0d0d;
    padding: 15px 32px;
    text-align: center;
    text-decoration: none;
    display: inline-block;
    font-size: 16px;
    margin: 5px;
    width: 85%;
    border: 2px solid #f6f6f6;
    -webkit-transition: all 0.5s ease-in-out;
    -moz-transition: all 0.5s ease-in-out;
    -ms-transition: all 0.5s ease-in-out;
    -o-transition: all 0.5s ease-in-out;
    transition: all 0.5s ease-in-out;
    -webkit-border-radius: 5px 5px 5px 5px;
    border-radius: 5px 5px 5px 5px;
  }

  input[type=text]:focus {
    background-color: #fff;
    border-bottom: 2px solid #5fbae9;
  }

  .fadeInDown {
    -webkit-animation-name: fadeInDown;
    animation-name: fadeInDown;
    -webkit-animation-duration: 1s;
    animation-duration: 1s;
    -webkit-animation-fill-mode: both;
    animation-fill-mode: both;
  }

  @-webkit-keyframes fadeInDown {
    0% {
      opacity: 0;
      -webkit-transform: translate3d(0, -100%, 0);
      transform: translate3d(0, -100%, 0);
    }
    100% {
      opacity: 1;
      -webkit-transform: none;
      transform: none;
    }
  }

  @keyframes fadeInDown {
    0% {
      opacity: 0;
      -webkit-transform: translate3d(0, -100%, 0);
      transform: translate3d(0, -100%, 0);
    }
    100% {
      opacity: 1;
      -webkit-transform: none;
      transform: none;
    }
  }

  /* Simple CSS3 Fade-in Animation */
  @-webkit-keyframes fadeIn { from { opacity:0; } to { opacity:1; } }
  @-moz-keyframes fadeIn { from { opacity:0; } to { opacity:1; } }
  @keyframes fadeIn { from { opacity:0; } to { opacity:1; } }

  .fadeIn {
    opacity:0;
    -webkit-animation:fadeIn ease-in 1;
    -moz-animation:fadeIn ease-in 1;
    animation:fadeIn ease-in 1;

    -webkit-animation-fill-mode:forwards;
    -moz-animation-fill-mode:forwards;
    animation-fill-mode:forwards;

    -webkit-animation-duration:1s;
    -moz-animation-duration:1s;
    animation-duration:1s;
  }

  .fadeIn.first {
    -webkit-animation-delay: 0.4s;
    -moz-animation-delay: 0.4s;
    animation-delay: 0.4s;
  }

  .fadeIn.second {
    -webkit-animation-delay: 0.6s;
    -moz-animation-delay: 0.6s;
    animation-delay: 0.6s;
  }

  .fadeIn.third {
    -webkit-animation-delay: 0.8s;
    -moz-animation-delay: 0.8s;
    animation-delay: 0.8s;
  }

  .fadeIn.fourth {
    -webkit-animation-delay: 1s;
    -moz-animation-delay: 1s;
    animation-delay: 1s;
  }

  /* Simple CSS3 Fade-in Animation */
  .underlineHover:after {
    display: block;
    left: 0;
    bottom: -10px;
    width: 0;
    height: 2px;
    background-color: #56baed;
    content: "";
    transition: width 0.2s;
  }

  .underlineHover:hover {
    color: #0d0d0d;
  }

  .underlineHover:hover:after{
    width: 100%;
  }
  /* OTHERS */

  *:focus {
    outline: none;
  }

  #icon {
    width:60%;
  }

  * {
    box-sizing: border-box;
  }
</style>
