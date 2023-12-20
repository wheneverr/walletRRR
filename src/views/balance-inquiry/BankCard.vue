<template>
  <div>
    <el-card class="bank-card" :style="{ backgroundColor: cardColor, color: fontColor }">
      <div slot="header" class="clearfix">
        <span>{{ bankName }}</span>
        <i class="el-icon-setting"></i>
      </div>
      <div>每日支付限额：20000元</div>
    </el-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
    }
  },
  props: {
    bankName: {
      type: String,
      required: true
    },
  },
  computed: {
    cardColor() {
      switch (this.bankName) {
        case '重庆农村商业银行':
          return '#FF0000';
        case '中国建设银行':
          return '#008000';
        case '中国邮政储蓄银行':
          return '#0000FF';
        case '中国工商银行':
          return '#FFFF00';
        default:
          return '#FFFFFF';
      }
    },
    fontColor() {
      return this.cardColor === '#FF0000' || this.cardColor === '#0000FF' ? '#FFFFFF' : '#000000';
    }
  }
}
</script>

<style scoped>
.bank-card {
  width: 300px;
  height: 200px;
  margin: 10px;
  text-align: center;
  line-height: 200px;
}
</style>
