<template>
  <div>
    <el-card class="container">
      <div slot="header" class="clearfix">
        <span>个人资料</span>
      </div>
      
      <el-form label-position="left" label-width="120px" style="padding-left: 12%;">
          <el-form-item label="用户名">
            <span>{{ userInfo.name }}</span>
          </el-form-item>
          <el-form-item label="账号">
            <span>{{ userInfo.account }}</span>
          </el-form-item>
          <el-form-item label="SSN">
            <span>{{ userInfo.SSN }}</span>
          </el-form-item>
          <el-form-item label="电话">
            <span>{{ userInfo.phone }}</span>
          </el-form-item>
          <el-form-item label="电子邮箱">
            <span>{{ userInfo.email }}</span>
          </el-form-item>
          <el-form-item label="钱包余额">
            <span>{{ userInfo.walletBalance }}</span>
          </el-form-item>
          <el-button @click="dialogFormVisible = true">修改资料</el-button> 
        </el-form>
      

      <el-dialog title="修改信息" :visible.sync="dialogFormVisible">
        <el-form :model="updataUserForm" label-width="120px">
          <el-form-item label="用户名">
            <el-input v-model="updataUserForm.name"></el-input>
          </el-form-item>
          <el-form-item label="SSN">
            <el-input v-model="updataUserForm.SSN"></el-input>
          </el-form-item>
          <el-form-item label="电话">
            <el-input v-model="updataUserForm.phone"></el-input>
          </el-form-item>
          <el-form-item label="电子邮箱">
            <el-input v-model="updataUserForm.email"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible = false">取 消</el-button>
          <el-button type="primary" @click="dialogFormVisible = false">确 定</el-button>
        </div>
      </el-dialog>
    </el-card>
  </div>
</template>

<script>
export default {
  name: "Home",
  data() {
    return {
      userInfo:{
        name: 'admin',
        account: 'admin123',
        SSN: '32012102',
        phone: '88888888',
        email: '1024512@binary.com',
        walletBalance: 1500,
      },
      updataUserForm:{
        name: '',
        SSN: '',
        phone: '',
        email: '',
      },
      dialogFormVisible: false,
    };
  },
  mounted() {
    this.load();
  },
  methods: {
    load() {
      // userInfo(this.$route.params.id)
      //   .then((res) => {
      //     this.avatar = res.data.avatar;
      //     this.account = res.data.account;
      //     this.age = res.data.age;
      //     this.email = res.data.email;
      //     this.mobilePhoneNumber = res.data.mobilePhoneNumber;
      //     this.area = res.data.area;
      //     this.createDate = res.data.createDate;
      //     this.nickname = res.data.nickname;
      //     this.sex = res.data.sex == 1 ? "男" : "女";
      //     this.work = res.data.work;
      //     this.design = res.data.design;
      //     this.hobby = res.data.hobby;
      //   })
      //   .catch((err) => {
      //     console.log(err);
      //   });
    },
  },
};
</script>

<style lang="scss" scoped>
.container{
  height: 95vh;
}

</style>
<!-- <template>
  <div>
    <el-card>
      <el-descriptions class="margin-top" title="简介" :column="2" border>
        <template slot="extra">
          <el-button type="primary" v-if="$route.params.id==$store.state.id" size="small">操作</el-button>
        </template>
        <el-descriptions-item>
          <template slot="label">
            <i class="el-icon-picture-outline"></i>
            头像
          </template>
          <img class="img" :src="avatar" alt="" />
        </el-descriptions-item>
        <el-descriptions-item>
          <template slot="label">
            <i class="el-icon-user"></i>
            账户名
          </template>
          {{ account }}
        </el-descriptions-item>
        <el-descriptions-item>
          <template slot="label">
            <i class="el-icon-s-custom"></i>
            昵称
          </template>
          {{ nickname }}
        </el-descriptions-item>
        <el-descriptions-item>
          <template slot="label">
            <i class="el-icon-odometer"></i>
            年龄
          </template>
          {{ age }}
        </el-descriptions-item>
        <el-descriptions-item>
          <template slot="label">
            <i class="el-icon-male"></i>
            <i class="el-icon-female"></i>
            性别
          </template>
          <el-tag size="small">{{ sex }}</el-tag>
        </el-descriptions-item>
        <el-descriptions-item>
          <template slot="label">
            <i class="el-icon-message"></i>
            邮箱Email
          </template>
          {{ email }}
        </el-descriptions-item>
        <el-descriptions-item>
          <template slot="label">
            <i class="el-icon-mobile-phone"></i>
            手机号码
          </template>
          {{ mobilePhoneNumber }}
        </el-descriptions-item>
        <el-descriptions-item>
          <template slot="label">
            <i class="el-icon-location-outline"></i>
            地区
          </template>
          {{ area }}
        </el-descriptions-item>
        <el-descriptions-item>
          <template slot="label">
            <i class="el-icon-office-building"></i>
            职业
          </template>
          {{ work }}
        </el-descriptions-item>

        <el-descriptions-item>
          <template slot="label">
            <i class="el-icon-basketball"></i>
            兴趣爱好
          </template>
          {{ hobby }}
        </el-descriptions-item>
        <el-descriptions-item>
          <template slot="label">
            <i class="el-icon-magic-stick"></i>
            个性签名
          </template>
          {{ design }}
        </el-descriptions-item>
        <el-descriptions-item>
          <template slot="label">
            <i class="el-icon-date"></i>
            注册日期
          </template>
          {{ createDate | formatDate }}
        </el-descriptions-item>
      </el-descriptions>
    </el-card>
  </div>
</template>

<script>
import { userInfo } from "@/api/user.js";
export default {
  name: "Info",
  data() {
    return {
      avatar: String,
      account: String,
      age: Number,
      email: String,
      mobilePhoneNumber: String,
      area: String,
      createDate: Number,
      nickname: String,
      sex: String,
      work: String,
      hobby: String,
      design: String,
    };
  },
  mounted() {
    this.load();
  },
  methods: {
    load() {
      userInfo(this.$route.params.id)
        .then((res) => {
          this.avatar = res.data.avatar;
          this.account = res.data.account;
          this.age = res.data.age;
          this.email = res.data.email;
          this.mobilePhoneNumber = res.data.mobilePhoneNumber;
          this.area = res.data.area;
          this.createDate = res.data.createDate;
          this.nickname = res.data.nickname;
          this.sex = res.data.sex == 1 ? "男" : "女";
          this.work = res.data.work;
          this.design = res.data.design;
          this.hobby = res.data.hobby;
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
};
</script>

<style scoped>
.img {
  width: 80px;
  height: 80px;
}
</style>
 -->