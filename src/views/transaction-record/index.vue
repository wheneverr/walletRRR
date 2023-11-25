<template>
    <div class="app-container">
      <el-card>
        <div slot="header" class="clearfix">
            <span>交易记录</span>
        </div>
        
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
  import { getTransactionList } from '@/api/transaction'
  
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
          1: '收款',
        }
        return typeMap[type]
      }
    },
    data() {
      return {
        recordList: [],
        listLoading: true
      }
    },
    mounted() {
      this.fetchData()
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
    }
  }
  </script>