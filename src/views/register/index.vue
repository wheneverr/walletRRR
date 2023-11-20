<template>
  <div class="register-container">
    <el-form ref="registerForm" :model="registerForm" :rules="registerRules" class="register-form" auto-complete="on" label-position="left">
      <div class="title-container">
        <h3 class="title">用户注册</h3>
      </div>

      <div class="item-label">用户名</div>
      <el-form-item prop="username">
        <el-input
          ref="username"
          v-model="registerForm.username"
          name="username"
          type="text"
          tabindex="1"
          auto-complete="on"
        />
      </el-form-item>

      <div class="item-label">密码</div>
      <el-form-item prop="password">
        <el-input
          :key="passwordType"
          ref="password"
          v-model="registerForm.password"
          :type="passwordType"
          name="password"
          tabindex="2"
          auto-complete="on"
        />
        <span class="show-pwd" @click="showPwd">
          <svg-icon :icon-class="passwordType === 'password' ? 'eye' : 'eye-open'" />
        </span>
      </el-form-item>

      <div class="item-label">确认密码</div>
      <el-form-item prop="confirmpassword">
        <el-input
          :key="confirmPasswordType"
          ref="confirmpassword"
          v-model="registerForm.confirmpassword"
          :type="confirmPasswordType"
          name="confirmpassword"
          tabindex="3"
          auto-complete="on"
        />
        <span class="show-pwd" @click="showConfirmPwd">
          <svg-icon :icon-class="confirmPasswordType === 'password' ? 'eye' : 'eye-open'" />
        </span>
      </el-form-item>

      <div class="item-label">SSN</div>
      <el-form-item prop="ssn">
        <el-input
          ref="ssn"
          v-model="registerForm.ssn"
          name="ssn"
          type="text"
          tabindex="4"
          auto-complete="on"
        />
      </el-form-item>

      <div class="item-label">电子邮件</div>
      <el-form-item prop="email">
        <el-input
          ref="email"
          v-model="registerForm.email"
          name="email"
          type="text"
          tabindex="5"
          auto-complete="on"
        />
      </el-form-item>

      <div class="item-label">电话号码</div>
      <el-form-item prop="phone">
        <el-input
          ref="phone"
          v-model="registerForm.phone"
          name="phone"
          type="text"
          tabindex="6"
          auto-complete="on"
        />
      </el-form-item>

      <el-button :loading="loading" type="primary" style="width:100%;margin-bottom:30px;" @click.native.prevent="handleRegister">注册</el-button>
    </el-form>
  </div>
</template>

<script>

