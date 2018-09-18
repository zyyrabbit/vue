<template>
 <div class="wrap-content">
 	<div class="item-content">
	    <dx-heading :level="1">Form 表单</dx-heading>
	    <p>表单控件</p>
  </div>
  <div class="item-content">
	    <dx-heading :level="1">基本用法</dx-heading>
	    <p>可自定义输入验证规则</p>
	    <dx-show-code :htmlString="htmlString1" :scriptString="scriptString1">
	    	<dx-form 
          ref="loginForm" 
          :model="model" 
          :rules="rules" 
        >
          <div class="login-form__item--error-msg login-form__item">{{errorMsg}}</div>
          <div class="login-form__item">
            <dx-form-item  
              prop="userName"
            >
              <dx-input 
                v-model="model.userName" 
                placeholder="请输入用户名"
              >
                用户名
              </dx-input>
            </dx-form-item>
          </div>
          <div class="login-form__item">
            <dx-form-item prop="password">
              <dx-input 
                v-model="model.password"
                placeholder="请输入密码"
                originType="password"
              >
                密码
              </dx-input>
            </dx-form-item>
          </div>
          <div class="login-form__item">
            <dx-form-item prop="password1" showPwdLevel>
              <dx-input 
                v-model="model.password1"
                placeholder="请输入密码（具有密码强度）"
                originType="password"
              >
                密码
              </dx-input>
            </dx-form-item>
          </div>
          <div class="login-form__item">
            <dx-form-item>
              <dx-button 
                class="login-form__submit-btn"
                type="primary" 
                @dx-button-click="submit('loginForm')"
              >
                登录
              </dx-button>
            </dx-form-item>
          </div>
        </dx-form>
	    </dx-show-code>
  </div>
 </div>
</template>
<script>
  export default {
   data() {
    return {
      errorMsg: '',
      model: {
        userName: '',
        password: '',
        password1: '',
        isRememberMe: false
      },
      rules: {
        // 公共验证规则
        baseRule: [
          {name: 'required', message: '* 请输入账户名和密码！'}
        ],
        userName: [],
        password: [],
        password1: [
          { name: 'pwdLevelVerification', min: 6, message: '* 密码长度至少为6位' }
        ]
      }
    }
  },
  methods: {
    submit(formName) {
      this.$refs[formName].validate(async valid => {
        this.errorMsg = ''
        if (valid) {
          this.errorMsg = '登录成功'
        } else {
          this.errorMsg = '* 用户名或密码不能为空!'
          console.log('error submit!')
          return false
        }
      })
    }
  },
  created() {
    // 基本用法
        this.htmlString1 = `<template> 
                              <dx-form ref="loginForm" :model="model" :rules="rules">
                                <div class="login-form__item--error-msg login-form__item">{{errorMsg}}</div>
                                <div class="login-form__item">
                                  <dx-form-item  
                                    prop="userName"
                                  >
                                    <dx-input 
                                      v-model="model.userName" 
                                      placeholder="请输入用户名"
                                    >
                                      用户名
                                    </dx-input>
                                  </dx-form-item>
                                </div>
                                <div class="login-form__item">
                                  <dx-form-item prop="password">
                                    <dx-input 
                                      v-model="model.password"
                                      placeholder="请输入密码"
                                      originType="password"
                                    >
                                      密码
                                    </dx-input>
                                  </dx-form-item>
                                </div>
                                <div class="login-form__item">
                                  <dx-form-item prop="password1" showPwdLevel>
                                    <dx-input 
                                      v-model="model.password1"
                                      placeholder="请输入密码（具有密码强度）"
                                      originType="password"
                                    >
                                      密码
                                    </dx-input>
                                  </dx-form-item>
                                </div>
                                <div class="login-form__item">
                                  <dx-form-item>
                                    <dx-button 
                                      class="login-form__submit-btn"
                                      type="primary" 
                                      @dx-button-click="submit('loginForm')"
                                    >
                                      登录
                                    </dx-button>
                                  </dx-form-item>
                                </div>
                              </dx-form>
                            </template>`
        this.scriptString1 = `export default {
                   						  data() {
                                  return {
                                    errorMsg: '',
                                    model: {
                                      userName: '',
                                      password: '',
                                      password1: '',
                                      isRememberMe: false
                                    },
                                    rules: {
                                      // 公共验证规则
                                      baseRule: [
                                        {name: 'required', message: '* 请输入账户名和密码！'}
                                      ],
                                      userName: [],
                                      password: [
                                        { name: 'pwdLevelVerification', min: 6, message: '* 密码长度至少为6位' }
                                      ]
                                    }
                                  }
                                }
                              }`
         }
  }
</script>
<style>
  .login-form__item {
    width: 60%;
    margin-bottom:3rem;
  }
  .login-form__item--error-msg  {
    font-size: 1.4rem;
  }
  .login-form__submit-btn {
    width: 10rem;
  }
</style> 
