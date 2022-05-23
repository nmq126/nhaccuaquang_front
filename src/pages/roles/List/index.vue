<template>
  <div>

    <a-card :style="{ margin: '24px 0' }">
      <a-table
          :columns="columns"
          :data-source="roles"
          rowKey="id"
          bordered>

        <span slot="action" slot-scope="text, record">

          <a-tooltip placement="top" title="Role detail">
             <router-link :to="{name: 'roleEdit', params: {id: record.id}}"><a-icon type="edit"/></router-link>
          </a-tooltip>

          <a-divider type="vertical"/>

          <a-tooltip placement="top" title="Delete role">
            <a @click="showDeleteRoleConfirm(text)"><a-icon type="delete"/></a>
          </a-tooltip>

        </span>
      </a-table>
    </a-card>
  </div>
</template>

<script>
import RoleService from "@/services/RoleService";

const columns = [
  // {
  //   title: 'Id',
  //   dataIndex: 'id',
  //   key: 'id',
  //   width: '5%'
  // },

  {
    title: 'Name',
    dataIndex: 'name',
    key: 'name',
    width: '50%'
  },

  {
    title: 'Action',
    key: 'action',
    scopedSlots: {customRender: 'action'}
  },

];

export default {
  data() {
    return {
      form: {
        username: undefined,
        roleName: undefined
      },
      params: {
        id: undefined,
        name: undefined,
        genre_id: undefined,
        status: undefined,
        releasedAt: undefined,
        page: 1,
        limit: 10,
        from: undefined,
        to: undefined
      },
      columns,
      roles: []
    };
  },

  methods: {

    getData() {
      RoleService.getRoles().then((response) => {
        console.log(response)
        this.roles = response.data.data.roles
      }).catch(error => {
        return error
      })
    },

    showDeleteRoleConfirm(role){
      this.$confirm({
        title: 'Delete this role ' + role.name + ' permanently',
        // content: 'Some descriptions',
        okText: 'Yes',
        okType: 'danger',
        cancelText: 'No',
        onOk : () =>{
          try {
            RoleService.deleteRole(role.id).then((response) => {
              console.log(response)
              if (response.status === 204){
                this.$message.success("Delete role successfully")
                this.getData()
              }
            }).catch(error => {
              if (error.response.data.status === 403){
                this.$message.error("You have no permission to delete a role")
              }
              if (error.response.data.status === 500){
                this.$message.error("Cannot delete an active role")
              }
            })

          }catch (e) {
            this.$message.error(e.response.data.message);
          }
        },
        onCancel() {
          console.log('Cancel');
        },
      });
    },
  },
  created() {
    this.getData();
  }
};
</script>
<style>
.ant-advanced-search-form {
  padding: 24px;
  background: #fbfbfb;
  border: 1px solid #d9d9d9;
  border-radius: 6px;
}

.ant-advanced-search-form .ant-form-item {
  display: flex;
}

.ant-advanced-search-form .ant-form-item-control-wrapper {
  flex: 1;
}

.ant-pagination {
  margin-top: 20px;
  text-align: center;
}
</style>
