<template>
  <a-card>
    <a-form-model
        :model="form"
        layout="vertical">
      <a-row>
        <a-col :xs="24" :md="12">
          <a-form-model-item label="Name">
            <a-input v-model="form.name" placeholder="Playlist name"/>
          </a-form-model-item>
        </a-col>
      </a-row>


      <a-row>
        <a-col :xs="24" :md="12">
          <a-form-model-item label="Thumbnail">
            <a-input v-model="form.thumbnail" placeholder="link png cac kieu"/>
          </a-form-model-item>
        </a-col>
      </a-row>


      <a-row >
        <a-col :xs="24" :md="6">
          <a-form-model-item label="Privacy">
            <a-select placeholder="Privacy" v-model="form.private">
              <a-select-option :value="true">
                Public
              </a-select-option>
              <a-select-option :value="false">
                Private
              </a-select-option>
            </a-select>
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
import PlaylistService from "@/services/PlaylistService";

export default {
  data() {
    return {
      id: undefined,
      message: 'Playlist created successfully',
      form: {
        name: undefined,
        thumbnail: undefined,
        private: undefined
      }
    };
  },
  methods: {

    onSubmit() {
      try {
        if (this.id) {
          PlaylistService.updatePlaylist(this.id, this.form).then((response) => {
            if (response.data.status !== 200) {
              this.$message.error(response.data.message);
            }else {
              this.$message.success(this.message);
            }
          })
        } else {
          PlaylistService.createPlaylist(this.form).then((response) => {
            console.log(response)
            if (response.data.status !== 201) {
              this.$message.error(response.data.data.error);
            }else {
              this.$message.success(this.message);
              this.$router.push({name: 'playlistList'});
            }

          })
        }

      } catch (e) {
        this.$message.error(e.response.data.message);
      }


    }
  },
  created() {
    this.id = this.$router.currentRoute.params.id;
    if (this.id) {
      this.message = 'Playlist edited successfully'
      PlaylistService.getPlaylistDetail(this.id).then((response) => {
        console.log(response)
        this.form = response.data.data.playlist;
      })
    }
  },

};
</script>