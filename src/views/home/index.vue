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
        <el-form :model="updateUserForm" :rules="updateRules" label-width="120px" status-icon ref="updateUserForm">
          <el-form-item label="用户名" prop="username">
            <el-input ref="username" v-model="updateUserForm.username"></el-input>
          </el-form-item>
          <el-form-item label="主卡卡号">
            <el-input ref="mainCardId" v-model="updateUserForm.mainCardId" disabled></el-input>
          </el-form-item>
          <el-form-item label="姓名" prop="name">
            <el-input ref="name" v-model="updateUserForm.name"></el-input>
          </el-form-item>
          <el-form-item label="SSN" prop="ssn">
            <el-input ref="ssn" v-model="updateUserForm.ssn"></el-input>
          </el-form-item>
          <el-form-item label="电话" prop="phone">
            <el-input ref="phone" v-model="updateUserForm.phone"></el-input>
          </el-form-item>
          <el-form-item label="电子邮箱" prop="email">
            <el-input ref="email" v-model="updateUserForm.email"></el-input>
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
    const validateUsername = (rule, value, callback) => {
      if (!value.length) {
        callback(new Error('Please enter user name'))
      } else {
        callback()
      }
    }
    const validateName = (rule, value, callback) => {
      if (!value.length) {
        callback(new Error('Please enter name'))
      } else {
        callback()
      }
    }
    const validateSsn = (rule, value, callback) => {
      if (!value.length) {
        callback(new Error('SSN can not be null'))
      } else {
        callback()
      }
    }
    const validateEmail = (rule, value, callback) => {
      let ePattern = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/
      if (!ePattern.test(value)) {
        callback(new Error('Email error pattern'))
      } else {
        callback()
      }
    }
    const validatePhone = (rule, value, callback) => {
      let mPattern = /^1[34578]\d{9}$/
      if (!mPattern.test(value)) {
        callback(new Error('Phone error pattern'))
      } else {
        callback()
      }
    }

    return {
      userInfo: {
        userId: '',
        name: '',
        userName: '',
        mainCardId: '',
        ssn: '',
        phone: '',
        email: '',
        walletBalance: 0,
      },
      updateUserForm: {
        userId: '',
        username: '',
        mainCardId: '',
        name: '',
        ssn: '',
        phone: '',
        email: '',
      },
      updateRules: {
        username: [{ required: true, trigger: 'blur', validator: validateUsername }],
        name: [{ required: true, trigger: 'blur', validator: validateName }],
        ssn: [{ required: true, trigger: 'blur', validator: validateSsn }],
        email: [{ required: true, trigger: 'blur', validator: validateEmail }],
        phone: [{ required: true, trigger: 'blur', validator: validatePhone }],
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

      this.$store.dispatch('user/getInfo', storedUserInfo.userId).then(res => {
        if (res.success) {
          this.userInfo.userId = res.data.userId
          this.userInfo.name = res.data.name
          this.userInfo.userName = res.data.userName
          this.userInfo.mainCardId = res.data.mainCardId
          this.userInfo.ssn = res.data.ssn
          this.userInfo.phone = res.data.phone
          this.userInfo.email = res.data.email
          this.userInfo.walletBalance = res.data.walletBalance
          this.updateUserForm.userId = res.data.userId
          this.updateUserForm.username = res.data.userName
          this.updateUserForm.mainCardId = res.data.mainCardId
          this.updateUserForm.name = res.data.name
          this.updateUserForm.ssn = res.data.ssn
          this.updateUserForm.phone = res.data.phone
          this.updateUserForm.email = res.data.email
        }
      }).catch(error => {
        console.log(error)
        //this.$router.push('/404')
      })

    },
    handleUpdataForm() {
      this.$refs.updateUserForm.validate((valid) => {
        if (valid) {
          //console.log('ook!')
          this.$store.dispatch('user/updateUserInfo', this.updateUserForm).then(res => {
            if (res.success) {
              this.$alert(res.message, '提示', {
                confirmButtonText: '确定',
                callback: action => {
                  location.reload()
                }
              })
            }
            else {
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
        else {
          this.$alert('修改不合理！', '提示', {
            confirmButtonText: '确定',
            callback: action => {
              this.loading = false
            }
          })
        }
      })
    },
  },
};
</script>

<style lang="scss" scoped>
.container {
  height: 95vh;
}
</style>