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
                    v-model="updateForm.roles"
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

            <a-button
                :style="{ marginBottom: '20px' }"
                type="primary"
                icon="plus"
                @click="showPermissionModal">
              Assign new permission
            </a-button>

            <a-modal
                title="Add permission"
                :visible="visible1"
                @ok="okPermissionModal"
                @cancel="cancelPermissionModal"
            >
              <a-form-model-item label="Permission">
                <a-select
                    size="large"
                    mode="multiple"
                    style="width: 100%"
                    placeholder="Please select permissions"
                    v-model="updateForm.permissions"
                >
                  <a-select-option v-for="permission in permissionList" :key="permission.id" :value="permission.id">
                    {{ permission.name }}
                  </a-select-option>
                </a-select>
              </a-form-model-item>
            </a-modal>

            <a-table
                :columns="permissionColumns"
                :data-source="this.form.permissions"
                :rowKey="id"
                bordered>

              <span slot="action" slot-scope="text">
                <a-tooltip placement="top" title="Remove permission">
                  <a @click="showDeletePermissionConfirm(text)"><a-icon type="delete"/></a>
                </a-tooltip>
              </span>

            </a-table>

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

const permissionColumns = [
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
      updateForm: {
        roles: [],
        permissions: []
      },
      removeRoleForm: {
        username: undefined,
        roleName: undefined
      },
      removePermissionForm: {
        username: undefined,
        permName: undefined
      },
      permissionList: [],
      roleList: [],
      roleColumns,
      permissionColumns,
      visible: false,
      visible1: false,
    };
  },
  methods: {
     getData() {
       AccountService.getAccountDetail(this.$router.currentRoute.params.id).then((response) => {
        this.form.username = response.data.data.account.username;
        this.form.permissions = response.data.data.account.permissions
        this.form.roles = response.data.data.account.roles


      }).catch(error => {
        if (error.response.data.status === 403) {
          this.$message.error("You have no permission to do this")
        }
      })
    },

    getPermissionAdd() {
      RoleService.getPermissions().then((response) => {
        this.permissionList = response.data.data.permissions

        this.form.permissions.forEach(permission => {
          this.permissionList.forEach(permissionAdd => {
            if (permission.id === permissionAdd.id) {
              this.permissionList.splice(this.permissionList.indexOf(permissionAdd), 1)
            }
          })
        })

      }).catch(error => {
        if (error.response.data.status === 403) {
          this.$message.error("You have no permission to do this")
        }
      })
    },

    getRoleAdd() {

      RoleService.getRoles().then((response) => {
        this.roleList = response.data.data.roles


        this.form.roles.forEach(role => {
          this.roleList.forEach(roleAdd => {
            if (role.id === roleAdd.id) {
              this.roleList.splice(this.roleList.indexOf(roleAdd), 1)
            }
          })
        })
      }).catch(error => {
        if (error.response.data.status === 403) {
          this.$message.error("You have no permission to do this")
        }
      })
    }
    ,

    onSubmit() {

    }
    ,

    showDeleteRoleConfirm(role) {
      this.removeRoleForm.username = this.form.username
      this.removeRoleForm.roleName = role.name
      this.$confirm({
        title: 'Remove role ' + role.name + ' from this account',
        okText: 'Yes',
        okType: 'danger',
        cancelText: 'No',
        onOk: () => {
          try {
            AccountService.removeRoleFromAccount(this.removeRoleForm).then(async (response) => {
              console.log(response)
              if (response.status === 200) {
                this.$message.success("Remove role successful")
                this.$toastr('success', 'it works!', 'Yeahh')
                await this.getData()
                await this.getRoleAdd()
              }
            }).catch(error => {
              if (error.response.data.status === 403) {
                this.$message.error("You have no permission to remove role")
              }
            })

          } catch (e) {
            this.$message.error(e.response.data.message);
          }
        },
        onCancel() {
        },
      });
    },

    showDeletePermissionConfirm(permission) {
      this.removePermissionForm.username = this.form.username
      this.removePermissionForm.permName = permission.name
      this.$confirm({
        title: 'Remove permission ' + permission.name + ' from this account',
        okText: 'Yes',
        okType: 'danger',
        cancelText: 'No',
        onOk: () => {
          try {
            AccountService.removePermissionFromAccount(this.removePermissionForm).then(async (response) => {
              if (response.status === 200) {
                this.$message.success("Remove permission successful")
                await this.getData()
                await this.getPermissionAdd()
              }
            }).catch(error => {
              if (error.response.data.status === 403) {
                this.$message.error("You have no permission to remove role")
              }
            })

          } catch (e) {
            this.$message.error(e.response.data.message);
          }
        },
        onCancel() {
        },
      });
    },

    showRoleModal() {
      this.visible = true;
    }
    ,

    cancelRoleModal() {
      this.visible = false;
    }
    ,

    okRoleModal() {
      AccountService.update(this.id, this.updateForm).then(async (response) => {
        if (response.status === 200){
          this.updateForm.roles = []
          this.$message.success(response.data.message)
          await this.getData()
          await this.getRoleAdd()
        }
      }).catch(error => {
        if (error.response.data.status === 403){
          this.$message.error("You have no permission to do this")
        }
      })
      this.visible = false;
    },

    showPermissionModal() {
      this.visible1 = true;
    }
    ,

    cancelPermissionModal() {
      this.visible1 = false;
    }
    ,

    okPermissionModal() {
      AccountService.update(this.id, this.updateForm).then(async (response) => {
        if (response.status === 200){
          this.updateForm.permissions = []
          this.$message.success(response.data.message)
          await this.getData()
          await this.getPermissionAdd()
        }
      }).catch(error => {
        if (error.response.data.status === 403){
          this.$message.error("You have no permission to do this")
        }
      })
      this.visible1 = false;
      }
    ,

  },
   async created() {
    this.id = this.$router.currentRoute.params.id
    await this.getData()
    await this.getPermissionAdd()
    await this.getRoleAdd()
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