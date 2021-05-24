<template>
  <a-modal
    title="编辑"
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
          label="类型名称"
        >
          <a-input v-decorator="['name', {rules:[{required: true, message: '请填写名称'}]}]" />
        </a-form-item>
        <a-form-item
          label="排序"
        >
          <a-input-number v-decorator="['sort', { initialValue: 0, rules:[{required: false, message: '请填写数字'}]}]" />
        </a-form-item>
      </a-form>
    </a-spin>
  </a-modal>
</template>

<script>
import pick from 'lodash.pick'

// 表单字段
const fields = ['id', 'name', 'sort']

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
  },
  mounted () {
    // this.getToken()
  },
  methods: {
    // getToken () {
    //   this.token = storage.get(ACCESS_TOKEN)
    // }
  }
}
</script>
