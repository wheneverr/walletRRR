<template>
  <div>
    <el-card style="height: 95vh;">
      <div slot="header" class="clearfix">
        <span>转账</span>
      </div>

      <el-form :model="transferForm" label-width="120px" :rules="transferRules" ref="transferForm"
        style="padding-left: 10%;padding-right: 10%;">
        <el-form-item label="账号类型" prop="accountType">
          <el-select ref="accountType" v-model="transferForm.accountType" placeholder="请选择账号类型">
            <el-option label="电话" value=0></el-option>
            <el-option label="电子邮件" value=1></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="对方账号" prop="account">
          <el-input ref="account" v-model="transferForm.account"></el-input>
        </el-form-item>
        <el-form-item label="金额" prop="amount">
          <el-input ref="amount" v-model="transferForm.amount"></el-input>
        </el-form-item>
        <el-form-item label="支付密码" prop="payPwd">
          <el-input ref="payPwd" v-model="transferForm.payPwd" type="password"></el-input>
        </el-form-item>
        <el-button style="margin-left: 120px;padding: 12px 50px;" @click="handleTransferForm">转账</el-button>
      </el-form>
    </el-card>
  </div>
</template>

<script>
import { getUserInfo } from '@/utils/auth'
import { addTransaction } from '@/api/transaction'

export default {
  name: 'Transfer-money',
  data() {
    const validateAccountType = (rule, value, callback) => {
      if (!value.length) {
        callback(new Error('Please select account type'))
      } else {
        callback()
      }
    }
    const validateAccount = (rule, value, callback) => {
      if (!value.length) {
        callback(new Error('Please enter phone or email'))
      } else {
        callback()
      }
    }
    const validateAmount = (rule, value, callback) => {
      let posPattern = /^[1-9]\d*$/
      if (!posPattern.test(value)) {
        callback(new Error('Amount error'))
      } else {
        callback()
      }
    }
    const validatePayPwd = (rule, value, callback) => {
      if (value.length < 6) {
        callback(new Error('The password can not be less than 6 digits'))
      } else {
        callback()
      }
    }

    return {
      transferForm: {
        account: '',
        amount: 0,
        accountType: '',
        payPwd: ''
      },
      transferRules: {
        account: [{ required: true, trigger: 'blur', validator: validateAccount }],
        amount: [{ required: true, trigger: 'blur', validator: validateAmount }],
        accountType: [{ required: true, trigger: 'blur', validator: validateAccountType }],
        payPwd: [{ required: true, trigger: 'blur', validator: validatePayPwd }],
      }
    }
  },
  methods: {
    handleTransferForm() {
      const storedUserInfo = getUserInfo()
      this.$refs.transferForm.validate((valid) => {
        if (valid) {
          let phone = ''
          let email = ''
          const { amount, payPwd } = this.transferForm
          const sendUserId = storedUserInfo.userId
          const transactionType = 0
          console.log(this.transferForm.accountType)
          if (this.transferForm.accountType == 0) {
            phone = this.transferForm.account
          }
          else {
            email = this.transferForm.account
          }
          return new Promise((resolve, reject) => {
            addTransaction({ email: email, payPwd: payPwd, phone: phone, sendUserId: sendUserId, transactionAmount: amount, transactionType: transactionType }).then(response => {
              if (response.success) {
                this.$alert(response.message, '提示', {
                  confirmButtonText: '确定',
                  callback: action => {
                    location.reload()
                  }
                })
              }
              else {
                this.$alert(response.message, '提示', {
                  confirmButtonText: '确定',
                  callback: action => {
                  }
                })
              }
              resolve(response)
            }).catch(error => {
              this.$message({
                message: error,
                type: 'error'
              });
              reject(error)
            })
          })
        }
        else {
          this.$alert('输入为空或不合理！', '提示', {
            confirmButtonText: '确定',
            callback: action => {
            }
          })
        }
      })

    }
  }
}
</script>
