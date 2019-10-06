<template>
  <div class="my-box">
      <!-- 遮罩层 -->
      <div class="my-shade"></div>
      <!-- 登录 -->
      <div class="my-login">
          <!-- 插槽 -->
          <slot></slot>
      </div>
  </div>
</template>

<script>
export default {
    name: 'login',

}
</script>

<style lang="less" scoped>
.my-box{
    width: 100%;
    height: 100%;
    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    .my-shade{
        width: 100%;
        height: 100%;
    }
    .my-login{
        width: 530px;
        height: 325px;
        position: absolute;
        left: 50%;
        top: 50%;
        background-color: #fff;
        transform: translate(-50%,-50%);
        border-radius: 5px;
        box-shadow: 1px 1px 10px #000;
    }
}
</style>