<template>
  <div class="loginMain">
    <h2 class="header">登录</h2>
    <el-form class="loginForm" :model="loginForm" :rules="loginRules" label-width="100px" ref="loginFrom" label-position="left">
      <el-form-item label="账户名称" prop="username">
        <el-input type="text" v-model="loginForm.username" auto-complete="off"></el-input>
      </el-form-item>
      <el-form-item label="账户密码" prop="password">
        <el-input type="password" @keyup.enter.native="handleLogin" v-model="loginForm.password" auto-complete="off"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" style="width:100%;" :loading="loading" @click.native.prevent="handleLogin">登录</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
import { isValidUserName } from '@/utils/validate'

export default {
  name: 'login',
  data () {
    // 自定义检验规则
    const valiDateUserName = (rule, value, callback) => {
      if (!isValidUserName(value)) {
        callback(new Error('请输入正确格式的账户'))
      } else {
        callback()
      }
    }
    const validatePass = (rule, value, callback) => {
      if (value.length < 6) {
        callback(new Error('密码不能小于6位'))
      } else {
        callback()
      }
    }

    return {
      loading: false,
      // 表单数据对象
      loginForm: {
        username: '',
        password: ''
      },
      // 表单验证规则
      loginRules: {
        username: [{ required: true, trigger: 'blur', validator: valiDateUserName }],
        password: [{ required: true, trigger: 'blur', validator: validatePass }]
      }
    }
  },
  methods: {
    ...mapActions(['Login']),
    handleLogin () {
      // element的from组件上的事件
      this.$refs.loginFrom.validate(valid => {
        if (valid) {
          this.loading = true
          this.Login(this.loginForm).then(() => {
            this.loading = false
            console.log('handleLogin 成功')
            this.$router.push({
              path: '/'
            })
          }).catch(() => {
            this.loading = false
          })
        } else {
          this.$message.error('请输入正确的账号和密码')
          return false
        }
      })
    }
  }
}
</script>

<style lang="scss">
.loginForm {
  .el-form-item__label {
    color: #fff;
    font-size: 18px;
  }
}
</style>

<style lang="scss" scoped>
$light_fff: #fff;

.header {
  color: #f56c6c;
  text-align: center;
  padding-top: 20px;
}
.loginMain {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: url(~images/loginBg.jpg) no-repeat;
  background-size: 100% 100%;
}
.loginForm {
  position: absolute;
  top: 20%;
  left: 50%;
  width: 520px;
  padding: 35px 35px 15px 35px;
  transform: translate(-50%, 50%);
  background-color: #024769;
  border-radius: 10px;
}
</style>
