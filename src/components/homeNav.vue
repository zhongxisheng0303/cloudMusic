<template>
  <div>
    <nav>
      <div class="w nav-box">
        <!-- logo -->
        <h1 class="logo fl">
          <a href="#" class="fl">ling网云音乐</a>
        </h1>
        <!-- 导航 -->
        <ul class="nav-ul">
          <li>
            <router-link to="/index" active-class="hiLite">
              发现音乐
              <span class="cor"></span>
            </router-link>
          </li>
          <li>
            <router-link to="/myMusic" active-class="hiLite">
              我的音乐
              <span class="cor"></span>
            </router-link>
          </li>
          <li>
            <router-link to="/friend" active-class="hiLite">
              朋友
              <span class="cor"></span>
            </router-link>
          </li>
          <li>
            <router-link to="/shopping" active-class="hiLite">
              商城
              <span class="cor"></span>
            </router-link>
          </li>
          <li>
            <router-link to="/music" active-class="hiLite">
              音乐人
              <span class="cor"></span>
            </router-link>
          </li>
          <li class="my-lst">
            <router-link to="/end" active-class="hiLite">
              下载客服端
              <span class="cor"></span>
            </router-link>
            <i></i>
          </li>
        </ul>
        <!-- 登录 -->
        <div class="my-login fr" @mouseover="showLogin=true" @mouseout="showLogin=false">
          <a href="#" class="login"  @click.stop="showLoginBox(3)">登录</a>
          <div class="my-login-way" v-show="showLogin">
            <div class="my-way">
              <ul>
                <li>
                  <a href="javascrip:" @click.stop="showLoginBox(1)">
                    <i class="ico ico-sj"></i>
                    <span>手机号登录</span>
                  </a>
                </li>
                <a href="#">
                  <i class="ico ico-wx"></i>
                  <span>微信登录</span>
                </a>
                <li>
                  <a href="#">
                    <i class="ico ico-qq"></i>
                    <span>QQ登录</span>
                  </a>
                </li>
                <li>
                  <a href="#">
                    <i class="ico ico-xl"></i>
                    <span>新浪微博登录</span>
                  </a>
                </li>
                <li>
                  <a href="javascrip:" @click.stop="showLoginBox(2)">
                    <i class="ico ico-wy"></i>
                    <span>网易邮箱账号登录</span>
                  </a>
                </li>
              </ul>
            </div>
            <i class="login-ioc"></i>
          </div>
        </div>
        <!-- 创作者中心 -->
        <div class="my-write fr">
          <a href="#">创作者中心</a>
        </div>
        <!-- 搜索 -->
        <div class="my-search fr">
          <span class="el-icon-search"></span>
          <input type="text" placeholder="音乐/视频/电台/用户" />
        </div>
        <!-- 登录 -->
        <my-login v-show="loginBox">
            <div class="my-top">
              <span class="fl">{{ title }}</span>
              <a href="JavaScript:" class="fr el-icon-close" @click.stop="showLoginBox(0)"></a>
            </div>
            <div class="my-loginWay">
              <!-- 登录方式 -->
              <div class="loginWay" v-show="showWay">
                <div class="left fl">
                  <div class="left-one"></div>
                  <div class="left-login">
                    <span @click.stop="showLoginBox(1)">手机号登录</span>
                  </div>
                  <div class="left-login">
                    <span>注&nbsp;&nbsp;册</span>
                  </div>
                </div>
                <div class="right fl">
                  <ul>
                    <li>
                      <a href="#">
                        <i class="my-mlg"></i>
                        <span>微信登录</span>
                      </a>
                    </li>
                    <li>
                      <a href="#">
                        <i class="my-mlg my-mlg-qq"></i>
                        <span>QQ登录</span>
                      </a>
                    </li>
                    <li>
                      <a href="#">
                        <i class="my-mlg my-mlg-wb"></i>
                        <span>微博登录</span>
                      </a>
                    </li>
                    <li>
                      <a href="#" @click.stop="showLoginBox(2)">
                        <i class="my-mlg my-mlg-wy"></i>
                        <span>网易邮箱账号登录</span>
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
              <!-- 手机登录 邮箱登录 -->
              <div class="login-way" v-show="!showWay">
                <ul class="list">
                  <li>
                    <div class="phone">
                      <a href="JavaScript:;" v-show="!way">
                        <span>{{phoneData}}</span>
                      </a>
                      <input class="user" type="number" :placeholder="way ? '请输入账号' : '请输入手机号'">
                    </div>
                  </li>
                  <li>
                    <div class="my-password">
                      <input class="password" type="password" placeholder="请输入密码">
                    </div>
                  </li>
                  <li>
                    <div class="login-text clearfix">
                      <span>自动登录</span>
                      <span>忘记密码?</span>
                    </div>
                  </li>
                  <li>
                    <div class="btn-login">
                      登&nbsp;&nbsp;&nbsp;录
                    </div>
                  </li>
                </ul>
              </div>
              <div class="below" v-show="!showWay">

              </div>
            </div>
        </my-login>
      </div>
    </nav>
  </div>
