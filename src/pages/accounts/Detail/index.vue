<template>
  <a-card>
    <h1>{{ title }}</h1>
    <a-divider/>
    <div class="card-container">
      <a-row>
        <a-form-model-item label="Username">
          <a-input :disabled="true" size="large" v-model="form.username" placeholder="User name"/>
        </a-form-model-item>
      </a-row>

      <div>
        <a-tabs default-active-key="1">
          <a-tab-pane key="1" tab="ROLES">
            <a-button
                :style="{ marginBottom: '20px' }"
                type="primary"
                icon="plus"
                @click="showRoleModal">
              Assign new role
            </a-button>

            <a-modal
                title="Add roles"
                :visible="visible"
                @ok="okRoleModal"
                @cancel="cancelRoleModal"
            >
              <a-form-model-item label="Roles">
                <a-select
                    size="large"
                    mode="multiple"
                    style="width: 100%"
                    placeholder="Please select roles"
                    >
                  <a-select-option v-for="role in roleList" :key="role.id" :value="role.id">
                    {{ role.name }}
                  </a-select-option>
                </a-select>
              </a-form-model-item>
            </a-modal>

            <a-table
                :columns="roleColumns"
                :data-source="this.form.roles"
                :rowKey="id"
                bordered>

              <span slot="action" slot-scope="text">
                <a-tooltip placement="top" title="Delete role">
                  <a @click="showDeleteRoleConfirm(text)"><a-icon type="delete"/></a>
                </a-tooltip>
              </span>

            </a-table>


          </a-tab-pane>
          <a-tab-pane key="2" tab="PERMISSIONS" force-render>
            <a-row>
              <a-form-model-item label="Permissions">
                <a-select
                    size="large"
                    mode="multiple"
                    style="width: 100%"
                    placeholder="Please select permissions"
                    v-model="form.permissions">
                  <a-select-option v-for="permission in permissionList" :key="permission.id" :value="permission.id">
                    {{ permission.name }}
                  </a-select-option>
                </a-select>
              </a-form-model-item>
            </a-row>
          </a-tab-pane>

        </a-tabs>
      </div>


    </div>
  </a-card>
</template>

<script>

const roleColumns = [
  {
    title: 'Name',
    dataIndex: 'name',
    key: 'name',
  },

  {
    title: 'Action',
    key: 'action',
    scopedSlots: {customRender: 'action'},
  },

];


import AccountService from "@/services/AccountService";
import RoleService from "@/services/RoleService";

export default {
  data() {
    return {
      id: undefined,
      default: [],
      title: "Account Detail",
      form: {
        username: undefined,
        roles: [],
        permissions: []
      },
      removeRoleForm: {
        username: undefined,
        roleName: undefined
      },
      permissionList: [],
      roleList: [],
      roleColumns,
      visible: false,
    };
  },
  methods: {
    getData() {
      AccountService.getAccountDetail(this.$router.currentRoute.params.id).then((response) => {
        console.log(response)
        this.form.username = response.data.data.account.username;
        response.data.data.account.permissions.forEach(permission => {
          this.form.permissions.push(permission.id)
        });
        this.form.roles = response.data.data.account.roles
        // response.data.data.account.roles.forEach(role => {
        //   this.form.roles.push(role.id)
        // });
      }).catch(error => {
        if (error.response.data.status === 403) {
          this.$message.error("You have no permission to do this")
        }
      })
      RoleService.getPermissions().then((response) => {
        this.permissionList = response.data.data.permissions
      }).catch(error => {
        if (error.response.data.status === 403) {
          this.$message.error("You have no permission to do this")
        }
      })

      RoleService.getRoles().then((response) => {
        this.roleList = response.data.data.roles

        this.roleList.forEach(roleAdd => {
          this.form.roles.forEach(role => {
            if (role.id === roleAdd.id){
              this.roleList.splice(this.roleList.indexOf(roleAdd), 1)
            }
          })
        })

      }).catch(error => {
        if (error.response.data.status === 403) {
          this.$message.error("You have no permission to do this")
        }
      })
    },

    onSubmit() {

    },

    showDeleteRoleConfirm(role){
      this.removeRoleForm.username = this.form.username
      this.removeRoleForm.roleName = role.name
      this.$confirm({
        title: 'Remove role ' + role.name + ' from this account',
        okText: 'Yes',
        okType: 'danger',
        cancelText: 'No',
        onOk : () =>{
          try {
            AccountService.removeRoleFromAccount(this.removeRoleForm).then((response) => {
              console.log(response)
              if (response.status === 200){
                this.$message.success("Remove role successful")
                this.getData()
              }
            }).catch(error => {
              if (error.response.data.status === 403){
                this.$message.error("You have no permission to remove role")
              }
            })

          }catch (e) {
            this.$message.error(e.response.data.message);
          }
        },
        onCancel() {
        },
      });
    },

    showRoleModal() {
      this.visible = true;
    },

    cancelRoleModal() {
      this.visible = false;
    },

    okRoleModal() {
      this.visible = false;
    },

  },
  created() {
    this.getData()
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