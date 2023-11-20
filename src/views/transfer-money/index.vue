<template>
<div>
    <el-card style="height: 95vh;">
      <div slot="header" class="clearfix">
        <span>转账</span>
      </div>
    
      <el-form :model="transferForm" label-width="120px" style="padding-left: 10%;padding-right: 10%;">
          <el-form-item label="对方账户">
            <el-input v-model="transferForm.receiver"></el-input>
          </el-form-item>
          <el-form-item label="金额">
            <el-input v-model="transferForm.amount"></el-input>
          </el-form-item>
          <el-button style="margin-left: 120px;padding: 12px 50px;">转账</el-button> 
        </el-form>
    </el-card>
  </div>
</template>

<script>
export default{
    name:'Transfer-money',
    data(){
        return {
            transferForm:{
                receiver: '',
                amount: 0,
            }
        }
    },
    methods:{

    }
}
</script>
