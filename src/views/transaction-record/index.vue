<template>
  <div class="app-container">
    <div class="card-box">
      <el-card>
        <div slot="header" class="clearfix">
          <span>本月收支</span>
        </div>

        <el-form label-position="left" label-width="90px" style="margin: 30px auto; width: 200px;">
          <el-form-item label="本月总支出">
            <span>{{ expense }}</span>
          </el-form-item>
          <el-form-item label="本月总收入">
            <span>{{ income }}</span>
          </el-form-item>
        </el-form>
      </el-card>

      <el-card>
        <svg-icon icon-class="approve" style="width: 40px; height: 40px;" />
        <el-form label-position="left" label-width="100px" style="margin: 30px auto; width: 200px;">
          <el-form-item label="最佳发送用户">
            <span>{{ bestTransferUser }}</span>
          </el-form-item>
          <el-form-item label="最佳接收用户">
            <span>{{ bestAskMoneyUser }}</span>
          </el-form-item>
        </el-form>
      </el-card>
    </div>

    <div class="card-box">
      <el-card>
        <div slot="header" class="clearfix">
          <span>每月总收支</span>
        </div>

        <el-table v-loading="listLoading" :data="allExpenseList" element-loading-text="Loading" border fit
          highlight-current-row>
          <el-table-column align="center" label="月份" prop="month"></el-table-column>
          <el-table-column align="center" label="总金额" prop="sumAmount"></el-table-column>
        </el-table>
      </el-card>

      <el-card>
        <div slot="header" class="clearfix">
          <span>每月平均收支</span>
        </div>

        <el-table v-loading="listLoading" :data="avgExpenseList" element-loading-text="Loading" border fit
          highlight-current-row>
          <el-table-column align="center" label="月份" prop="month"></el-table-column>
          <el-table-column align="center" label="平均金额" prop="avgAmount"></el-table-column>
        </el-table>
      </el-card>

    </div>

    <div class="card-box">

      <el-card>
        <div slot="header" class="clearfix">
          <span>最大金额交易</span>
        </div>
        <el-table v-loading="listLoading" :data="maxExpenseList" element-loading-text="Loading" border fit
          highlight-current-row>
          <el-table-column align="center" label="月份" prop="month"></el-table-column>
          <el-table-column align="center" label="最大金额" prop="maxAmount"></el-table-column>
        </el-table>
      </el-card>

      <el-card>
        <div slot="header" class="clearfix">
          <span>收支查询</span>
        </div>

        <el-form :model="searchAmountForm" label-position="right" label-width="90px" :rules="searchAmountRules"
          ref="searchAmountForm">
          <el-row>
            <el-col :span="9">
              <el-form-item label="开始时间" prop="start">
                <el-date-picker type="date" placeholder="选择开始日期" v-model="searchAmountForm.start" ref="start"
                  style="width: 100%;"></el-date-picker>
              </el-form-item>
            </el-col>
            <el-col :span="9">
              <el-form-item label="结束时间" prop="end">
                <el-date-picker type="date" placeholder="选择结束日期" v-model="searchAmountForm.end" ref="end"
                  style="width: 100%;"></el-date-picker>
              </el-form-item>
            </el-col>
            <el-col :span="1">
              <el-button class="schbtn" type="primary" @click="searchAmount">查询</el-button>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="9">
              <el-form-item label="总收入">
                <span>{{ totalReceivedAmount }}</span>
              </el-form-item>
            </el-col>
            <el-col :span="9">
              <el-form-item label="总转出">
                <span>{{ totalSentAmount }}</span>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </el-card>
    </div>

    <el-card>
      <div slot="header" class="clearfix">
        <span>交易记录</span>
      </div>
      <el-form :model="sendInfoForm" label-width="80px" :rules="sendInfoFormRules" ref="sendInfoForm">
        <el-row>
          <el-col :span="4">
            <el-form-item label="电话">
              <el-input v-model="sendInfoForm.phone"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="4">
            <el-form-item label="邮箱">
              <el-input v-model="sendInfoForm.email"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="4">
            <el-form-item label="SSN">
              <el-input v-model="sendInfoForm.ssn"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="3">
            <el-form-item label="交易类型" prop="transactionType">
              <el-select v-model="sendInfoForm.transactionType" placeholder="选择交易类型" ref="transactionType">
                <el-option label="转账" value=0></el-option>
                <el-option label="要钱" value=1></el-option>
              </el-select>
            </el-form-item>
          </el-col>

          <el-col :span="6">
            <el-form-item label="起止时间" prop="start">
              <el-col :span="11">
                <el-date-picker type="date" placeholder="选择开始日期" v-model="sendInfoForm.start" ref="start"
                  style="width: 100%;"></el-date-picker>
              </el-col>
              <el-col class="line" :span="0.5">--</el-col>
              <el-col :span="11">
                <el-date-picker type="date" placeholder="选择结束日期" v-model="sendInfoForm.end"
                  style="width: 100%;"></el-date-picker>
              </el-col>
            </el-form-item></el-col>
          <el-col :span="1">
            <el-form-item>
              <el-button type="primary" @click="search">查询</el-button>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <el-table v-loading="listLoading" :data="recordList" element-loading-text="Loading" border fit
        highlight-current-row>
        <el-table-column align="center" label="交易ID" prop="transactionId">

        </el-table-column>

        <el-table-column align="center" label="交易类型" width="180">
          <template slot-scope="scope">
            <el-tag :type="scope.row.transactionType | typeFilter1">{{ scope.row.transactionType | typeFilter2 }}</el-tag>
          </template>
        </el-table-column>

        <el-table-column align="center" label="交易金额" prop="transactionAmount" width="180">

        </el-table-column>
        <el-table-column align="center" label="交易状态" width="180">
          <template slot-scope="scope">
            {{ auditStatusList[scope.row.auditStatus] }}
          </template>
        </el-table-column>

        <el-table-column align="center" label="发送用户ID" prop="sendUserId">

        </el-table-column>

        <el-table-column align="center" label="接收用户ID" prop="recUserId"></el-table-column>

        <el-table-column align="center" label="创建日期" prop="createTime" :formatter="formatDate"></el-table-column>

        <el-table-column align="center" label="修改日期" prop="updateTime" :formatter="formatDate"></el-table-column>
      </el-table>
    </el-card>

  </div>
