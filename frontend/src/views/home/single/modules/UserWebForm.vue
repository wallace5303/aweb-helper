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
          label="类型"
        >
          <a-row :gutter="8">
            <a-col :span="12">
              <a-select v-decorator="['type', { initialValue: firstOption }]">
                <a-select-option :key="index" v-for="(item, index) in myTypes" :value="item.uwtid">{{ item.name }}</a-select-option>
              </a-select>
            </a-col>
            <a-col :span="12">
              <router-link :to="{ name: 'homeManageWebType', params: { category: this.category } }">
                <a-button>添加</a-button>
              </router-link>
            </a-col>
          </a-row>
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
          label="排序"
        >
          <a-input-number v-decorator="['sort', {initialValue: 0, rules:[{required: false, message: '请填写数字'}]}]" />
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
const fields = ['id', 'type', 'name', 'url', 'sort']

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
    },
    category: {
      type: String,
      required: true
    },
    pMyTypes: {
      type: Array,
      required: true,
      default: () => []
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
      form: this.$form.createForm(this),
      myTypes: [],
      firstOption: 0
    }
  },
  created () {
    // console.log('webSaveForm modal created')

    // 防止表单未注册
    fields.forEach(v => this.form.getFieldDecorator(v))

    // 当 model 发生改变时，为表单设置值
    this.$watch('model', () => {
      this.model && this.form.setFieldsValue(pick(this.model, fields))
      this.myTypes = this.pMyTypes
      if (this.myTypes.length > 0) {
        this.firstOption = this.myTypes[0].uwtid
      }
      // console.log('firstOption:', this.firstOption)
    })
  },
  mounted () {
    // this.getToken()
    // this.getMyTypes()
  },
  methods: {
    // getToken () {
    //   this.token = storage.get(ACCESS_TOKEN)
    // },
    // getMyTypes () {
    //   if (!this.token) {
    //     return false
    //   }
    //   const params = {
    //     out_url: 'myTypes',
    //     method: 'POST',
    //     data: {
    //       category: this.category
    //     }
    //   }
    //   outApi(params).then(res => {
    //     if (res.code !== 0) {
    //       return false
    //     }
    //     this.myTypes = res.data
    //     if (this.myTypes.length > 0) {
    //       this.firstOption = this.myTypes[0].uwtid
    //     }
    //   }).catch(err => {
    //     console.log('err:', err)
    //   })
    // }
  }
}
</script>
