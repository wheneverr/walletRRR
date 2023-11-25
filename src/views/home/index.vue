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
            <el-input v-model="updataUserForm.username"></el-input>
          </el-form-item>
          <el-form-item label="主卡卡号">
            <el-input v-model="updataUserForm.mainCardId"></el-input>
          </el-form-item>
          <el-form-item label="姓名">
            <el-input v-model="updataUserForm.name"></el-input>
          </el-form-item>
          <el-form-item label="SSN">
            <el-input v-model="updataUserForm.ssn"></el-input>
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
          <el-button type="primary" @click="handleUpdataForm">确 定</el-button>
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
        userId:'',
        username: '',
        mainCardId:'',
        name: '',
        ssn: '',
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

      this.$store.dispatch('user/getInfo', storedUserInfo.userId ).then(res => {
        if(res.success){
          this.userInfo.userId = res.data.userId
          this.userInfo.name = res.data.name
          this.userInfo.userName = res.data.userName
          this.userInfo.mainCardId = res.data.mainCardId
          this.userInfo.ssn = res.data.ssn
          this.userInfo.phone = res.data.phone
          this.userInfo.email = res.data.email
          this.userInfo.walletBalance = res.data.walletBalance
          this.updataUserForm.userId = res.data.userId
        }
      }).catch( error => {
        console.log(error)
        //this.$router.push('/404')
      })
      
      //console.log(storedUserInfo)
      // this.userInfo.userId = storedUserInfo.userId
      // this.userInfo.name = storedUserInfo.name
      // this.userInfo.userName = storedUserInfo.userName
      // this.userInfo.mainCardId = storedUserInfo.mainCardId
      // this.userInfo.ssn = storedUserInfo.ssn
      // this.userInfo.phone = storedUserInfo.phone
      // this.userInfo.email = storedUserInfo.email
      // this.userInfo.walletBalance = storedUserInfo.walletBalance
      // this.updataUserForm.userId = storedUserInfo.userId
    },
    validateUpdateForm(){
      if(this.updataUserForm.username.trim() === ''){
        return false
      }
      if(this.updataUserForm.name.trim() === ''){
        return false
      }
      if(this.updataUserForm.ssn.trim() === ''){
        return false
      }
      if(this.updataUserForm.phone.trim() === ''){
        return false
      }
      if(this.updataUserForm.email.trim() === ''){
        return false
      }
      return true
    },
    handleUpdataForm(){
      if(this.validateUpdateForm()){
        //console.log('ook!')
        this.$store.dispatch('user/updateUserInfo', this.updataUserForm).then(res =>{
          if(res.success){
              this.$alert(res.message, '提示', {
                confirmButtonText: '确定',
                callback: action => {
                  location.reload()
                }
              })
            }
            else{
              this.$alert(res.message, '提示', {
              confirmButtonText: '确定',
              callback: action => {
                this.dialogFormVisible = false
                this.loading = false
              }
            })
            }
        })
      }
      else{
        this.$alert('修改不能为空！', '提示', {
              confirmButtonText: '确定',
              callback: action => {
                this.loading = false
              }
            })
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.container{
  height: 95vh;
}

</style>