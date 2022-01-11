<template>
  <a-card>
    <a-form-model
        :model="form"
        layout="vertical">
      <a-row>
        <a-col :xs="24" :md="12">
          <a-form-model-item label="Username">
            <a-input v-model="form.username" placeholder="username"/>
          </a-form-model-item>
        </a-col>
      </a-row>


      <a-row>
        <a-col :xs="24" :md="12">
          <a-form-model-item label="Password">
            <a-input-password v-model="form.password" placeholder="password"/>
          </a-form-model-item>
        </a-col>
      </a-row>


      <a-form-model-item>
        <a-button type="primary" icon="save" @click="onSubmit">
          Submit
        </a-button>
      </a-form-model-item>

    </a-form-model>
  </a-card>
</template>

<script>

import AccountService from "@/services/AccountService";

export default {
  data() {
    return {
      form: {
        username: undefined,
        password: undefined
      }
    };
  },
  methods: {

    onSubmit() {
      try {
        AccountService.createAccount(this.form).then((response) => {
          console.log(response)
          if (response.data.status === 201) {
            this.$message.success(response.data.message);
            this.$router.push({name: 'accountList'});
          }
          console.log(response)
        }).catch(error => {
          if (error.response.data.status === 403){
            this.$message.error("You have no permission to create an account")
          }
          if (error.response.data.status === 400){
            this.$message.error(error.response.data.message + ": " + error.response.data.data.error)
          }
        })
      } catch (e) {
        this.$message.error(e.response.data.message);
        console.log(e)
      }


    }
  },
  created() {

  },

};
</script>