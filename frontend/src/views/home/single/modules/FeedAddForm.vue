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
        <!-- <a-form-item>
          <a-input v-decorator="['id', { initialValue: 0 }]" type="hidden" />
        </a-form-item> -->
        <a-form-item
          label="标题"
        >
          <a-input v-decorator="['title', {rules:[{required: true, message: '请填写标题'}]}]" />
        </a-form-item>
        <a-form-item
          label="链接地址"
        >
          <a-input placeholder="如：https://wwwbaidu.com/" v-decorator="['url', {rules:[{required: true, message: '请填写url链接地址'}]}]" />
        </a-form-item>
        <a-form-item
          label="内容"
        >
          <a-textarea placeholder="" v-decorator="['content', {rules:[{required: true, message: '请填写内容'}]}]" :auto-size="{ minRows: 3, maxRows: 5 }" />
        </a-form-item>
        <a-form-item
          label="图片地址"
        >
          <a-input placeholder="如：http://wx3.sinaimg.cn/large/005WJhQlly1gj5cfxj8r6j30f409cq45.jpg" v-decorator="['pic', {rules:[{required: false, message: ''}]}]" />
        </a-form-item>
        <a-form-item
          label="原文链接"
        >
          <a-input placeholder="" v-decorator="['link', {rules:[{required: false, message: '请正确填写地址'}]}]" />
        </a-form-item>
      </a-form>
    </a-spin>
  </a-modal>
</template>

<script>
import pick from 'lodash.pick'

// 表单字段
const fields = ['title', 'content', 'url', 'link', 'pic']

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
    // this.$nextTick(() => {
    //         this.form.setFieldsValue({
    //           streamName: 'streamName',
    //         })});
    this.$watch('model', () => {
      this.model && this.form.setFieldsValue(pick(this.model, fields))
    })
  }
}
</script>
