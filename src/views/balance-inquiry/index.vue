<template>
    <div>
        <el-card>
            <div slot="header" class="clearfix">
                <span>Wallet账户余额</span>
            </div>
            <el-form label-position="left" label-width="120px" style="padding-left: 10% ;">
                <el-form-item label="账户余额">
                    <span>{{ walletBalance }}</span>
                </el-form-item>
                <el-button style="padding: 12px 50px;" @click="handleCharge">充值</el-button>
                <el-button style="padding: 12px 50px;" @click="handleWithdraw">提现</el-button>
            </el-form>

            <el-dialog :title="tracTypeName" :visible.sync="tracDialogVisible">
                <el-form :model="innerTracForm" label-width="120px" :rules="innerTracRules" ref="innerTracForm">
                    <el-form-item label="银行卡" prop="cardId">
                        <el-select ref="cardId" v-model="innerTracForm.cardId" placeholder="请选择银行卡">
                            <el-option v-for="(card, index) in cardList" :key="index" :label="card.cardId"
                                :value="card.cardId"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="金额" prop="tracAmount">
                        <el-input ref="tracAmount" v-model="innerTracForm.tracAmount"></el-input>
                    </el-form-item>
                    <el-form-item label="钱包支付密码" prop="walletPwd">
                        <el-input ref="walletPwd" v-model="innerTracForm.walletPwd" type="password"></el-input>
                    </el-form-item>
                    <el-form-item label="卡支付密码" prop="cardPwd">
                        <el-input ref="cardPwd" v-model="innerTracForm.cardPwd" type="password"></el-input>
                    </el-form-item>
                </el-form>
                <div slot="footer" class="dialog-footer">
                    <el-button @click="tracDialogVisible = false">取 消</el-button>
                    <el-button type="primary" @click="handleInnerTracForm">确 定</el-button>
                </div>
            </el-dialog>


        </el-card>

        <el-card style="height: 73vh;">
            <div slot="header" class="clearfix">
                <span>卡管理</span>
            </div>
            <div><el-button style="padding: 12px 50px;" @click="handleAddCard">添加卡</el-button>
                <el-button style="padding: 12px 50px;" @click="handleRemoveCard">移除卡</el-button>
                <el-button style="padding: 12px 50px;" @click="handleBindCard">绑定主卡</el-button>
            </div>

            <el-dialog title="添加卡" :visible.sync="addDialogVisible">
                <el-form :model="addCardInfoForm" label-width="120px" :rules="addCardInfoRules" ref="addCardInfoForm">
                    <el-form-item label="卡号" prop="cardNumber">
                        <el-input ref="cardNumber" v-model="addCardInfoForm.cardNumber"></el-input>
                    </el-form-item>
                    <el-form-item label="归属银行" prop="cardType">
                        <el-select ref="cardType" v-model="addCardInfoForm.cardType" placeholder="请选择归属银行">
                            <el-option label="中国工商银行" value="0"></el-option>
                            <el-option label="中国建设银行" value="1"></el-option>
                            <el-option label="中国农业银行" value="2"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="金额" prop="balance">
                        <el-input ref="balance" v-model="addCardInfoForm.balance"></el-input>
                    </el-form-item>
                    <el-form-item label="卡支付密码" prop="pwd">
                        <el-input ref="pwd" v-model="addCardInfoForm.pwd" type="password"></el-input>
                    </el-form-item>
                </el-form>
                <div slot="footer" class="dialog-footer">
                    <el-button @click="addDialogVisible = false">取 消</el-button>
                    <el-button type="primary" @click="handleAddCardForm">确 定</el-button>
                </div>
            </el-dialog>


            <el-dialog title="绑定主卡" :visible.sync="bindDialogVisible">
                <el-form :model="bindCardInfoForm" label-width="120px" :rules="bindCardInfoRules" ref="bindCardInfoForm">
                    <el-form-item label="银行卡" prop="cardId">
                        <el-select ref="cardId" v-model="bindCardInfoForm.cardId" placeholder="请选择银行卡">
                            <el-option v-for="(card, index) in cardList" :label="card.cardId"
                                :value="card.cardId"></el-option>
                        </el-select>
                    </el-form-item>
                </el-form>
                <div slot="footer" class="dialog-footer">
                    <el-button @click="bindDialogVisible = false">取 消</el-button>
                    <el-button type="primary" @click="handleBindCardForm">确 定</el-button>
                </div>
            </el-dialog>

            <el-dialog title="移除卡" :visible.sync="removeDialogVisible">
                <el-form :model="removeCardInfoForm" label-width="120px" :rules="removeCardInfoRules"
                    ref="removeCardInfoForm">
                    <el-form-item label="银行卡" prop="cardId">
                        <el-select ref="cardId" v-model="removeCardInfoForm.cardId" placeholder="请选择银行卡">
                            <el-option v-for="(card, index) in cardList" :label="card.cardId"
                                :value="card.cardId"></el-option>
                        </el-select>
                    </el-form-item>
                </el-form>
                <div slot="footer" class="dialog-footer">
                    <el-button @click="removeDialogVisible = false">取 消</el-button>
                    <el-button type="primary" @click="handleRemoveCardForm">确 定</el-button>
                </div>
            </el-dialog>

            <el-row>
                <el-col :span="7" v-for="(card, index) in cardInfoList" :key="index">
                    <el-card class="bank-card">
                        <div class="bank-card-header">{{ typeList[card.cardType] }}</div>
                        <div class="bank-card-content">
                            <ul>
                                <li>
                                    <span>卡id</span><span>{{ card.cardId }}</span>
                                </li>
                                <li>
                                    <span>卡号</span><span>{{ formatCardNumber(card.cardNumber) }}</span>
                                </li>
                                <li>
                                    <span>余额</span><span>{{ card.balance }}</span>
                                </li>
                                <li>
                                    <span>创建时间</span><span>{{ formatDate(card.createTime) }}</span>
                                </li>
                            </ul>
                        </div>
                    </el-card>
                </el-col></el-row>
        </el-card>

    </div>
