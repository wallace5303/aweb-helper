(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-8227e28c"],{"0189":function(e,t,a){"use strict";a.r(t);var n=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",[a("standard-form-row",{staticStyle:{"padding-bottom":"11px"},attrs:{title:"",block:""}},[a("a-radio-group",{staticStyle:{"margin-right":"10px"},on:{change:function(t){return e.handleChangeType(e.module)}},model:{value:e.module,callback:function(t){e.module=t},expression:"module"}},[a("a-radio-button",{attrs:{value:"new"}},[e._v("最新")]),a("a-radio-button",{attrs:{value:"recommend"}},[e._v("推荐")]),a("a-radio-button",{attrs:{value:"collection"}},[e._v("收藏最多")])],1),a("a-input-search",{staticStyle:{width:"272px"},attrs:{placeholder:"强大的搜索功能"},on:{change:function(t){return e.resetDefault(e.searchContent)},search:e.handleSearch},model:{value:e.searchContent,callback:function(t){e.searchContent=t},expression:"searchContent"}},[a("a-button",{attrs:{slot:"enterButton"},slot:"enterButton"},[e._v(" 搜索 ")])],1)],1),a("a-card",{staticStyle:{"margin-top":"0px"},attrs:{bordered:!0,title:""}},[a("div",{staticClass:"operate"},[a("a-button",{staticStyle:{width:"100%"},attrs:{type:"dashed",icon:"plus"},on:{click:e.handleShare}},[e._v("分享")])],1),a("a-list",{attrs:{loading:e.loading,size:"large"}},[e._l(e.webList,(function(t,n){return a("a-list-item",{key:n,staticStyle:{"padding-top":"10px","padding-bottom":"10px"}},[a("a-list-item-meta",{attrs:{description:t.desc}},[t.img?a("a-avatar",{attrs:{slot:"avatar",size:"default",shape:"square",src:t.img},slot:"avatar"}):a("a-avatar",{style:t.style||"color: #fff;backgroundColor:#2BA245;",attrs:{slot:"avatar",size:"default",shape:"square",src:t.img},slot:"avatar"},[e._v(" "+e._s(t.name.substr(0,1))+" ")]),a("a",{attrs:{slot:"title",href:t.url,target:"_blank"},slot:"title"},[e._v(e._s(t.name))])],1),a("div",{staticClass:"list-times"},[a("div",{staticClass:"list-content-item"},[a("a-icon",{staticStyle:{"margin-right":"8px"},attrs:{type:"star-o"}}),a("span",[e._v(e._s(t.col_times))])],1)]),a("div",{staticClass:"list-view"},[a("a",{on:{click:function(a){return e.handleEdit(t)}}},[e._v("添加")])])],1)})),a("span"),e.pageInfo.next_page_url?a("div",{staticStyle:{"text-align":"center","margin-top":"1px"},attrs:{slot:"footer"},slot:"footer"},[a("a-button",{attrs:{loading:e.loadingMore},on:{click:e.loadMore}},[e._v("加载更多")])],1):e._e()],2),a("user-web-form",{ref:"webSaveModal",attrs:{visible:e.visible,loading:e.confirmLoading,model:e.mdl,category:e.category,pMyTypes:e.myTypes},on:{cancel:e.handleCancel,ok:e.handleOk}}),a("all-web-form",{ref:"allWebModal",attrs:{visible:e.allWebVisible,loading:e.allWebConfirmLoading,model:e.allWebMdl},on:{cancel:e.allWebHandleCancel,ok:e.allWebHandleOk}})],1)],1)},r=[],i=(a("99af"),a("b0c0"),a("d3b7"),a("8ded")),o=a.n(i),l=a("9fb0"),s=a("d0eb"),c=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("a-modal",{attrs:{title:"分享",width:640,visible:e.visible,confirmLoading:e.loading},on:{ok:function(){e.$emit("ok")},cancel:function(){e.$emit("cancel")}}},[a("a-spin",{attrs:{spinning:e.loading}},[a("a-form",e._b({attrs:{form:e.form}},"a-form",e.formLayout,!1),[a("a-form-item",[a("a-input",{directives:[{name:"decorator",rawName:"v-decorator",value:["id",{initialValue:0}],expression:"['id', { initialValue: 0 }]"}],attrs:{type:"hidden"}})],1),a("a-form-item",{attrs:{label:"名称"}},[a("a-input",{directives:[{name:"decorator",rawName:"v-decorator",value:["name",{rules:[{required:!0,message:"请填写名称"}]}],expression:"['name', {rules:[{required: true, message: '请填写名称'}]}]"}]})],1),a("a-form-item",{attrs:{label:"地址"}},[a("a-input",{directives:[{name:"decorator",rawName:"v-decorator",value:["url",{rules:[{required:!0,message:"请正确填写地址"}]}],expression:"['url', {rules:[{required: true, message: '请正确填写地址'}]}]"}],attrs:{placeholder:"如：http://wwwbaidu.com/"}})],1),a("a-form-item",{attrs:{label:"描述"}},[a("a-input",{directives:[{name:"decorator",rawName:"v-decorator",value:["desc",{initialValue:"",rules:[{required:!0,message:"请正确填写描述"}]}],expression:"['desc', {initialValue: '', rules:[{required: true, message: '请正确填写描述'}]}]"}],attrs:{placeholder:"..."}})],1)],1)],1)],1)},u=[],d=(a("4160"),a("88bc")),m=a.n(d),f=a("a358"),p=["id","name","url","desc"],h={props:{visible:{type:Boolean,required:!0},loading:{type:Boolean,default:function(){return!1}},model:{type:Object,default:function(){return null}}},data:function(){return this.formLayout={labelCol:{xs:{span:24},sm:{span:7}},wrapperCol:{xs:{span:24},sm:{span:13}}},{token:null,form:this.$form.createForm(this)}},created:function(){var e=this;p.forEach((function(t){return e.form.getFieldDecorator(t)})),this.$watch("model",(function(){e.model&&e.form.setFieldsValue(m()(e.model,p))}))},mounted:function(){},methods:{}},b=h,g=a("2877"),v=Object(g["a"])(b,c,u,!1,null,null,null),y=v.exports,w=a("2af9"),_={name:"StandardList",components:{UserWebForm:s["a"],AllWebForm:y,StandardFormRow:w["b"]},data:function(){return{token:null,category:"1",webList:[],pageInfo:{},myTypes:[],loading:!1,loadingMore:!1,page:1,type2:0,module:"new",desc:"",visible:!1,confirmLoading:!1,allWebVisible:!1,allWebConfirmLoading:!1,mdl:null,allWebMdl:null,searchContent:""}},mounted:function(){this.getToken(),this.getWebFind(),this.getMyTypes()},methods:{getToken:function(){this.token=o.a.get(l["a"])},handleSearch:function(e){this.page=1,this.desc=e,this.module="new",this.getWebFind("reset")},handleChangeType:function(e){this.module=e,this.page=1,this.desc="",this.getWebFind("reset")},handleEdit:function(e){if(!this.token)return this.$message.error("请登录"),!1;this.visible=!0,this.mdl={id:e.wsid,name:e.name,url:e.url}},handleShare:function(){if(!this.token)return this.$message.error("请登录"),!1;this.allWebVisible=!0,this.allWebMdl={id:0,name:"",url:"",desc:""}},resetDefault:function(e){""===e&&this.handleChangeType("new")},getWebFind:function(e){var t=this;this.loading=!0;var a={out_url:"webFind",method:"POST",data:{module:this.module,desc:this.desc,page:this.page}};Object(f["a"])(a).then((function(a){if(0!==a.code)return!1;t.pageInfo=a.data.list,t.webList=e?t.pageInfo.data:t.webList.concat(t.pageInfo.data)})).catch((function(e){})).finally((function(){t.loading=!1,t.loadingMore=!1}))},loadMore:function(){this.loadingMore=!0,this.page+=1,this.getWebFind()},getMyTypes:function(){var e=this;if(!this.token)return!1;var t={out_url:"myTypes",method:"POST",data:{category:this.category}};Object(f["a"])(t).then((function(t){if(0!==t.code)return!1;e.myTypes=t.data})).catch((function(e){}))},handleCancel:function(){this.visible=!1,this.confirmLoading=!1;this.$refs.webSaveModal.form},handleOk:function(){var e=this,t=this.$refs.webSaveModal.form;this.confirmLoading=!0,t.validateFields((function(t,a){if(t)e.confirmLoading=!1;else{var n={out_url:"saveMySite",method:"POST",data:{category:e.category,wsid:a.id,type:a.type,name:a.name,url:a.url,sort:0}};Object(f["a"])(n).then((function(t){e.confirmLoading=!1,0===t.code?(e.visible=!1,e.$message.info("添加成功")):e.$message.info("添加失败")})).catch((function(e){}))}}))},allWebHandleCancel:function(){this.allWebVisible=!1,this.allWebConfirmLoading=!1;this.$refs.allWebModal.form},allWebHandleOk:function(){var e=this,t=this.$refs.allWebModal.form;this.allWebConfirmLoading=!0,t.validateFields((function(t,a){if(!t){var n={out_url:"saveAllWeb",method:"POST",data:{name:a.name,url:a.url,desc:a.desc}};Object(f["a"])(n).then((function(t){0===t.code?(e.$message.info("添加成功"),e.handleChangeType("new")):e.$message.info("添加失败")})).catch((function(e){})).finally((function(){e.allWebVisible=!1,e.allWebConfirmLoading=!1}))}}))}}},k=_,x=(a("0b00"),Object(g["a"])(k,n,r,!1,null,"06c69482",null));t["default"]=x.exports},"0b00":function(e,t,a){"use strict";var n=a("bbfc"),r=a.n(n);r.a},"88bc":function(e,t,a){(function(t){var a=1/0,n=9007199254740991,r="[object Arguments]",i="[object Function]",o="[object GeneratorFunction]",l="[object Symbol]",s="object"==typeof t&&t&&t.Object===Object&&t,c="object"==typeof self&&self&&self.Object===Object&&self,u=s||c||Function("return this")();function d(e,t,a){switch(a.length){case 0:return e.call(t);case 1:return e.call(t,a[0]);case 2:return e.call(t,a[0],a[1]);case 3:return e.call(t,a[0],a[1],a[2])}return e.apply(t,a)}function m(e,t){var a=-1,n=e?e.length:0,r=Array(n);while(++a<n)r[a]=t(e[a],a,e);return r}function f(e,t){var a=-1,n=t.length,r=e.length;while(++a<n)e[r+a]=t[a];return e}var p=Object.prototype,h=p.hasOwnProperty,b=p.toString,g=u.Symbol,v=p.propertyIsEnumerable,y=g?g.isConcatSpreadable:void 0,w=Math.max;function _(e,t,a,n,r){var i=-1,o=e.length;a||(a=C),r||(r=[]);while(++i<o){var l=e[i];t>0&&a(l)?t>1?_(l,t-1,a,n,r):f(r,l):n||(r[r.length]=l)}return r}function k(e,t){return e=Object(e),x(e,t,(function(t,a){return a in e}))}function x(e,t,a){var n=-1,r=t.length,i={};while(++n<r){var o=t[n],l=e[o];a(l,o)&&(i[o]=l)}return i}function W(e,t){return t=w(void 0===t?e.length-1:t,0),function(){var a=arguments,n=-1,r=w(a.length-t,0),i=Array(r);while(++n<r)i[n]=a[t+n];n=-1;var o=Array(t+1);while(++n<t)o[n]=a[n];return o[t]=i,d(e,this,o)}}function C(e){return T(e)||S(e)||!!(y&&e&&e[y])}function O(e){if("string"==typeof e||V(e))return e;var t=e+"";return"0"==t&&1/e==-a?"-0":t}function S(e){return L(e)&&h.call(e,"callee")&&(!v.call(e,"callee")||b.call(e)==r)}var T=Array.isArray;function j(e){return null!=e&&$(e.length)&&!M(e)}function L(e){return q(e)&&j(e)}function M(e){var t=F(e)?b.call(e):"";return t==i||t==o}function $(e){return"number"==typeof e&&e>-1&&e%1==0&&e<=n}function F(e){var t=typeof e;return!!e&&("object"==t||"function"==t)}function q(e){return!!e&&"object"==typeof e}function V(e){return"symbol"==typeof e||q(e)&&b.call(e)==l}var A=W((function(e,t){return null==e?{}:k(e,m(_(t,1),O))}));e.exports=A}).call(this,a("c8ba"))},bbfc:function(e,t,a){},d0eb:function(e,t,a){"use strict";var n=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("a-modal",{attrs:{title:"编辑",width:640,visible:e.visible,confirmLoading:e.loading},on:{ok:function(){e.$emit("ok")},cancel:function(){e.$emit("cancel")}}},[a("a-spin",{attrs:{spinning:e.loading}},[a("a-form",e._b({attrs:{form:e.form}},"a-form",e.formLayout,!1),[a("a-form-item",[a("a-input",{directives:[{name:"decorator",rawName:"v-decorator",value:["id",{initialValue:0}],expression:"['id', { initialValue: 0 }]"}],attrs:{type:"hidden"}})],1),a("a-form-item",{attrs:{label:"类型"}},[a("a-row",{attrs:{gutter:8}},[a("a-col",{attrs:{span:12}},[a("a-select",{directives:[{name:"decorator",rawName:"v-decorator",value:["type",{initialValue:e.firstOption}],expression:"['type', { initialValue: firstOption }]"}]},e._l(e.myTypes,(function(t,n){return a("a-select-option",{key:n,attrs:{value:t.uwtid}},[e._v(e._s(t.name))])})),1)],1),a("a-col",{attrs:{span:12}},[a("router-link",{attrs:{to:{name:"manageWebType",params:{category:this.category}}}},[a("a-button",[e._v("添加")])],1)],1)],1)],1),a("a-form-item",{attrs:{label:"名称"}},[a("a-input",{directives:[{name:"decorator",rawName:"v-decorator",value:["name",{rules:[{required:!0,message:"请填写名称"}]}],expression:"['name', {rules:[{required: true, message: '请填写名称'}]}]"}]})],1),a("a-form-item",{attrs:{label:"地址"}},[a("a-input",{directives:[{name:"decorator",rawName:"v-decorator",value:["url",{rules:[{required:!0,message:"请正确填写地址"}]}],expression:"['url', {rules:[{required: true, message: '请正确填写地址'}]}]"}],attrs:{placeholder:"如：http://wwwbaidu.com/"}})],1),a("a-form-item",{attrs:{label:"排序"}},[a("a-input-number",{directives:[{name:"decorator",rawName:"v-decorator",value:["sort",{initialValue:0,rules:[{required:!1,message:"请填写数字"}]}],expression:"['sort', {initialValue: 0, rules:[{required: false, message: '请填写数字'}]}]"}]})],1)],1)],1)],1)},r=[],i=(a("4160"),a("8ded"),a("9fb0"),a("88bc")),o=a.n(i),l=(a("a358"),["id","type","name","url","sort"]),s={props:{visible:{type:Boolean,required:!0},loading:{type:Boolean,default:function(){return!1}},model:{type:Object,default:function(){return null}},category:{type:String,required:!0},pMyTypes:{type:Array,required:!0,default:function(){return[]}}},data:function(){return this.formLayout={labelCol:{xs:{span:24},sm:{span:7}},wrapperCol:{xs:{span:24},sm:{span:13}}},{token:null,form:this.$form.createForm(this),myTypes:[],firstOption:0}},created:function(){var e=this;l.forEach((function(t){return e.form.getFieldDecorator(t)})),this.$watch("model",(function(){e.model&&e.form.setFieldsValue(o()(e.model,l)),e.myTypes=e.pMyTypes,e.myTypes.length>0&&(e.firstOption=e.myTypes[0].uwtid)}))},mounted:function(){},methods:{}},c=s,u=a("2877"),d=Object(u["a"])(c,n,r,!1,null,null,null);t["a"]=d.exports}}]);