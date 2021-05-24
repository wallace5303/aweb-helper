<template>
  <a-modal
    title="分享"
    :width="640"
    :visible="visible"
    :confirmLoading="loading"
    @ok="() => { $emit('ok') }"
    @cancel="() => { $emit('cancel') }"
  >
    <a-spin :spinning="loading">
      <a-form :form="form" v-bind="formLayout">
        <a-form-item>
          <a-input v-decorator="['id', { initialValue: 0 }]" type="hidden" />
        </a-form-item>
        <a-form-item
          label="名称"
        >
          <a-input v-decorator="['name', {rules:[{required: true, message: '请填写名称'}]}]" />
        </a-form-item>
        <a-form-item
          label="地址"
        >
          <a-input placeholder="如：http://wwwbaidu.com/" v-decorator="['url', {rules:[{required: true, message: '请正确填写地址'}]}]" />
        </a-form-item>
        <a-form-item
          label="描述"
        >
          <a-input placeholder="..." v-decorator="['desc', {initialValue: '', rules:[{required: true, message: '请正确填写描述'}]}]" />
        </a-form-item>
      </a-form>
    </a-spin>
  </a-modal>
</template>

<script>
import storage from 'store'
import { ACCESS_TOKEN } from '@/store/mutation-types'
import pick from 'lodash.pick'
import { outApi } from '@/api/main'

// 表单字段
const fields = ['id', 'name', 'url', 'desc']

export default {
  props: {
    visible: {
      type: Boolean,
      required: true
    },
    loading: {
      type: Boolean,
      default: () => false
    },
    model: {
      type: Object,
      default: () => null
    }
  },
  data () {
    this.formLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 7 }
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 13 }
      }
    }
    return {
      token: null,
      form: this.$form.createForm(this)
    }
  },
  created () {
    // 防止表单未注册
    fields.forEach(v => this.form.getFieldDecorator(v))

    // 当 model 发生改变时，为表单设置值
    this.$watch('model', () => {
      this.model && this.form.setFieldsValue(pick(this.model, fields))
    })
  },
  mounted () {
    // this.getToken()
    // this.getMyTypes()
  },
  methods: {
  }
}
</script>