</template>

<script>
import myLogin from "./login";
export default {
  // 注册组件
  components: {
    myLogin
  },
  name: "homeNav",
  // 数据
  data() {
    return {
      showLogin: false, // 登录显示
      loginBox: false,
      showWay: true,
      way: true,
      title: '',
      phoneData: '+86'
    };
  },
  //方法
  methods: {
    showLoginBox(index){
      if(index === 1){
        this.title = "手机号登录"
        this.loginBox = true
        this.showWay = false
        this.way = false
      }else if(index === 2){
        this.title = "网易邮箱账号登录"
        this.loginBox = true
        this.showWay = false
        this.way = true
      }else if(index === 3){
        this.title = "登录"
        this.loginBox = true
        this.showWay = true
      }else{
        this.loginBox = false
      }
    }
  }
};
</script>

<style lang="less" scoped>
nav {
  width: 100%;
  height: 70px;
  background-color: #242424;
}
.nav-box {
  height: 70px;
  // background-color: skyblue;
}
.logo {
  width: 176px;
  height: 70px;
  background: url("../assets/images/logo.png");
  a {
    width: 176px;
    height: 70px;
    text-indent: -99999px;
  }
}
.nav-ul {
  li {
    float: left;
    height: 70px;
    position: relative;
    a {
      height: 70px;
      padding: 0 19px;
      font-size: 14px;
      line-height: 70px;
      display: block;
      text-align: center;
      color: #cccccc;
    }
  }
  .hiLite {
    background-color: #000;
    color: #fff;
    .cor {
      position: absolute;
      left: 50%;
      bottom: -1px;
      width: 12px;
      height: 7px;
      background: url("../assets/images/logo.png") -226px 0px;
      margin-left: -6px;
    }
  }
  a:hover {
    background-color: #000;
    color: #fff;
  }
  .my-lst {
    i {
      display: block;
      width: 26px;
      height: 13px;
      background: url("../assets/images/logo.png") -191px 0px;
      position: absolute;
      left: 100px;
      top: 21px;
    }
  }
}
.my-login {
  position: relative;
  height: 45px;
  margin: 19px 0 0 20px;
  padding: 0 22px 0 0;
  background: url("../assets/images/logo.png") right -60px;
  background-position: right -50px;
  .login {
    display: block;
    margin-top: 7px;
    color: #999999;
  }
  .login:hover {
    color: #787878;
    text-decoration: underline;
  }
  .my-login-way {
    position: absolute;
    top: 38px;
    right: -43px;
    width: 158px;
    background-color: #2b2b2b;
    border-radius: 5px;
    border: 1px solid #000;
    border-top: 0px;
    .my-way {
      a {
        display: block;
        width: 148px;
        height: 37px;
        border-bottom: 1px solid #232323;
        color: #cccccc;
        line-height: 38px;
        padding-left: 10px;
      }
      a:hover {
        background-color: #353535;
        color: #fff;
      }
      .ico {
        float: left;
        width: 18px;
        height: 18px;
        margin: 10px 10px 0 0;
        background: url("../assets/images/login.png");
      }
      i.ico-sj {
        background-position: 0 0;
      }
      i.ico-wx {
        background-position: -21px -21px;
      }
      i.ico-qq {
        background-position: -21px -40px;
      }
      i.ico-xl {
        background-position: 0 -21px;
      }
      i.ico-wy {
        background-position: 0 -41px;
      }
    }
    .login-ioc {
      position: absolute;
      left: 50%;
      top: -8px;
      width: 18px;
      height: 18px;
      margin-left: -9px;
      background: url("../assets/images/login.png") -20px 0;
    }
  }
}
.my-write {
  width: 90px;
  height: 32px;
  line-height: 32px;
  text-align: center;
  margin: 19px 0 0 12px;
  a {
    color: #ccc;
    width: 100%;
    height: 100%;
    display: block;
    border: 1px solid #393939;
    border-radius: 16px;
  }
  a:hover {
    color: #fff;
    border-color: #fff;
  }
}
.my-search {
  width: 158px;
  height: 32px;
  border-radius: 16px;
  margin-top: 19px;
  background-color: #fff;
  display: flex;
  align-items: center;
  span {
    font-size: 14px;
    margin: 0 5px;
  }
  input {
    width: 120px;
    height: 31px;
  }
}
.my-top {
  width: 100%;
  height: 39px;
  background-color: #2d2d2d;
  border-top-left-radius: 5px;
  border-top-right-radius: 5px;
  padding: 0 15px;
  box-sizing: border-box;
  line-height: 39px;
  span:first-child {
    color: #fff;
    font-size: 16px;
  }
  a {
    color: #888888;
    font-size: 18px;
    line-height: 39px;
  }
}
.my-loginWay {
  width: 100%;
  height: 286px;
  float: left;
  .loginWay {
    padding: 40px 0 39px 0;
    .left {
      width: 300px;
      height: 205px;
      padding: 0 35px 3px 40px;
      box-sizing: border-box;
      border-right: 1px dashed #ccc;
      .left-one {
        width: 224px;
        height: 120px;
        background: url("../assets/images/001.png") no-repeat;
      }
      .left-login {
        width: 224px;
        height: 31px;
        border: 1px solid #ccc;
        border-radius: 5px;
        line-height: 31px;
        text-align: center;
        margin-top: 10px;
        span {
          width: 100%;
          height: 100%;
          display: block;
        }
        span:hover {
          background-color: rgba(255, 255, 255, 0.2);
        }
      }
      div:nth-child(2) {
        background-color: #3483cf;
        color: #fff;
      }
      div:nth-child(3) {
        background-color: #f2f2f2;
      }
    }
    .right {
      padding: 3px 0 3px 39px;
      li {
        margin-top: 15px;
        a {
          display: block;
          width: 148px;
          height: 38px;
          line-height: 38px;
          .my-mlg {
            width: 38px;
            height: 38px;
            margin-right: 14px;
            float: left;
            background: url("../assets/images/002.png") -150px -670px;
          }
          .my-mlg-qq {
            background-position: -191px -670px;
          }
          .my-mlg-wb {
            background-position: -231px -670px;
          }
          .my-mlg-wy {
            background-position: -271px -670px;
          }
        }
      }
      li:first-child {
        margin-top: 0px;
      }
    }
  }
  .login-way{
    width: 225px;
    height: 206px;
    margin: 0 auto;
    margin-top: 30px;
    .phone{
      width: 100%;
      height: 30px;
      border: 1px solid #cdcdcd;
      border-radius: 3px;
      line-height: 30px;
      a{
        height: 30px;
        padding: 0 18px 0 5px;
        display: inline-block;
        border-right: 1px solid #cdcdcd;
      }
      input{
        padding-left: 5px;
      }
    }
    .my-password{
      width: 220px;
      height: 30px;
      border: 1px solid #cdcdcd;
      border-radius: 3px;
      line-height: 30px;
      margin-top: 10px;
      padding-left: 5px;
    }
    .login-text{
      width: 100%;
      margin-top: 15px;
      span:first-child{
        float: left;
      }
      span:last-child{
        float: right;
      }
    }
    .btn-login{
      width: 100%;
      height: 30px;
      background-color: #2e7ecb;
      border-radius: 3px;
      margin-top: 20px;
      color: #fff;
      text-align: center;
      line-height: 30px;
    }
  }
  .below{
    width: 100%;
    height: 49px;
    background-color: #f7f7f7;
    border-top: 1px solid #c6c6c6;
    border-bottom-right-radius: 5px;
    border-bottom-left-radius: 5px;
  }
}
</style>