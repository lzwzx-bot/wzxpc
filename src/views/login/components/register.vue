<template>
  <el-dialog title="收货地址" :visible.sync="dialogFormVisible" width="603px" center>
    <el-form :model="form" :rules="rules" ref="form">
      <el-form-item label="头像" :label-width="formLabelWidth" prop="avatar">
        <el-upload
          class="avatar-uploader"
          :action="avatarUrl"
          :show-file-list="false"
          :on-success="handleAvatarSuccess"
          :before-upload="beforeAvatarUpload"
          v-model="form.avatar"
          name="image"
        >
          <img v-if="imageUrl" :src="imageUrl" class="avatar" />
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
      </el-form-item>
      <el-form-item label="昵称" :label-width="formLabelWidth" prop="name">
        <el-input v-model="form.name" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="邮箱" :label-width="formLabelWidth" prop="email">
        <el-input v-model="form.email" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="手机" :label-width="formLabelWidth" prop="phone">
        <el-input v-model="form.phone" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="密码" :label-width="formLabelWidth" prop="password">
        <el-input v-model="form.password" autocomplete="off" show-password></el-input>
      </el-form-item>
      <el-form-item label="图形码" :label-width="formLabelWidth" prop="rcode">
        <el-row>
          <el-col :span="16">
            <el-input v-model="form.rcode" autocomplete="off"></el-input>
          </el-col>
          <el-col :span="7" :offset="1">
            <img :src="picCodeUrl" alt class="codeImg" @click="imgClick" />
          </el-col>
        </el-row>
      </el-form-item>
      <el-form-item label="验证码" :label-width="formLabelWidth" prop="testCode">
        <el-row>
          <el-col :span="16">
            <el-input v-model="form.testCode" autocomplete="off"></el-input>
          </el-col>
          <el-col :span="7" :offset="1">
            <!--disabled的值为true时表示被禁用,false表示为启用  -->
            <el-button
              class="btn"
              :disabled="sec!=0"
              @click="codeClick"
            >{{ sec==0?"获取用户验证码":"还有"+sec+"秒"}}</el-button>
          </el-col>
        </el-row>
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button @click="dialogFormVisible = false">取 消</el-button>
      <el-button type="primary" @click="testForm">确 定</el-button>
    </div>
  </el-dialog>
</template>

<script>
// import axios from "axios"
import { sendMS, reg } from "../../../api/register.js";
export default {
  data() {
    return {
      imageUrl: "",
      avatarUrl: process.env.VUE_APP_URL + "/uploads",
      picCodeUrl: process.env.VUE_APP_URL + "/captcha?type=sendsms",
      dialogFormVisible: false,
      sec: 0,
      form: {
        name: "",
        email: "",
        phone: "",
        password: "",
        rcode: "",
        testCode: "",
        avatar: ""
      },
      formLabelWidth: "65px",
      rules: {
        name: [{ required: true, message: "请输入昵称", trigger: "blur" }],
        email: [
          { required: true, message: "请输入电子邮箱", trigger: "blur" },
          {
            pattern: /\w[-\w.+]*@([A-Za-z0-9][-A-Za-z0-9]+\.)+[A-Za-z]{2,14}/,
            message: "请输入正确的邮箱格式",
            trigger: "change"
          }
        ],
        phone: [
          { required: true, message: "请输入手机号码", trigger: "blur" },
          {
            pattern: /0?(13|14|15|18|17)[0-9]{9}/,
            message: "请输入正确的手机格式",
            trigger: "change"
          }
        ],
        password: [
          { required: true, message: "请输入密码", trigger: "blur" },
          { min: 5, max: 14, message: "请输5到14位的密码", trigger: "change" }
        ],
        rcode: [
          { required: true, message: "请输入图形验证码", trigger: "blur" },
          { min: 4, max: 4, message: "图形验证码为4位", trigger: "blur" }
        ],
        testCode: [
          { required: true, message: "请输入手机验证码", trigger: "blur" },
          { min: 4, max: 4, message: "图形验证码为4位", trigger: "blur" }
        ],
        avatar: [{ required: true, message: "头像不能为空", trigger: "blur" }]
      }
    };
  },
  methods: {
    handleAvatarSuccess(res, file) {
      this.imageUrl = URL.createObjectURL(file.raw);
      console.log(res);
      this.form.avatar = res.data.file_path;
      //表单重新校验
      this.$refs.form.validateField("avatar");
    },
    beforeAvatarUpload(file) {
      const isJPG = file.type === "image/jpeg";
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isJPG) {
        this.$message.error("上传头像图片只能是 JPG 格式!");
      }
      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 2MB!");
      }
      return isJPG && isLt2M;
    },
    //验证表单
    testForm() {
      //验证表单
      this.$refs.form.validate(v => {
        if (v) {
          //发送axios请求数据
          reg({
            username: this.form.name,
            phone: this.form.phone,
            email: this.form.email,
            avatar: this.form.avatar,
            password: this.form.password,
            rcode: this.form.rcode
          }).then(res => {
            // window.console.log(res)
            if (res.data.code == 200) {
              this.dialogFormVisible = false;
              //重置表单
              this.$refs.form.resetFields();
              //img不是表单元素需要手动重置
              this.imageUrl=""
              this.$message.success("注册成功!");
            } else {
              this.$message.error(res.data.message);
            }
          });
        }
      });
    },
    imgClick() {
      //浏览器的自动缓存功能,加一个随机数或者时间戳可以请求到不同的图片
      this.picCodeUrl =
        process.env.VUE_APP_URL +
        "/captcha?type=login&t=" +
        Math.random() * 999;
    },
    codeClick() {
      //优化代码处理
      if (!(/0?(13|14|15|18|17)[0-9]{9}/.test(this.form.phone))) {
        this.$message.error("手机号码格式不正确");
        return;
      }
      if (this.form.rcode.length != 4) {
        this.$message.error("验证码长度错误");
        return;
      }
      //倒计时处理
      this.sec = 60;
      let timeOf = setInterval(() => {
        this.sec--;
        if (this.sec == 0) {
          clearInterval(timeOf);
        }
      }, 1000);
      //axios请求数据
      sendMS({
        code: this.form.rcode,
        phone: this.form.phone
      }).then(res => {
        //成功回调
        // console.log(res)
        // console.log(this.form.rcode)
        if (res.data.code == 200) {
          // alert("验证成功,验证码为:"+res.data.data.captcha)
          this.$message.success("验证成功,验证码为:" + res.data.data.captcha);
        } else {
          // alert(res.data.message)
          this.$message.error(res.data.message);
        }
      });
    }
  }
};
</script>

<style>
.el-dialog__header {
  background: linear-gradient(to right, rgba(12, 193, 240), rgba(32, 144, 237));
}
.codeImg {
  width: 100%;
  height: 41px;
  cursor: pointer;
}
.avatar-uploader {
  text-align: center;
}
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px !important;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
</style>