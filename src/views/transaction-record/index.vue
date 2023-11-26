<template>
    <div class="app-container">
      <el-card class="container">
      <div slot="header" class="clearfix">
        <span>本月收支</span>
      </div>
      
      <el-form label-position="left" label-width="120px" style="padding-left: 12%;">
        <el-form-item label="本月支出">
            <span>{{ expense }}</span>
          </el-form-item> 
          <el-form-item label="本月收入">
            <span>{{ income }}</span>
          </el-form-item> 
        </el-form>
    </el-card>
      <el-card>
        <div slot="header" class="clearfix">
            <span>交易记录</span>
        </div>
        <el-form ref="form" :model="sendInfoForm" label-width="80px">
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
              <el-form-item label="交易类型">
            <el-select v-model="sendInfoForm.transactionType" placeholder="选择交易类型">
              <el-option label="转账" value=0></el-option>
              <el-option label="要钱" value=1></el-option>
            </el-select>
          </el-form-item>
            </el-col>

            <el-col :span="6">
          <el-form-item label="起止时间">
            <el-col :span="11">
              <el-date-picker type="date" placeholder="选择开始日期" v-model="sendInfoForm.start" style="width: 100%;"></el-date-picker>
            </el-col>
            <el-col class="line" :span="0.5">--</el-col>
            <el-col :span="11">
              <el-date-picker type="date" placeholder="选择结束日期" v-model="sendInfoForm.end" style="width: 100%;"></el-date-picker>
            </el-col>
          </el-form-item></el-col>
          <el-col :span="1">
              <el-form-item>
                <el-button type="primary" @click="search">查询</el-button>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
        <el-table
        v-loading="listLoading"
        :data="recordList"
        element-loading-text="Loading"
        border
        fit
        highlight-current-row
      >
        <el-table-column align="center" label="交易ID" prop="transactionId" width="180">

        </el-table-column>

        <el-table-column align="center" label="交易类型" width="180">
          <template slot-scope="scope">
            <el-tag :type="scope.row.transactionType | typeFilter1">{{ scope.row.transactionType | typeFilter2 }}</el-tag>
          </template>
        </el-table-column>

        <el-table-column align="center" label="交易金额" prop="transactionAmount" width="180">

        </el-table-column>

        <el-table-column align="center" label="发送用户ID" prop="sendUserId" width="180">

        </el-table-column>

        <el-table-column align="center" label="接收用户ID" prop="recUserId" width="180"></el-table-column>

        <el-table-column align="center" label="创建日期" prop="createTime" width="180" :formatter="formatDate"></el-table-column>

        <el-table-column align="center" label="修改日期" prop="updateTime" width="180" :formatter="formatDate"></el-table-column>
      </el-table>
    </el-card>
     
    </div>
  </template>
  
  <script>
  import { getUserInfo } from '@/utils/auth'
  import { getTransactionList, totalAmount, searchTransactionRecord } from '@/api/transaction'
  
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
      return {
        recordList: [],
        listLoading: true,
        income:'',
        expense:'',
        sendInfoForm:{
          phone:'',
          email:'',
          ssn:'',
          transactionType:'',
          start:'',
          end:''
        },
        storedUserInfo: storedUserInfo,
      }
    },
    mounted() {
      Promise.all([
          this.fetchData(),
          this.getIncomeExpense()
        ])
    },
    methods: {
      fetchData() {
        this.listLoading = true
        return new Promise((resolve, reject) => {
          getTransactionList().then(response => {
            this.recordList = response.data
            this.listLoading = false
            resolve(response)
          }).catch(error =>{
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
      getIncomeExpense(){
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
          }).catch(error =>{
            console.log(error)
            reject(error)
          })

        })
      },
      validateSearchForm(){
        if(this.sendInfoForm.phone === '' && this.sendInfoForm.email === '' && this.sendInfoForm.ssn === ''){
          return false
        }
        if(this.sendInfoForm.transactionType === ''){
          return false
        }
        if(this.sendInfoForm.start === ''){
          return false
        }
        if(this.sendInfoForm.end === ''){
          return false
        }
        return true
      },
      search(){
        if(this.validateSearchForm()){
          return new Promise((resolve, reject) => {
            searchTransactionRecord(this.sendInfoForm.phone, this.sendInfoForm.email, this.sendInfoForm.ssn, this.sendInfoForm.transactionType, this.sendInfoForm.start, this. sendInfoForm.end).then(response => {
              if(response.success){
                            this.$alert(response.message, '提示', {
                                confirmButtonText: '确定',
                                callback: action => {
                                  this.recordList = response.data
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