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
        <div class="my-login fr"  @mouseover="showLogin=true" @mouseout="showLogin=false">
          <a href="#" class="login">登录</a>
          <div class="my-login-way" v-show="showLogin">
            <div class="my-way">
              <ul>
                <li>
                  <a href="#">
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
                  <a href="#">
                    <i class="ico ico-wy"></i>
                    <span>网易邮箱账号登录</span>
                  </a>
                </li>
              </ul>
            </div>
            <i class="login-ioc"></i>
          </div>
        </div>
      </div>
    </nav>
  </div>
</template>

<script>
export default {
  name: "homeNav",
  // 数据
  data() {
    return {
      showLogin: false, // 登录显示
    };
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
      a:hover{
        background-color: #353535;
        color: #fff;
      }
      .ico{
        float: left;
        width: 18px;
        height: 18px;
        margin: 10px 10px 0 0;
        background: url("../assets/images/login.png");
      }
      i.ico-sj{
        background-position: 0 0;
      }
      i.ico-wx{
        background-position: -21px -21px;
      }
      i.ico-qq{
        background-position: -21px -40px;
      }
      i.ico-xl{
        background-position: 0 -21px;
      }
      i.ico-wy{
        background-position: 0 -41px;
      }
    }
    .login-ioc{
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
</style>