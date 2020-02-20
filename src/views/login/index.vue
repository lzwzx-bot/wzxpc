<template>
  <div class="login-wrap">
    <!-- 登录框模块 -->
    <div class="login-box">
      <!-- 标题模块 -->
      <div class="title-box">
        <img src="./img/login_logo.png" alt class="img" />
        <span class="left-title">黑马面面</span>
        <span class="line"></span>
        <span class="right-title">用户登录</span>
      </div>
      <!-- 表单模块 -->
      <el-form class="form-box" label-width="43px">
        <el-form-item>
          <el-input prefix-icon="el-icon-user" placeholder="请输入手机号码"></el-input>
        </el-form-item>
        <el-form-item>
          <el-input show-password prefix-icon="el-icon-lock" placeholder="请输入密码"></el-input>
        </el-form-item>
        <el-form-item>
          <el-row>
            <el-col :span="17">
              <el-input show-password prefix-icon="el-icon-key" placeholder="请输入验证码"></el-input>
            </el-col>
            <el-col :span="7">
              <img src="./img/login_captcha.png" alt class="img" />
            </el-col>
          </el-row>
        </el-form-item>
        <el-form-item>
          <el-checkbox v-model="checked">
            我已阅读并同意
            <el-link type="primary">用户协议</el-link>和
            <el-link type="primary">隐私条款</el-link>
          </el-checkbox>
        </el-form-item>
        <el-form-item>
          <el-button type="primary">登录</el-button>
          <el-button type="primary">注册</el-button>
        </el-form-item>
      </el-form>
    </div>
    <img src="./img/login_banner_ele.png" alt />
  </div>
</template>

<script>
export default {};
</script>

<style lang="less">
.login-wrap {
  width: 100%;
  height: 100%;
  background: linear-gradient(
    225deg,
    rgba(20, 147, 250, 1),
    rgba(1, 198, 250, 1)
  );
  //该div的子元素是弹性布局
  display: flex;
  //设置主轴的对齐方式
  justify-content: space-around;
  //设置副轴的对齐方式为居中
  align-items: center;

  .login-box {
    width: 478px;
    height: 550px;
    background: rgba(245, 245, 245, 1);

    .title-box {
      display: flex;
      align-items: center;
      margin-top: 50px;
      margin-left: 48px;
      margin-bottom: 29px;
      .img {
        width: 22px;
        height: 17px;
        margin-right: 16px;
      }

      .left-title {
        margin-right: 14px;
        font-size: 22px;
      }
      .line {
        width: 1px;
        height: 28px;
        background: rgba(199, 199, 199, 1);
        margin-right: 12px;
      }

      .right-title {
        font-size: 21px;
      }
    }
  }
  .form-box {
    padding-right: 41px;
    box-sizing: border-box;

    .img {
      width: 100%;
      height: 42px;
    }
    .el-checkbox {
      display: flex;
      align-items: center;
      .el-checkbox__label {
        display: flex;
        align-items: center;
      }
    }

    .el-button--primary{
      width: 100%;
      &:nth-child(2){
        margin-left: 0;
        margin-top: 26px;
      }
    }
  }
}
</style>