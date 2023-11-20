<template>
<div>
    <el-card>
      <div slot="header" class="clearfix">
        <span>向他人要钱</span>
      </div>
    
      <el-form :model="requestForm" label-width="120px" style="padding-left: 10%;padding-right: 10%;">
          <el-form-item label="对方账户">
            <el-input v-model="requestForm.receiver"></el-input>
          </el-form-item>
          <el-form-item label="金额">
            <el-input v-model="requestForm.amount"></el-input>
          </el-form-item>
          <el-button style="margin-left: 120px;padding: 12px 50px;">申请</el-button> 
        </el-form>
    </el-card>
    <el-card>
        <div slot="header" class="clearfix">
        <span>收到的要钱申请</span>
      </div>
      <el-table
        v-loading="listLoading"
        :data="initiationList"
        element-loading-text="Loading"
        border
        fit
        highlight-current-row
      >
      <el-table-column align="center" label="发起账户" prop="initiatorAccount" width="200"></el-table-column>
      <el-table-column align="center" label="金额" prop="amount" width="95"></el-table-column>
      <el-table-column align="center" label="时间" prop="time" width="200"></el-table-column>
      <el-table-column align="center" label="状态" prop="status" width="150"></el-table-column>
      <el-table-column align="center" label="操作" width="150"></el-table-column>
    </el-table>
    </el-card>
    <el-card>
        <div slot="header" class="clearfix">
        <span>发起的要钱申请</span>
      </div>
      <el-table
        v-loading="listLoading"
        :data="receiptList"
        element-loading-text="Loading"
        border
        fit
        highlight-current-row
      >
      <el-table-column align="center" label="要钱账户" prop="receiverAccount" width="200"></el-table-column>
      <el-table-column align="center" label="金额" prop="amount" width="95"></el-table-column>
      <el-table-column align="center" label="时间" prop="time" width="200"></el-table-column>
      <el-table-column align="center" label="状态" prop="status" width="150"></el-table-column>
    </el-table>
    </el-card>
  </div>
</template>

<script>
export default{
    name: 'Askfor-money',
    data(){
        return{
            requestForm:{
                receiver:'',
                amount:0
            },
            initiationList:{
                initiatorAccount:'',
                amount:0,
                time:'',
                status:0
            },
            receiptList:{
                receiverAccount:'',
                amount:0,
                time:'',
                status:0,
            }
        }
    }
}
</script>