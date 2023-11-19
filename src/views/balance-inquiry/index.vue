<template>
<div>
    <el-card>
        <div slot="header" class="clearfix">
            <span>Wallet账户余额</span>
        </div>
        <el-form label-position="left" label-width="120px" style="padding-left: 10% ;">
            <el-form-item label="账户余额">
                <span>{{ balance }}</span>
            </el-form-item>
            <el-button style="padding: 12px 50px;">充值</el-button> 
            <el-button style="padding: 12px 50px;">提现</el-button> 
        </el-form>
    </el-card>
    <el-card style="height: 73vh;">
        <div slot="header" class="clearfix">
            <span>卡管理</span>
        </div>
        <div><el-button style="padding: 12px 50px;">添加卡</el-button> 
            <el-button style="padding: 12px 50px;">移除卡</el-button></div>
        <el-row>
            <el-col :span="5" v-for="(card, index) in cardList" :key="index" >
            <el-card class="bank-card">
                <div slot="header" class="bank-card-header">
                    <!-- 银行名称 -->
                    {{ card.cardType | typeToBank }}
                </div>
                <div class="bank-card-content">
                    <!-- 卡号 -->
                    <div class="bank-card-number">
                    <span>卡号：</span>
                    {{ card.cardNumber }}
                    </div>
                    <!-- 余额 -->
                    <div class="bank-card-balance">
                    <span>余额：</span>
                    {{ card.balance }}
                    </div>
                    <!-- 时间 -->
                    <div class="bank-card-time">
                    <span>创建时间：</span>
                    {{ card.createTime }}
                    </div>
                </div>
            </el-card>
        </el-col></el-row>
    </el-card>
</div>
</template>

<script>
export default{
    name: 'Balance-inquiry',
    filters:{
        typeToBank(type){
            const typeMap = {
                0:"中国工商银行",
                1:"中国建设银行",
                2:"中国农业银行"
            }
            return typeMap[type]
        }
    },
    data(){
        const cardtest = [{
            cardId:'1',
            cardNumber:"1000001",
            cardType:0,
            balance:0,
            createTime:'2023/8/31'
        },
        {
            cardId:'2',
            cardNumber:"1000002",
            cardType:1,
            balance:0,
            createTime:'2023/8/31'
        },
        {
            cardId:'1',
            cardNumber:"1000001",
            cardType:0,
            balance:0,
            createTime:'2023/8/31'
        },
        {
            cardId:'1',
            cardNumber:"1000001",
            cardType:0,
            balance:0,
            createTime:'2023/8/31'
        },{
            cardId:'1',
            cardNumber:"1000001",
            cardType:0,
            balance:0,
            createTime:'2023/8/31'
        },{
            cardId:'1',
            cardNumber:"1000001",
            cardType:0,
            balance:0,
            createTime:'2023/8/31'
        },{
            cardId:'1',
            cardNumber:"1000001",
            cardType:0,
            balance:0,
            createTime:'2023/8/31'
        }]
        
        return{
            balance: 0,
            cardList:cardtest
        }
    }
}
</script>

<style scoped>
.bank-card{
    margin-top: 20px;
    padding: 16px;
  /* 调整卡片宽度 */
  max-width: 300px; /* 根据需要设置合适的宽度 */
}


.bank-card-header {
  font-size: 1.2em;
  font-weight: bold;
  text-align: center;
}

.bank-card-content {
  padding: 16px;
  /* 调整卡片宽度 */
  max-width: 300px; /* 根据需要设置合适的宽度 */
  margin: 0 auto; /* 居中显示 */
}

.bank-card-number,
.bank-card-balance,
.bank-card-time {
  margin-bottom: 8px;
}

.bank-card-number span,
.bank-card-balance span,
.bank-card-time span {
  font-weight: bold;
  margin-right: 8px;
}
</style>