</template>

<script>
import { getUserInfo } from '@/utils/auth'
import { getUserCardList } from '@/api/user'
import { innerTransaction } from '@/api/transaction'
import { addCard, bindCard, removeCard, getCardInfo } from '@/api/card'

export default {
    name: 'Balance-inquiry',
    data() {
        const storedUserInfo = getUserInfo()
        const typeList = ["中国工商银行", "中国建设银行", "中国农业银行"]
        const validateCard = (rule, value, callback) => {
            if (!value.length) {
                callback(new Error('Please select card'))
            } else {
                callback()
            }
        }
        const validateBank = (rule, value, callback) => {
            if (!value.length) {
                callback(new Error('Please select bank'))
            } else {
                callback()
            }
        }
        const validateCardNumber = (rule, value, callback) => {
            let cardNumberPattern = /^\d{16}$/
            if (!cardNumberPattern.test(value)) {
                callback(new Error('Please enter card number'))
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
        const validatePwd = (rule, value, callback) => {
            let pwdPattern = /^\d{6}$/
            if (!pwdPattern.test(value)) {
                callback(new Error('The password only has 6 digits'))
            } else {
                callback()
            }
        }

        return {
            storedUserInfo: storedUserInfo,
            walletBalance: 0,
            typeList: typeList,
            cardList: [],
            cardInfoList: [],
            tracDialogVisible: false,
            tracTypeName: '提现',
            addDialogVisible: false,
            bindDialogVisible: false,
            removeDialogVisible: false,
            innerTracForm: {
                userId: '',
                cardId: '',
                tracAmount: 0,
                tracType: 0,
                walletPwd: '',
                cardPwd: '',

            },
            innerTracRules: {
                cardId: [{ required: true, trigger: 'blur', validator: validateCard }],
                tracAmount: [{ required: true, trigger: 'blur', validator: validateAmount }],
                walletPwd: [{ required: true, trigger: 'blur', validator: validatePwd }],
                cardPwd: [{ required: true, trigger: 'blur', validator: validatePwd }],
            },
            addCardInfoForm: {
                userId: '',
                cardNumber: '',
                cardType: '',
                balance: 0,
                pwd: ''
            },
            addCardInfoRules: {
                cardNumber: [{ required: true, trigger: 'blur', validator: validateCardNumber }],
                cardType: [{ required: true, trigger: 'blur', validator: validateBank }],
                balance: [{ required: true, trigger: 'blur', validator: validateAmount }],
                pwd: [{ required: true, trigger: 'blur', validator: validatePwd }],
            },
            bindCardInfoForm: {
                userId: '',
                cardId: '',
            },
            bindCardInfoRules: {
                cardId: [{ required: true, trigger: 'blur', validator: validateCard }],
            },
            removeCardInfoForm: {
                userId: '',
                cardId: ''
            },
            removeCardInfoRules: {
                cardId: [{ required: true, trigger: 'blur', validator: validateCard }],
            },
        }
    },
    mounted() {
        Promise.all([
            this.loadUserInfo(),
            this.loadCardInfo()
        ]).then(() => {
            this.loadCard();
        }).catch(error => {
            console.error(error);
        })
    },
    methods: {
        loadUserInfo() {
            this.$store.dispatch('user/getInfo', this.storedUserInfo.userId).then(res => {
                if (res.success) {
                    this.walletBalance = res.data.walletBalance
                }
            }).catch(error => {
                console.log(error)
                //this.$router.push('/404')
            })

        },

        loadCardInfo() {
            return new Promise((resolve, reject) => {
                getUserCardList(this.storedUserInfo.userId).then(response => {
                    this.cardList = response.data
                    resolve(response)
                }).catch(error => {
                    //console.log(error)
                    reject(error)
                })
            })
        },
        loadCard() {
            let cardIdList = []
            for (let card of this.cardList) {
                cardIdList.push(card.cardId)
                this.getCard(card.cardId)
            }
            console.log(this.cardInfoList)
        },
        getCard(cardId) {
            return new Promise((resolve, reject) => {
                getCardInfo(cardId).then(response => {
                    this.cardInfoList.push(response.data)
                    resolve(response)
                }).catch(error => {
                    //console.log(error)
                    reject(error)
                })
            })
        },

        formatDate(dateTimeString) {
            const date = new Date(dateTimeString);
            const year = date.getFullYear();
            const month = this.padZero(date.getMonth() + 1);
            const day = this.padZero(date.getDate());

            return `${year}-${month}-${day}`;
        },
        padZero(value) {
            return value < 10 ? `0${value}` : value;
        },

        formatCardNumber(cardNumber) {
            return String(cardNumber).replace(/(\d{4})(?=\d)/g, '$1 ')
        },

        handleCharge() {
            this.tracDialogVisible = true
            this.innerTracForm.tracType = 1
            this.tracTypeName = '充值'
        },

        handleWithdraw() {
            this.tracDialogVisible = true
            this.innerTracForm.tracType = 0
            this.tracTypeName = '提现'
        },

        handleInnerTracForm() {
            this.$refs.innerTracForm.validate((valid) => {
                if (valid) {
                    return new Promise((resolve, reject) => {
                        const { cardId, tracAmount, tracType, walletPwd, cardPwd } = this.innerTracForm
                        innerTransaction({ userId: this.storedUserInfo.userId, cardId: cardId, tracAmount: tracAmount, tracType: tracType, walletPwd: walletPwd, cardPwd: cardPwd }).then(response => {
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
                        }).catch(error => {
                            this.$message({
                                message: error,
                                type: 'error'
                            });
                        })
                    })
                } else {
                    console.log('error submit!!');
                    return false;
                }
            })
        },

        handleAddCard() {
            this.addDialogVisible = true
        },

        handleAddCardForm() {
            this.$refs.addCardInfoForm.validate((valid) => {
                if (valid) {
                    return new Promise((resolve, reject) => {
                        const { cardNumber, cardType, balance, pwd } = this.addCardInfoForm
                        addCard({ userID: this.storedUserInfo.userId, cardNumber: cardNumber, cardType: cardType, balance: balance, pwd: pwd }).then(response => {
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
                    console.log('error submit!!');
                    return false;
                }
            })
        },

        handleRemoveCard() {
            this.removeDialogVisible = true
        },

        handleRemoveCardForm() {
            this.$refs.removeCardInfoForm.validate((valid) => {
                if (valid) {
                    return new Promise((resolve, reject) => {
                        const cardId = this.removeCardInfoForm.cardId
                        removeCard({ userId: this.storedUserInfo.userId, cardId: cardId }).then(response => {
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
                    console.log('error submit!!');
                    return false;
                }
            })
        },

        handleBindCard() {
            this.bindDialogVisible = true
        },

        handleBindCardForm() {
            this.$refs.bindCardInfoForm.validate((valid) => {
                if (valid) {
                    return new Promise((resolve, reject) => {
                        const { cardId } = this.bindCardInfoForm
                        bindCard({userID: this.storedUserInfo.userId, cardId: cardId }).then(response => {
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
                    console.log('error submit!!');
                    return false;
                }
            })
        },
    }
}
</script>

<style scoped>
.bank-card {
    margin-top: 20px;
    padding: 9px;
    /* 调整卡片宽度 */
    max-width: 300px;
    /* 根据需要设置合适的宽度 */
    background: linear-gradient(to right bottom, #f5f7fa, #c3cfe2);
    border-radius: 10px;
}


.bank-card-header {
    font-size: 1.2em;
    font-weight: bold;
    text-align: center;
    color: #849ec9;
}

.bank-card-content {
    padding: 5px;
    /* 调整卡片宽度 */
    max-width: 300px;
    /* 根据需要设置合适的宽度 */
    margin: 0 auto;
    /* 居中显示 */
}

ul {
    list-style: none;
    padding: 0;
    margin: 0;
}

li {
    margin: 10px 10px;
}

.bank-card-content ul li span:nth-child(1) {
    display: inline-block;
    margin-right: 10px;
    font-weight: bold;
    color: #50545c
}

.bank-card-content ul li span:nth-child(2) {
    display: inline-block;
    color: #787e8a
}
</style>