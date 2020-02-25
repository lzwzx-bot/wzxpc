<template>
  <el-container class="my-container">
    <el-header class="my-header">
      <!-- 右侧 -->
      <div class="left">
        <i :class="isCollapse?'el-icon-s-unfold':'el-icon-s-fold'" @click="isCollapse=!isCollapse"></i>
        <img src="./img/index_logo.png" alt />
        <span>黑马面面</span>
      </div>
      <!-- 左侧 -->
      <div class="right">
        <img :src="avatar" alt />
        <span class="name">{{username}},你好</span>
        <el-button size="small" type="primary" @click="btnClick">退出</el-button>
      </div>
    </el-header>
    <el-container>
      <!-- width改为auto可根据内容的大小自适应 -->
      <el-aside width="auto" class="my-aside">
        <el-menu default-active="1" class="el-menu-vertical-demo" :collapse="isCollapse" :router="true">
          <el-menu-item index="/index/chart">
            <i class="el-icon-menu"></i>
            <span slot="title">数据概览</span>
          </el-menu-item>
          <el-menu-item index="/index/user">
            <i class="el-icon-menu"></i>
            <span slot="title">用户列表</span>
          </el-menu-item>
          <el-menu-item index="/index/question">
            <i class="el-icon-menu"></i>
            <span slot="title">题库列表</span>
          </el-menu-item>
          <el-menu-item index="/index/enterprise">
            <i class="el-icon-menu"></i>
            <span slot="title">企业列表</span>
          </el-menu-item>
          <el-menu-item index="/index/subject">
            <i class="el-icon-menu"></i>
            <span slot="title">学科列表</span>
          </el-menu-item>
        </el-menu>
      </el-aside>
      <el-main class="my-main">
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import { info, logout } from "../../api/index.js";
import {removeToken} from "../../utilis/token.js"
export default {
  data() {
    return {
      username: "",
      avatar: "",
      isCollapse:false
    };
  },
  created() {
    info().then(res => {
      window.console.log(res);
      this.username = res.data.data.username;
      this.avatar = process.env.VUE_APP_URL + "/" + res.data.data.avatar;
    });
  },
  methods: {
    btnClick() {
      this.$confirm("此操作将退出系统, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          logout().then(() => {
            this.$router.push("/login");
            // window.localStorage.removeItem("mmtoken");
            removeToken();
            this.$message.success("退出成功!");
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消退出"
          });
        });
    }
  }
};
</script>

<style lang="less">
.my-container {
  height: 100%;
  .my-header {
    // background-color: pink;
    display: flex;
    justify-content: space-between;
    .left {
      height: 100%;
      display: flex;
      align-items: center;
      i {
        font-size: 24px;
        margin-right: 22px;
      }
      img {
        width: 32px;
        height: 28px;
        margin-right: 11px;
      }
      span {
        width: 92px;
        height: 22px;
        font-size: 22px;
        font-family: Microsoft YaHei;
        font-weight: bold;
        color: rgba(73, 161, 255, 1);
      }
    }
    .right {
      display: flex;
      height: 100%;
      align-items: center;
      img {
        width: 43px;
        height: 43px;
        margin-right: 9px;
      }
      .name {
        // width: 63px;
        // height: 15px;
        // font-size: 14px;
        // font-family: Microsoft YaHei;
        // font-weight: bold;
        // color: rgba(99, 99, 99, 1);
        margin-right: 38px;
      }
    }
  }
  .my-aside {
    // background-color: skyblue;
  }
  .my-main {
    background-color: burlywood;
  }
}
.el-menu-vertical-demo:not(.el-menu--collapse) {
    width: 200px;
    min-height: 400px;
  }
</style>