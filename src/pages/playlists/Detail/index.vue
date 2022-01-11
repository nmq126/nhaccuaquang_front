<template>
  <div>

    <a-card style="margin-bottom: 20px">
      <h1>Playlist: {{ this.playlist.name }}</h1>
    </a-card>

    <a-card>
      <a-table
          :columns="columns"
          :data-source="playlistDetails"
          rowKey="action"
          :pagination="false"
          bordered>
        <a slot="name" slot-scope="text">{{ text }}</a>
        <a-avatar
            slot="image"
            slot-scope="image"
            shape="square"
            :size="100"
            icon="meh"
            :src="image"/>
        <span slot="status" slot-scope="text">
          <a-tag :color="text === 0 ? 'volcano' : 'green'"> {{ text === 0 ? 'Not Available' : 'Available' }}
          </a-tag>
        </span>
        <span slot="action" slot-scope="text">
          <a-tooltip placement="top" title="Remove song from playlist">
            <a @click="showDeleteConfirm(playlist.id, text.song)"><a-icon type="delete"/></a>
          </a-tooltip>
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
    dataIndex: ['song', 'id'],
    key: 'id',
    width: '5%',
  },
  {
    title: 'Thumbnail',
    dataIndex: ['song', 'thumbnail'],
    key: 'thumbnail',
    scopedSlots: {customRender: 'image'},

  },
  {
    title: 'Name',
    dataIndex: ['song', 'name'],
    key: 'name',
    scopedSlots: {customRender: 'name'},
  },

  {
    title: 'Status',
    dataIndex: ['song', 'status'],
    key: 'status',
    scopedSlots: {customRender: 'status'},
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
      playlist: {},
      playlistDetails: []
    };
  },
  methods: {
    getPlaylistDetail() {
      PlaylistService.getPlaylistDetail(this.$route.params.id).then((response) => {
        this.playlist = response.data.data.playlist;
        console.log(response)
      })
    },
    getPlaylistDetailSongs() {
      PlaylistService.getPlaylistDetailSongs(this.$route.params.id).then((response) => {
        this.playlistDetails = response.data.data.playlist;
        console.log(response);
      })
    },

    showDeleteConfirm(pid, song){
      this.$confirm({
        title: 'Remove this song ' + '"' + song.name + '"' + ' from playlist ' + '"' + this.playlist.name + '"',
        // content: 'Some descriptions',
        okText: 'Yes',
        okType: 'danger',
        cancelText: 'No',
        onOk : () =>{
          this.removeSongFromPlaylist(pid, song.id)
        },
        onCancel() {
          console.log('Cancel');
        },
      });
    },

    removeSongFromPlaylist(pid, sid){
      PlaylistService.removeSongFromPlaylist(pid, sid).then((response) => {
        if (response.data.status === 200) {
          this.$message.success(response.data.message);
          this.getPlaylistDetailSongs()
        }
      }).catch((error) =>{
        this.$message.error(error.response.data.message);
      });
    }
  },
  created() {
    this.getPlaylistDetail();
    this.getPlaylistDetailSongs()
  }
};
</script>
