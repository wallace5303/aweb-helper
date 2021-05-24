<template>
  <div class="account-settings-info-view">
    <a-row :gutter="16">
      <a-col :md="24" :lg="16">

        <a-form :form="form" layout="vertical" @submit="handleSubmit">
          <a-form-item>
            <a-input v-decorator="['uid', { initialValue: 0 }]" type="hidden" />
          </a-form-item>
          <a-form-item
            label="用户名"
          >
            <a-input v-decorator="['username', {rules:[{ required: true, message: '请填写用户名' }, { min: 4, message: '不能小于4个字符' }]}]" />
          </a-form-item>
          <a-form-item
            label="电子邮件"
          >
            <a-input v-decorator="['email', {rules: [{ required: true, type: 'email', message: '请输入邮箱地址' }], validateTrigger: ['change', 'blur']}]" />
          </a-form-item>
          <a-form-item
            label="手机号"
          >
            <a-input v-decorator="['phone']" />
          </a-form-item>
          <a-form-item
            label="登录密码"
          >
            <a-input type="password" v-decorator="['password', {rules:[{required: true, message: '请填写密码'}, { min: 6, message: '密码不能少于6个字符' }]}]" />
          </a-form-item>
          <a-form-item
            label="确认密码"
          >
            <a-input type="password" v-decorator="['password2', {rules:[{required: true, message: '请确认密码'}, { min: 6, message: '密码不能少于6个字符' }]}]" />
          </a-form-item>

          <a-form-item>
            <a-button type="primary" html-type="submit">提交</a-button>
          </a-form-item>
        </a-form>

      </a-col>
      <!-- <a-col :md="24" :lg="8" :style="{ minHeight: '180px' }">
        <div class="ant-upload-preview" @click="$refs.modal.edit(1)" >
          <a-icon type="cloud-upload-o" class="upload-icon"/>
          <div class="mask">
            <a-icon type="plus" />
          </div>
          <img :src="option.img"/>
        </div>
      </a-col> -->

    </a-row>

    <!-- <avatar-modal ref="modal" @ok="setavatar"/> -->

  </div>
</template>

<script>
import storage from 'store'
import { ACCESS_TOKEN } from '@/store/mutation-types'
import pick from 'lodash.pick'
import AvatarModal from './AvatarModal'
import { outApi } from '@/api/main'
import { forEach } from 'store/storages/all'

// 表单字段
const fields = ['uid', 'username', 'email', 'phone', 'passwrod', 'passwrod2']

export default {
  components: {
    AvatarModal
  },
  data () {
    return {
      token: null,
      // cropper
      preview: {},
      option: {
        img: '/avatar.jpg',
        info: true,
        size: 1,
        outputType: 'jpeg',
        canScale: false,
        autoCrop: true,
        // 只有自动截图开启 宽度高度才生效
        autoCropWidth: 180,
        autoCropHeight: 180,
        fixedBox: true,
        // 开启宽度和高度比例
        fixed: true,
        fixedNumber: [1, 1]
      },
      userinfo: {},
      confirmLoading: false,
      form: this.$form.createForm(this)
    }
  },
  created () {
    // 防止表单未注册
    fields.forEach(v => this.form.getFieldDecorator(v))

    // 当 userinfo 发生改变时，为表单设置值
    this.$watch('userinfo', () => {
      this.userinfo && this.form.setFieldsValue(pick(this.userinfo, fields))
    })
  },
  mounted () {
    this.getToken()
    this.getUserInfo()
  },
  methods: {
    getToken () {
      this.token = storage.get(ACCESS_TOKEN)
    },
    setavatar (url) {
      this.option.img = url
    },
    getUserInfo () {
      if (!this.token) {
        // this.$message.error('请登录')
        this.$notification.error({
          message: 'Forbidden',
          description: '请登录'
        })
        return false
      }
      const params = {
        out_url: 'userinfo',
        method: 'POST',
        data: {}
      }
      outApi(params).then(res => {
        if (res.code !== 0) {
          return false
        }
        this.userinfo = res.data
      }).catch(err => {
        console.log('err:', err)
      })
    },
    handleSubmit (e) {
      e.preventDefault()
      if (!this.token) {
        this.$message.error('请登录')
        return false
      }
      this.form.validateFields((errors, values) => {
        console.log('user values:', values)
        if (!errors) {
          if (values.password !== values.password2) {
            this.$message.error('请检查两次输入的密码')
            return false
          }
          const params = {
            out_url: 'saveUser',
            method: 'POST',
            data: {
              username: values.username,
              email: values.email,
              phone: values.phone,
              password: values.password
            }
          }
          outApi(params).then(res => {
            if (res.code !== 0) {
              this.$message.error(res.message)
              return false
            }
            this.getUserInfo()
          }).catch(err => {
            console.log('err:', err)
          })
        } else {
          console.log('errors:', errors)
          // for (const key in errors) {
          //   console.log('key:', key)
          //   for (let i = 0; i < key.errors.length; i++) {
          //     const one = key.errors[i]
          //     this.$message.error(one['message'])
          //   }
          // }
          // this.confirmLoading = false
        }
      })
    }
  }
}
</script>

<style lang="less" scoped>

  .avatar-upload-wrapper {
    height: 200px;
    width: 100%;
  }

  .ant-upload-preview {
    position: relative;
    margin: 0 auto;
    width: 100%;
    max-width: 180px;
    border-radius: 50%;
    box-shadow: 0 0 4px #ccc;

    .upload-icon {
      position: absolute;
      top: 0;
      right: 10px;
      font-size: 1.4rem;
      padding: 0.5rem;
      background: rgba(222, 221, 221, 0.7);
      border-radius: 50%;
      border: 1px solid rgba(0, 0, 0, 0.2);
    }
    .mask {
      opacity: 0;
      position: absolute;
      background: rgba(0,0,0,0.4);
      cursor: pointer;
      transition: opacity 0.4s;

      &:hover {
        opacity: 1;
      }

      i {
        font-size: 2rem;
        position: absolute;
        top: 50%;
        left: 50%;
        margin-left: -1rem;
        margin-top: -1rem;
        color: #d6d6d6;
      }
    }

    img, .mask {
      width: 100%;
      max-width: 180px;
      height: 100%;
      border-radius: 50%;
      overflow: hidden;
    }
  }
</style>