export default {
  name: 'Register',
  data() {
    const validateUsername = (rule, value, callback) => {
      if (!value.length) {
        callback(new Error('Please enter user name'))
      } else {
        callback()
      }
    }
    const validatePassword = (rule, value, callback) => {
      if (value.length < 6) {
        callback(new Error('The password can not be less than 6 digits'))
      } else {
        callback()
      }
    }
    const validateSsn = (rule, value, callback) => {
      if (!value.length) {
        callback(new Error('SSN can not be null'))
      } else {
        callback()
      }
    }
    const validateEmail = (rule, value, callback) => {
      if (!value.length) {
        callback(new Error('Email can not be null'))
      } else {
        callback()
      }
    }
    const validatePhone = (rule, value, callback) => {
      if (!value.length) {
        callback(new Error('Phone can not be null'))
      } else {
        callback()
      }
    }

    const validateConfirmpassword = (rule, value, callback) => {
      if (!value.length) {
        callback(new Error('Confirm password can not be null'))
      } else if(!this.passwordsMatch){
        callback(new Error('passwords not match'))
      }
      else {
        callback()
      }
    }
    return {
      registerForm: {
        username: '',
        password: '',
        confirmpassword: '',
        ssn: '',
        email: '',
        phone: ''
      },
      registerRules: {
        username: [{ required: true, trigger: 'blur', validator: validateUsername }],
        password: [{ required: true, trigger: 'blur', validator: validatePassword }],
        ssn: [{ required: true, trigger: 'blur', validator: validateSsn }],
        email: [{ required: true, trigger: 'blur', validator: validateEmail }],
        phone: [{ required: true, trigger: 'blur', validator: validatePhone }],
        confirmpassword: [{ required: true, trigger: 'blur', validator: validateConfirmpassword }]
      },
      loading: false,
      passwordType: 'password',
      confirmPasswordType: 'password',
      redirect: undefined
    }
  },
  computed:{
    passwordsMatch(){
      return this.registerForm.password === this.registerForm.confirmpassword
    }
  },
  watch: {
    $route: {
      handler: function(route) {
        this.redirect = route.query && route.query.redirect
      },
      immediate: true
    }
  },
  methods: {
    showPwd() {
      if (this.passwordType === 'password') {
        this.passwordType = ''
      } else {
        this.passwordType = 'password'
      }
      this.$nextTick(() => {
        this.$refs.password.focus()
      })
    },
    showConfirmPwd() {
      if (this.confirmPasswordType === 'password') {
        this.confirmPasswordType = ''
      } else {
        this.confirmPasswordType = 'password'
      }
      this.$nextTick(() => {
        this.$refs.confirmpassword.focus()
      })
    },
    handleRegister() {
      this.$refs.registerForm.validate(valid => {
        if (valid) {
          this.loading = true
          this.$store.dispatch('user/register', this.registerForm).then(res => {
            alert(res.message)
            this.$router.push({ path: this.redirect || '/login' })
            this.loading = false
          }).catch(() => {
            console.log('err1')
            this.loading = false
          })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    }
  }
}
</script>

<style lang="scss">
/* 修复input 背景不协调 和光标变色 */
/* Detail see https://github.com/PanJiaChen/vue-element-admin/pull/927 */

$bg:#283443;
$light_gray:#fff;
$cursor: #fff;

@supports (-webkit-mask: none) and (not (cater-color: $cursor)) {
  .register-container .el-input input {
    color: $cursor;
  }
}

/* reset element-ui css */
.register-container {
  .el-input {
    display: inline-block;
    height: 47px;
    width: 85%;

    input {
      background: transparent;
      border: 0px;
      -webkit-appearance: none;
      border-radius: 0px;
      padding: 12px 5px 12px 15px;
      color: $light_gray;
      height: 47px;
      caret-color: $cursor;

      &:-webkit-autofill {
        box-shadow: 0 0 0px 1000px $bg inset !important;
        -webkit-text-fill-color: $cursor !important;
      }
    }
  }

  .el-form-item {
    border: 1px solid rgba(255, 255, 255, 0.1);
    background: rgba(0, 0, 0, 0.1);
    border-radius: 5px;
    color: #454545;
  }

  .item-label{
    color: #fff;
    margin: 8px 10px;
  }
}
</style>

<style lang="scss" scoped>
$bg:#2d3a4b;
$dark_gray:#889aa4;
$light_gray:#eee;

.register-container {
  min-height: 100%;
  width: 100%;
  background-color: $bg;
  overflow: hidden;

  .register-form {
    position: relative;
    width: 520px;
    max-width: 100%;
    padding: 160px 35px 0;
    margin: 0 auto;
    overflow: hidden;
  }

  .tips {
    font-size: 14px;
    color: #fff;
    margin-bottom: 10px;

    span {
      &:first-of-type {
        margin-right: 16px;
      }
    }
  }

  .svg-container {
    padding: 6px 5px 6px 15px;
    color: $dark_gray;
    vertical-align: middle;
    width: 30px;
    display: inline-block;
  }

  .radio-container {
    padding: 6px 5px 6px 15px;
  }

  .title-container {
    position: relative;

    .title {
      font-size: 26px;
      color: $light_gray;
      margin: 0px auto 40px auto;
      text-align: center;
      font-weight: bold;
    }
  }

  .show-pwd {
    position: absolute;
    right: 10px;
    top: 7px;
    font-size: 16px;
    color: $dark_gray;
    cursor: pointer;
    user-select: none;
  }
}
</style>
