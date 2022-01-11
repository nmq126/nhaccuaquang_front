<template>
  <a-card>
    <h1>{{ title }}</h1>
    <a-divider />
    <div class="card-container">
      <a-row>
        <a-form-model-item label="Name">
          <a-input size="large" v-model="form.name"  placeholder="Role name"/>
        </a-form-model-item>
      </a-row>
      <a-row>
        <a-form-model-item label="Permissions">
          <a-select
              size="large"
              mode="multiple"
              style="width: 100%"
              placeholder="Please select permissions"
              v-model="form.permissions"

          >
            <a-select-option v-for="permission in permissionList" :key="permission.id" :value="permission.id">
              {{ permission.name }}
            </a-select-option>
          </a-select>
        </a-form-model-item>
      </a-row>

      <a-form-model-item>
        <a-button type="primary" icon="save" @click="onSubmit">
          Submit
        </a-button>
      </a-form-model-item>
    </div>
  </a-card>
</template>

<script>

import RoleService from "@/services/RoleService";

export default {
  data() {
    return {
      id: undefined,
      default: [],
      title: "Create Role",
      form: {
        name: undefined,
        permissions: []

      },
      permissionList: []
    };
  },
  methods: {
    getData() {
      RoleService.getPermissions().then((response) => {
        this.permissionList = response.data.data.permissions
      }).catch(error => {
        if (error.response.data.status === 403){
          this.$message.error("You have no permission to do this")
        }
      })
    },

    onSubmit() {
      try {
        if (this.id){
          RoleService.updateRole(this.id, this.form).then((response) => {
            if (response.data.status === 200){
              this.$message.success("Role updated successfully")
            }
          }).catch(error => {
            if (error.response.data.status === 403){
              this.$message.error("You have no permission to do this")
            }
          })
        }else {
          RoleService.createRole(this.form).then((response) => {
            if (response.data.status === 201){
              this.$message.success("Role created successfully")
              this.$router.push({name: 'roleList'});
            }
          }).catch(error => {
            if (error.response.data.status === 403){
              this.$message.error("You have no permission to do this")
            }
            console.log(error.response)
          })
        }

      }catch (e) {
        this.$message.error(e.response.data.message);
        console.log(e)
      }

    },

  },
  created() {
    this.getData()
    this.id = this.$router.currentRoute.params.id;
    if (this.id) {
      this.title = 'Edit role'
      RoleService.getRoleDetail(this.id).then((response) => {
        console.log(response)
         this.form.name = response.data.data.role.name;
          response.data.data.role.permissions.forEach(permission => {
          this.form.permissions.push(permission.id)
        });
      })
    }
  },

};
</script>
<style>
.card-container {
  background: #fafafa;
  overflow: hidden;
  padding: 24px;
}
.card-container > .ant-tabs-card > .ant-tabs-content {
  height: 120px;
  margin-top: -16px;
}

.card-container > .ant-tabs-card > .ant-tabs-content > .ant-tabs-tabpane {
  background: #fff;
  padding: 16px;
}

.card-container > .ant-tabs-card > .ant-tabs-bar {
  border-color: #fff;
}

.card-container > .ant-tabs-card > .ant-tabs-bar .ant-tabs-tab {
  border-color: transparent;
  background: transparent;
}

.card-container > .ant-tabs-card > .ant-tabs-bar .ant-tabs-tab-active {
  border-color: #fff;
  background: #fff;
}
</style>