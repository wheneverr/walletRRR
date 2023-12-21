<template>
  <div>
    <el-card>
      <div slot="header" class="clearfix">
        <span>向他人要钱</span>
      </div>

      <el-form :model="requestForm" label-width="120px" :rules="requestRules" ref="requestForm"
        style="padding-left: 10%;padding-right: 10%;">
        <el-form-item label="账号类型" prop="accountType">
          <el-select ref="accountType" v-model="requestForm.accountType" placeholder="请选择账号类型">
            <el-option label="电话" value=0></el-option>
            <el-option label="电子邮件" value=1></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="对方账号" prop="account">
          <el-input ref="account" v-model="requestForm.account"></el-input>
        </el-form-item>
        <el-form-item label="金额" prop="amount">
          <el-input ref="amount" v-model="requestForm.amount"></el-input>
        </el-form-item>
        <el-form-item label="支付密码" prop="payPwd">
          <el-input ref="payPwd" v-model="requestForm.payPwd" type="password"></el-input>
        </el-form-item>
        <el-button style="margin-left: 120px;padding: 12px 50px;" @click="handleRequestForm">要钱</el-button>
      </el-form>
    </el-card>
    <el-card>
      <div slot="header" class="clearfix">
        <span>收到的要钱申请</span>
      </div>
      <el-table v-loading="listLoading" :data="receiptList" element-loading-text="Loading" border fit
        highlight-current-row>
        <el-table-column align="center" label="交易id" prop="transactionId" width="200"></el-table-column>
        <el-table-column align="center" label="发起账户id" prop="sendUserId" width="200"></el-table-column>
        <el-table-column align="center" label="金额" prop="transactionAmount" width="95"></el-table-column>
        <el-table-column align="center" label="时间" prop="createTime" width="200"
          :formatter="formatDate"></el-table-column>
        <el-table-column align="center" label="状态" prop="auditStatus" width="150"></el-table-column>
        <el-table-column align="center" label="操作" width="170">
          <template slot-scope="scope">
            <div v-if="scope.row.auditStatus == 0" style="display: flex; justify-content: space-between;">
              <el-button type="primary" @click="handleAccept(scope.row.transactionId)">同意</el-button>
              <el-button type="danger" @click="handleReject(scope.row.transactionId)">拒绝</el-button>
            </div>
            <span v-else-if="scope.row.auditStatus == 1">已同意</span>
            <span v-else-if="scope.row.auditStatus == 2">已拒绝</span>
          </template>
        </el-table-column>
      </el-table>
      <el-dialog title="请输入支付密码" :visible.sync="dialogFormVisible">
        <el-form :model="auditForm" label-width="120px">
          <el-form-item label="支付密码">
            <el-input v-model="auditForm.payPwd" type="password"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible = false">取 消</el-button>
          <el-button type="primary" @click="handleDialogForm">确 定</el-button>
        </div>
      </el-dialog>
    </el-card>
    <el-card>
      <div slot="header" class="clearfix">
        <span>发起的要钱申请</span>
      </div>
      <el-table v-loading="listLoading" :data="initiationList" element-loading-text="Loading" border fit
        highlight-current-row>
        <el-table-column align="center" label="交易id" prop="transactionId" width="200"></el-table-column>
        <el-table-column align="center" label="要钱账户id" prop="recUserId" width="200"></el-table-column>
        <el-table-column align="center" label="金额" prop="transactionAmount" width="95"></el-table-column>
        <el-table-column align="center" label="时间" prop="createTime" width="200"
          :formatter="formatDate"></el-table-column>
        <el-table-column align="center" label="状态" width="150">
          <template slot-scope="scope">
            {{ auditStatusList[scope.row.auditStatus] }}
          </template>
        </el-table-column>
      </el-table>
    </el-card>
  </div>
</template>

<script>
import { getUserInfo } from '@/utils/auth'
import { addTransaction, getReceiptList, getInitiationList, audit } from '@/api/transaction'

export default {
  name: 'Askfor-money',
  data() {
    const storedUserInfo = getUserInfo()
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
      requestForm: {
        account: '',
        amount: 0,
        accountType: '',
        payPwd: ''
      },
      requestRules: {
        account: [{ required: true, trigger: 'blur', validator: validateAccount }],
        amount: [{ required: true, trigger: 'blur', validator: validateAmount }],
        accountType: [{ required: true, trigger: 'blur', validator: validateAccountType }],
        payPwd: [{ required: true, trigger: 'blur', validator: validatePayPwd }],
      },
      initiationList: [],
      receiptList: [],
      listLoading: true,
      storedUserInfo: storedUserInfo,
      auditForm: {
        payPwd: '',
        transactionId: '',
        auditStatus: 0,
      },
      dialogFormVisible: false,
      auditStatusList: [
        "待审核",
        "已同意",
        "已拒绝"
      ],
    }
  },
  mounted() {
    Promise.all([
      this.loadInitiationList(),
      this.loadReceiptList()
    ])
  },
  methods: {
    loadInitiationList() {
      const transactionType = 1;
      return new Promise((resolve, reject) => {
        getInitiationList(this.storedUserInfo.userId, transactionType).then(response => {
          this.initiationList = response.data
          this.listLoading = false
          resolve(response)
        }).catch(error => {
          //console.log(error)
          this.listLoading = false
          reject(error)
        })
      })
    },
    loadReceiptList() {
      const transactionType = 1;
      return new Promise((resolve, reject) => {
        getReceiptList(this.storedUserInfo.userId, transactionType).then(response => {
          this.receiptList = response.data
          resolve(response)
          this.listLoading = false
        }).catch(error => {
          //console.log(error)
          this.listLoading = false
          reject(error)
        })
      })
    },
    formatDate(row, column, cellValue) {
      // cellValue 是该列的值，这里假设它是 ISO 8601 格式的日期字符串
      const date = new Date(cellValue);

      const year = date.getFullYear();
      const month = (date.getMonth() + 1).toString().padStart(2, '0');
      const day = date.getDate().toString().padStart(2, '0');
      const hours = date.getHours().toString().padStart(2, '0');
      const minutes = date.getMinutes().toString().padStart(2, '0');
      const seconds = date.getSeconds().toString().padStart(2, '0');

      // 返回格式化后的字符串
      return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
    },
    handleRequestForm() {
      this.$refs.requestForm.validate((valid) => {
        if (valid) {
          let phone = ''
          let email = ''
          const { amount, payPwd } = this.requestForm
          const sendUserId = this.storedUserInfo.userId
          const transactionType = 1
          if (this.requestForm.accountType == 0) {
            phone = this.requestForm.account
          }
          else {
            email = this.requestForm.account
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
    },
    handleAccept(transactionId) {
      this.dialogFormVisible = true
      this.auditForm.auditStatus = 1
      this.auditForm.transactionId = transactionId
    },
    handleReject(transactionId) {
      this.dialogFormVisible = true
      this.auditForm.auditStatus = 2
      this.auditForm.transactionId = transactionId

    },
    validateAuditForm() {
      if (this.auditForm.payPwd === '') {
        return false
      }
      if (this.auditForm.auditStatus == 0) {
        return false
      }
      if (this.auditForm.transactionId === '') {
        return false
      }
      return true
    },
    handleDialogForm() {
      if (this.validateAuditForm()) {

        return new Promise((resolve, reject) => {
          const { payPwd, transactionId, auditStatus } = this.auditForm
          audit(payPwd, auditStatus, transactionId).then(response => {
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
        this.$alert('输入不能为空！', '提示', {
          confirmButtonText: '确定',
          callback: action => {
            this.loading = false
          }
        })
      }
    },
  }
}
</script>