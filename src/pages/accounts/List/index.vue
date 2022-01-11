<template>
  <div>

    <a-card :style="{ margin: '24px 0' }">
      <a-table
          :columns="columns"
          :data-source="accounts"
          rowKey="id"
          bordered>


        <span slot="roles" slot-scope="roles">
          <a-tag
            v-for="role in roles"
            :key="role.id"
            :color="role.name === 'ROLE_ADMIN' ? 'volcano' : role.name === 'ROLE_USER' ? 'geekblue' : 'green'"
          >
            {{ role.name }}
          </a-tag>
          </span>

        <span slot="action" slot-scope="text">

          <a-tooltip placement="top" title="Account edit">
             <router-link :to="{name: 'accountEdit', params: {id: text.id}}"><a-icon type="edit"/></router-link>
          </a-tooltip>

          <a-divider type="vertical"/>
          <a-dropdown :trigger="['click']">
            <a-tooltip placement="top" title="Add role to user">
              <a class="ant-dropdown-link" @click="e => e.preventDefault()">
                <a-icon type="plus"/>
              </a>
            </a-tooltip>
            <a-menu slot="overlay">
              <a-menu-item :key="role.id" v-for="role in roles" :value="role.id">
                <a @click="addRoleToAccount(text.username, role.name)">{{ role.name }}</a>
              </a-menu-item>
          </a-menu>
          </a-dropdown>

        </span>
      </a-table>
    </a-card>
  </div>
</template>

<script>
import AccountService from "@/services/AccountService";

const columns = [
  {
    title: 'Id',
    dataIndex: 'id',
    key: 'id',
    width: '5%',
  },

  {
    title: 'Username',
    dataIndex: 'username',
    key: 'username',
    width: '15%'
  },

  {
    title: 'Roles',
    dataIndex: 'roles',
    key: 'role',
    scopedSlots: {customRender: 'roles'},
    ellipsis: true,

  },
  // {
  //   title: 'Created At',
  //   dataIndex: 'createdAt',
  //   key: 'createdAt',
  // },
  // {
  //   title: 'Updated At',
  //   dataIndex: 'updatedAt',
  //   key: 'updatedAt',
  // },
  {
    title: 'Action',
    key: 'action',
    scopedSlots: {customRender: 'action'},
    width: '10%',

  },

];

export default {
  data() {
    return {
      form:{
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
      accounts: [],
      roles: []
    };
  },

  methods: {

    getData() {
      AccountService.getAccounts().then((response) => {
        console.log(response)
        this.accounts = response.data.data.accounts
      }).catch(error => {
        return error
      })
    },

    addRoleToAccount(username, roleName) {
      this.form.username = username;
      this.form.roleName = roleName;
     AccountService.addRoleToAccount(this.form).then((response) => {
       this.$message.success(response.data.message)
       this.getData()
     }).catch(error => {
       if (error.response.data.status === 403){
         this.$message.error("You have no permission to do this")
       }
       if (error.response.data.status === 400){
         this.$message.error("Role already added")
       }

     })
    }


  },
  created() {
    AccountService.getRoles().then((response) => {
      console.log(response)
      this.roles = response.data.data.roles
    }).catch(error => {
      return error
    })
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
