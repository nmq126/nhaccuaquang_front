<template>
  <div>
    <a-card>
      <a-table
          :columns="columns"
          :data-source="playlists"
          rowKey="id"
          bordered>
        <a slot="name" slot-scope="text">{{ text }}</a>
        <a-avatar
            slot="image"
            slot-scope="image"
            shape="square"
            :size="100"
            icon="meh"
            :src="image" />
        <span slot="private" slot-scope="text">
          <a-tag :color="text === false ? 'volcano' : 'green'"> {{ text === false ? 'Private' : 'Public' }}
          </a-tag>
        </span>
        <span slot="action" slot-scope="text, record">

          <router-link :to="{name: 'playlistDetail', params: {id: record.id}}"><a-icon type="info-circle"/></router-link>
          <a-divider type="vertical"/>
          <router-link :to="{name: 'playlistEdit', params: {id: record.id}}"><a-icon type="edit"/></router-link>
          <a-divider type="vertical"/>
          <a-tooltip placement="top" title="Delete role">
            <a @click="showDeletePlaylistConfirm(text)"><a-icon type="delete"/></a>
          </a-tooltip>

          <!--          <a-divider type="vertical"/>-->
          <!--          <a class="ant-dropdown-link"> More actions <a-icon type="down"/> </a>-->
        </span>
      </a-table>
    </a-card>
  </div>
</template>

<script>
import PlaylistService from "@/services/PlaylistService";

const columns = [
  {
    title: 'Id',
    dataIndex: 'id',
    key: 'id',
    width: '5%',
  },
  {
    title: 'Thumbnail',
    dataIndex: 'thumbnail',
    key: 'thumbnail',
    scopedSlots: {customRender: 'image'},

  },
  {
    title: 'Name',
    dataIndex: 'name',
    key: 'name',
    scopedSlots: {customRender: 'name'},
  },

  {
    title: 'Status',
    dataIndex: 'private',
    key: 'private',
    scopedSlots: {customRender: 'private'},
    width: '10%',
  },

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
      columns,
      playlists: []
    };
  },
  methods: {
    getPlaylists() {
      PlaylistService.getPlaylists().then((response) => {
        this.playlists = response.data.data.playlists;
      })
    },

    showDeletePlaylistConfirm(playlist){
      this.$confirm({
        title: 'Delete this playlist ' + playlist.name + ' permanently',
        // content: 'Some descriptions',
        okText: 'Yes',
        okType: 'danger',
        cancelText: 'No',
        onOk: () => {
          try {
            PlaylistService.deletePlaylist(playlist.id).then((response) => {
              console.log(response)
              if (response.status === 204) {
                this.$message.success("Delete playlist successfully")
                this.getPlaylists()
              }
            }).catch(error => {
              if (error.response.data.status === 403) {
                this.$message.error("You have no permission to delete a playlist")
              }
              if (error.response.data.status === 500) {
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
    this.getPlaylists();
  }
};
</script>