</template>
  
<script>
import { getUserInfo } from '@/utils/auth'
import {
  getTransactionList, totalAmount, searchTransactionRecord,
  getTopUser, getAllExpenseList, getAvgExpenseList, getMaxExpenseList
} from '@/api/transaction'
import { getInfo } from '@/api/user'

export default {
  filters: {
    typeFilter1(type) {
      const typeMap = {
        0: 'danger',
        1: 'success',
      }
      return typeMap[type]
    },
    typeFilter2(type) {
      const typeMap = {
        0: '转账',
        1: '要钱',
      }
      return typeMap[type]
    }
  },
  data() {
    const storedUserInfo = getUserInfo()
    const validateTransactionType = (rule, value, callback) => {
      if (!value.length) {
        callback(new Error('Please select transaction type'))
      } else {
        callback()
      }
    }
    const validateDate = (rule, value, callback) => {
      if (!value.length) {
        callback(new Error('Please select date'))
      } else {
        callback()
      }
    }
    return {
      recordList: [],
      listLoading: true,
      income: '',
      expense: '',
      avgExpenseList: [],
      allExpenseList: [],
      maxExpenseList: [],
      bestTransferUser: '',
      bestAskMoneyUser: '',
      totalSentAmount: '',
      totalReceivedAmount: '',
      sendInfoForm: {
        phone: '',
        email: '',
        ssn: '',
        transactionType: '',
        start: '',
        end: '',
      },
      searchAmountForm: {
        date1: '',
        date2: ''
      },
      storedUserInfo: storedUserInfo,
      auditStatusList: [
        "待审核",
        "已同意",
        "已拒绝"
      ],
      searchAmountRules: {
        start: [{ required: true, trigger: 'blur', validator: validateDate }],
        end: [{ required: true, trigger: 'blur', validator: validateDate }],
      },
      sendInfoFormRules: {
        transactionType: [{ required: true, trigger: 'blur', validator: validateTransactionType }],
        start: [{ required: true, trigger: 'blur', validator: validateDate }],
        end: [{ required: true, trigger: 'blur', validator: validateDate }],
      },
    }
  },
  mounted() {
    Promise.all([
      this.fetchData(),
      this.getIncomeExpense(),
      this.getBestAskMoneyUser(),
      this.getBestTransferUser(),
      this.getAllExpenseList(),
      this.getAvgExpenseList(),
      this.getMaxExpenseList(),
    ]).then(() => {
      this.getUsername(this.bestTransferUser, 0)
      this.getUsername(this.bestAskMoneyUser, 1)
    }).catch(error => {
      console.error(error);
    })
  },
  methods: {
    fetchData() {
      this.listLoading = true
      return new Promise((resolve, reject) => {
        getTransactionList().then(response => {
          this.recordList = response.data
          this.listLoading = false
          resolve(response)
        }).catch(error => {
          console.log(error)
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
    formatDate1(date) {
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, '0'); // 月份从 0 开始
      const day = String(date.getDate()).padStart(2, '0');
      return `${year}-${month}-${day}T00:00:00`;
    },
    convertUTCToChinaTime(utcDateString) {
      // 创建一个 UTC 时间对象
      const utcDate = new Date(utcDateString);

      // 转换为中国时间
      const chinaTime = new Date(utcDate.toLocaleString('en-US', { timeZone: 'Asia/Shanghai' }));

      // 获取中国时间的年、月、日、时、分、秒
      const year = chinaTime.getFullYear();
      const month = (chinaTime.getMonth() + 1).toString().padStart(2, '0');
      const day = chinaTime.getDate().toString().padStart(2, '0');
      const hours = chinaTime.getHours().toString().padStart(2, '0');
      const minutes = chinaTime.getMinutes().toString().padStart(2, '0');
      const seconds = chinaTime.getSeconds().toString().padStart(2, '0');

      // 构建中国时间的格式
      const chinaTimeFormatted = `${year}-${month}-${day}T${hours}:${minutes}:${seconds}`;

      return chinaTimeFormatted;
    },
    getIncomeExpense() {
      // 获取当前日期
      const currentDate = new Date();

      // 获取本月第一天
      const firstDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);

      // 格式化日期为 YYYY-MM-DD
      const formattedCurrentDate = this.formatDate1(currentDate);
      const formattedFirstDayOfMonth = this.formatDate1(firstDayOfMonth);
      return new Promise((resolve, reject) => {
        totalAmount(this.storedUserInfo.userId, formattedFirstDayOfMonth, formattedCurrentDate).then(response => {
          this.income = response.data.totalReceivedAmount
          this.expense = response.data.totalSentAmount
          resolve(response)
        }).catch(error => {
          console.log(error)
          reject(error)
        })

      })
    },

    getBestTransferUser() {
      return new Promise((resolve, reject) => {
        getTopUser(true).then(response => {
          this.bestTransferUser = Object.keys(response.data)[0]
          resolve(response)
        }).catch(error => {
          console.log(error)
          reject(error)
        })

      })
    },

    getBestAskMoneyUser() {
      return new Promise((resolve, reject) => {
        getTopUser(false).then(response => {
          this.bestAskMoneyUser = Object.keys(response.data)[0]
          resolve(response)
        }).catch(error => {
          console.log(error)
          reject(error)
        })

      })
    },
    getUsername(userId, type) {
      return new Promise((resolve, reject) => {
        getInfo(userId).then(response => {
          if (type == 0) {
            this.bestTransferUser = response.data.userName
          }
          else {
            this.bestAskMoneyUser = response.data.userName
          }
          resolve(response)
        }).catch(error => {
          console.log(error)
          reject(error)
        })

      })
    },
    getAllExpenseList() {
      this.listLoading = true
      return new Promise((resolve, reject) => {
        getAllExpenseList(this.storedUserInfo.userId).then(response => {
          this.allExpenseList = response.data
          this.listLoading = false
          resolve(response)
        }).catch(error => {
          console.log(error)
          reject(error)
        })

      })
    },
    getAvgExpenseList() {
      this.listLoading = true
      return new Promise((resolve, reject) => {
        getAvgExpenseList(this.storedUserInfo.userId).then(response => {
          this.avgExpenseList = response.data
          this.listLoading = false
          resolve(response)
        }).catch(error => {
          console.log(error)
          reject(error)
        })

      })
    },
    getMaxExpenseList() {
      this.listLoading = true
      return new Promise((resolve, reject) => {
        getMaxExpenseList(this.storedUserInfo.userId).then(response => {
          this.maxExpenseList = response.data
          this.listLoading = false
          resolve(response)
        }).catch(error => {
          console.log(error)
          reject(error)
        })

      })
    },
    validateSearchForm() {
      if (this.sendInfoForm.phone === '' && this.sendInfoForm.email === '' && this.sendInfoForm.ssn === '') {
        return false
      }
      if (this.sendInfoForm.transactionType === '') {
        return false
      }
      if (this.sendInfoForm.start === '') {
        return false
      }
      if (this.sendInfoForm.end === '') {
        return false
      }
      return true
    },
    search() {
      if (this.validateSearchForm()) {
        const startTime = this.convertUTCToChinaTime(this.sendInfoForm.start)
        const endTime = this.convertUTCToChinaTime(this.sendInfoForm.end)
        return new Promise((resolve, reject) => {
          searchTransactionRecord(this.sendInfoForm.phone, this.sendInfoForm.email, this.sendInfoForm.ssn, this.sendInfoForm.transactionType, startTime, endTime).then(response => {
            if (response.success) {
              this.$alert(response.message, '提示', {
                confirmButtonText: '确定',
                callback: action => {
                  this.recordList = response.data
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

    searchAmount() {
      this.$refs.searchAmountForm.validate((valid) => {
        if (valid) {
          const startTime = this.convertUTCToChinaTime(this.searchAmountForm.start)
          const endTime = this.convertUTCToChinaTime(this.searchAmountForm.end)
          return new Promise((resolve, reject) => {
            totalAmount(this.storedUserInfo.userId, startTime, endTime).then(response => {
              this.totalSentAmount = response.data.totalSentAmount
              this.totalReceivedAmount = response.data.totalReceivedAmount
              resolve(response)
            }).catch(error => {
              console.log(error)
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
      })
    },
  }
}
</script>

<style>
.card-box {
  display: flex;
  justify-content: space-between;
}

.card-box .el-card {
  width: 49.5%;
}

.narrow {
  max-width: 10px;
}

.schbtn {
  margin-left: 20px;
}
</style>