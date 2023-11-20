<template>
  <div>
    <el-card class="container">
      <div slot="header" class="clearfix">
        <span>个人资料</span>
      </div>
      
      <el-form label-position="left" label-width="120px" style="padding-left: 12%;">
        <el-form-item label="用户编号">
            <span>{{ userInfo.userId }}</span>
          </el-form-item>
          <el-form-item label="用户名">
            <span>{{ userInfo.userName }}</span>
          </el-form-item>
          <el-form-item label="主卡卡号">
            <span>{{ userInfo.mainCardId }}</span>
          </el-form-item>
          <el-form-item label="姓名">
            <span>{{ userInfo.name }}</span>
          </el-form-item>
          <el-form-item label="SSN">
            <span>{{ userInfo.ssn }}</span>
          </el-form-item>
          <el-form-item label="电话">
            <span>{{ userInfo.phone }}</span>
          </el-form-item>
          <el-form-item label="电子邮箱">
            <span>{{ userInfo.email }}</span>
          </el-form-item>
          <el-form-item label="钱包余额">
            <span>{{ userInfo.walletBalance }}</span>
          </el-form-item>
          <el-button @click="dialogFormVisible = true">修改资料</el-button> 
        </el-form>
      

      <el-dialog title="修改信息" :visible.sync="dialogFormVisible">
        <el-form :model="updataUserForm" label-width="120px">
          <el-form-item label="用户名">
            <el-input v-model="updataUserForm.name"></el-input>
          </el-form-item>
          <el-form-item label="SSN">
            <el-input v-model="updataUserForm.SSN"></el-input>
          </el-form-item>
          <el-form-item label="电话">
            <el-input v-model="updataUserForm.phone"></el-input>
          </el-form-item>
          <el-form-item label="电子邮箱">
            <el-input v-model="updataUserForm.email"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible = false">取 消</el-button>
          <el-button type="primary" @click="dialogFormVisible = false">确 定</el-button>
        </div>
      </el-dialog>
    </el-card>
  </div>
</template>

<script>
import store from '@/store';
import { getUserInfo } from '@/utils/auth'
export default {
  name: "Home",
  data() {
    return {
      userInfo:{
        userId:'',
        name: '',
        userName: '',
        mainCardId: '',
        ssn: '',
        phone: '',
        email: '',
        walletBalance: 0,
      },
      updataUserForm:{
        name: '',
        SSN: '',
        phone: '',
        email: '',
      },
      dialogFormVisible: false,
    };
  },
  mounted() {
    this.load();
  },
  methods: {
    load() {
      const storedUserInfo = getUserInfo()
      //console.log(storedUserInfo)
      this.userInfo.userId = storedUserInfo.userId
      this.userInfo.name = storedUserInfo.name
      this.userInfo.userName = storedUserInfo.userName
      this.userInfo.mainCardId = storedUserInfo.mainCardId
      this.userInfo.ssn = storedUserInfo.ssn
      this.userInfo.phone = storedUserInfo.phone
      this.userInfo.email = storedUserInfo.email
      this.userInfo.walletBalance = storedUserInfo.walletBalance
    },
  },
};
</script>

<style lang="scss" scoped>
.container{
  height: 95vh;
}

</style>