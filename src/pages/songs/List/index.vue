<template>
  <div>
    <a-card>
      <a-form class="ant-advanced-search-form" @submit="handleSearch">
        <a-row :gutter="24">
          <a-col :span="4">
            <a-form-item>
              <a-input-search
                  v-model="params.id"
                  placeholder="Search by id"
              />
            </a-form-item>
          </a-col>
          <a-col :span="4">
            <a-form-item>
              <a-input-search
                  v-model="params.name"
                  placeholder="Search by name"
              />
            </a-form-item>
          </a-col>
          <a-col :span="4">
            <a-form-item>
              <a-select placeholder="Status" v-model="params.status">
                <a-select-option value="-1">
                  All
                </a-select-option>
                <a-select-option value="1">
                  Available
                </a-select-option>
                <a-select-option value="0">
                  Not available
                </a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
          <a-col :span="4">
            <a-form-item>
              <a-select placeholder="Genre" v-model="params.genre_id" >
                <a-select-option value = "-1">
                  All
                </a-select-option>
                <a-select-option :key="genre.id" v-for="genre in genres" :value="genre.id">
                  {{ genre.name }}
                </a-select-option>
              </a-select>
            </a-form-item>
          </a-col>
          <a-col :span="8">
            <a-form-item>
              <a-range-picker
                  @change="rangeChange"
                  :placeholder= "['Start release date', 'End release date']"
                  v-model="times"
                  :ranges="{ Today: [moment(), moment()], 'This Month': [moment(), moment().endOf('month')] }"/>
            </a-form-item>
          </a-col>


        </a-row>
        <a-row>
          <a-col :span="24" :style="{ textAlign: 'right' }">
            <a-button type="primary" html-type="submit">
              Search
            </a-button>
            <a-button :style="{ marginLeft: '8px' }" @click="handleReset">
              Clear
            </a-button>
          </a-col>
        </a-row>
      </a-form>
    </a-card>

    <a-card :style="{ margin: '24px 0' }">
      <a-table
          :columns="columns"
          :data-source="songs"
          rowKey="id"
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
          <a-tag :color="text === 0 ? 'volcano' : 'green'"> {{ text === 0 ? 'Not available' : 'Available' }}
          </a-tag>
        </span>
        <span slot="audioPlayer" slot-scope="text, record">
          <button v-if="!isPlaying" @click="playSong(record.link)">Play</button>
          <button v-else @click="pauseSong">Pause</button>
        </span>
        <span slot="genre" slot-scope="text">
          {{ text == 1 ? 'Pop' : 'Hip hop'}}
        </span>
        <span slot="action" slot-scope="text, record">

          <a-tooltip placement="top" title="Song detail">
            <a href=""><a-icon type="info-circle"/></a>
          </a-tooltip>
          <a-divider type="vertical"/>
          <a-tooltip placement="top" title="Edit song">
             <router-link :to="{name: 'songEdit', params: {id: record.id}}"><a-icon type="edit"/></router-link>
          </a-tooltip>
          <a-divider type="vertical"/>
          <a-dropdown :trigger="['click']">
            <a-tooltip placement="top" title="Add song to playlist">
              <a class="ant-dropdown-link" @click="e => e.preventDefault()">
                <a-icon type="plus"/>
              </a>
            </a-tooltip>
            <a-menu slot="overlay">
              <a-menu-item :key="playlist.id" v-for="playlist in playlists" :value="playlist.id">
                <a @click="addSongToPlaylist(playlist.id, record.id)">{{ playlist.name }}</a>
              </a-menu-item>
          </a-menu>
          </a-dropdown>

        </span>
      </a-table>
      <template>
        <a-pagination
            :total="total"
            :show-total="(total, range) => `${range[0]}-${range[1]} of ${total} items`"
            show-size-changer
            @change="onChange"
            @showSizeChange="onChange"
        />
      </template>
    </a-card>
  </div>
</template>

<script>
import SongService from "@/services/SongService";
import GenreService from "@/services/GenreService";
import PlaylistService from "@/services/PlaylistService";
import moment from 'moment';

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
    width: '20%',
    scopedSlots: {customRender: 'image'},

  },
  {
    title: 'Name',
    dataIndex: 'name',
    key: 'name',
    width: '20%',
    scopedSlots: {customRender: 'name'},
  },

  {
    title: 'Play',
    dataIndex: 'link',
    key: 'link',
    scopedSlots: {customRender: 'audioPlayer'},
  },
  {
    title: 'Genre',
    dataIndex: 'genre_id',
    key: 'genre',
    scopedSlots: {customRender: 'genre'},
    width: '10%',
  },
  {
    title: 'Status',
    dataIndex: 'status',
    key: 'status',
    scopedSlots: {customRender: 'status'},
    width: '10%',
  },
  {
    title: 'Release Date',
    key: 'releasedAt',
    dataIndex: 'releasedAt',
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
      range: [],
      times:[],
      columns,
      genres: [],
      songs: [],
      playlists: [],
      total: undefined,
      isPlaying: false,
      player: new Audio()
    };
  },

  methods: {
    moment,
    playSong(src) {
      this.player.src = src
      this.player.play()
      this.isPlaying = true
    },

    pauseSong(){
      this.player.pause()
      this.isPlaying = false
    },

    rangeChange(dates, dateStrings){
      this.params.from = dateStrings[0];
      this.params.to = dateStrings[1];
      this.getData();
    },

    getData() {
      SongService.getSongs(this.params).then((response) => {
        if (response.data.data == null) {
          this.songs = null;
        }
        this.songs = response.data.data.songs.content;
        this.total = response.data.data.songs.totalElements;
        this.params.page = response.data.data.songs.pageable.pageNumber + 1;
        // this.size = parseInt(response.data.data.songs.size);
      }).catch(error => {
        return error
      })
    },

    onChange(page, limit) {
      this.params.page = page;
      this.params.limit = limit;
      this.getData();
    },

    handleSearch(e) {
      e.preventDefault();
      this.params.page = 1;
      this.getData();
    },

    handleReset() {
      this.params = {
        id: undefined,
        name: undefined,
        genre_id: undefined,
        status: undefined,
        releasedAt: undefined,
        page: 1,
        limit: 10,
        from: undefined,
        to: undefined
      };
      this.times = [];
      this.getData();
    },

    addSongToPlaylist(pid, sid) {
      SongService.addSongToPlaylist(pid, sid).then((response) => {
        if (response.data.status === 200) {
          this.$message.success(response.data.message);
        }
      }).catch((error) =>{
          this.$message.error(error.response.data.message);
      });
    },


  },
  created() {
    GenreService.getGenres().then((response) => {
      this.genres = response.data.data.genres;
    })
    PlaylistService.getPlaylists().then((response) => {
      this.playlists = response.data.data.playlists;
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
