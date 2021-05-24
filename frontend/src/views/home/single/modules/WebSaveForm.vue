<template>
  <a-modal
    title="添加"
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
          label="类型"
        >
          <a-select v-decorator="['type', {initialValue:1}]">
            <a-select-option :value="1">常用</a-select-option>
            <a-select-option :value="2">专业</a-select-option>
            <a-select-option :value="3">娱乐</a-select-option>
            <a-select-option :value="4">游戏</a-select-option>
            <a-select-option :value="5">阅读</a-select-option>
            <a-select-option :value="6">旅行</a-select-option>
            <a-select-option :value="7">交友</a-select-option>
            <a-select-option :value="8">其它</a-select-option>
          </a-select>
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
      </a-form>
    </a-spin>
  </a-modal>
</template>

<script>
import pick from 'lodash.pick'

// 表单字段
const fields = ['id', 'type', 'name', 'url']

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
      form: this.$form.createForm(this)
    }
  },
  created () {
    // console.log('webSaveForm modal created')

    // 防止表单未注册
    fields.forEach(v => this.form.getFieldDecorator(v))

    // 当 model 发生改变时，为表单设置值
    this.$watch('model', () => {
      this.model && this.form.setFieldsValue(pick(this.model, fields))
    })
  }
}
</script>
