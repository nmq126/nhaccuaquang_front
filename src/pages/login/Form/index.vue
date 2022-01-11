<template>
  <div style="background:#ECECEC">
    <a-card title="Login" :bordered="false">
      <a-row type="flex" justify="center">
        <a-col :xs="24" :md="12" :lg="6">
      <a-form-model :layout="form.layout" :model="form" v-bind="formItemLayout">
        <a-form-model-item label="Username">
          <a-input v-model="form.username" placeholder="Your username" />
        </a-form-model-item>
        <a-form-model-item label="Password">
          <a-input-password v-model="form.password" placeholder="Your password" />
        </a-form-model-item>
        <a-form-model-item :wrapper-col="buttonItemLayout.wrapperCol">
          <a-button type="primary" @click="onSubmit">
            Login
          </a-button>
        </a-form-model-item>
      </a-form-model>
        </a-col>
      </a-row>
    </a-card>
  </div>

</template>
<script>
import AccountService from "@/services/AccountService";
import axios from "axios";

export default {
  data() {
    return {
      form: {
        username: undefined,
        password: undefined,
      },
    };
  },
  methods:{
    onSubmit(){
      AccountService.login(this.form).then((response) => {
        if (response.status === 200) {
          this.$message.success("login successfully");
          axios.defaults.headers.common['Authorization'] = 'Bearer ' + response.data.access_token;
          localStorage.setItem( 'token', JSON.stringify(response.data.access_token) );
          localStorage.setItem( 'username', JSON.stringify(response.data.username) );
          this.$router.push({name: 'songList'})
        }else {
          this.$message.error("something ís wrong here");
        }
      }).catch((error) =>{
        if (error.response.status === 401) {
          this.$message.error("login fail, username/password incorrect");
        }
      });
    }
  },
  computed: {
    formItemLayout() {
      const { layout } = this.form;
      return layout === 'horizontal'
          ? {
            labelCol: { span: 4 },
            wrapperCol: { span: 14 },
          }
          : {};
    },
    buttonItemLayout() {
      const { layout } = this.form;
      return layout === 'horizontal'
          ? {
            wrapperCol: { span: 14, offset: 4 },
          }
          : {};
    },
  },
};
</script>