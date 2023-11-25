<template>
<div>
    <el-card style="height: 95vh;">
      <div slot="header" class="clearfix">
        <span>转账</span>
      </div>
    
      <el-form :model="transferForm" label-width="120px" style="padding-left: 10%;padding-right: 10%;">
        <el-form-item label="账号类型">
              <el-select v-model="transferForm.accountType" placeholder="请选择账号类型">
                  <el-option label="电话" value=0></el-option>
                  <el-option label="电子邮件" value=1></el-option>
              </el-select>
          </el-form-item>
          <el-form-item label="对方账号">
            <el-input v-model="transferForm.account"></el-input>
          </el-form-item>
          <el-form-item label="金额">
            <el-input v-model="transferForm.amount"></el-input>
          </el-form-item>
          <el-form-item label="支付密码">
            <el-input v-model="transferForm.payPwd" type="password"></el-input>
          </el-form-item>
          <el-button style="margin-left: 120px;padding: 12px 50px;" @click="handleTransferForm">转账</el-button> 
        </el-form>
    </el-card>
  </div>
</template>

<script>
import { getUserInfo } from '@/utils/auth'
import { addTransaction } from '@/api/transaction'

export default{
    name:'Transfer-money',
    data(){
        return {
            transferForm:{
                account: '',
                amount: 0,
                accountType:'',
                payPwd: ''
            }
        }
    },
    methods:{
      validateTransferForm(){
        if(this.transferForm.account === ''){
          return false
        }
        if(this.transferForm.amount <= 0){
          return false
        }
        if(this.transferForm.accountType === ''){
          return false
        }
        return true
      },
      handleTransferForm(){
        const storedUserInfo = getUserInfo()
        if(this.validateTransferForm()){
          let phone = ''
          let email = ''
          const {amount, payPwd} = this.transferForm
          const sendUserId = storedUserInfo.userId
          const transactionType = 0
          console.log(this.transferForm.accountType)
          if(this.transferForm.accountType == 0){
            phone = this.transferForm.account
          }
          else{
            email = this.transferForm.account
          }
          return new Promise((resolve, reject) => {
            addTransaction({email: email, payPwd: payPwd, phone: phone, sendUserId: sendUserId, transactionAmount: amount, transactionType: transactionType}).then(response => {
              if(response.success){
                            this.$alert(response.message, '提示', {
                                confirmButtonText: '确定',
                                callback: action => {
                                location.reload()
                                }
                            })
                        }
                        else{
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
        else{
          this.$alert('输入为空或不合理！', '提示', {
                    confirmButtonText: '确定',
                    callback: action => {
                    }
                })
        }
      }
    }
}
</script>
