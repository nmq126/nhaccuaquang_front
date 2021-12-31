<template>
  <a-card>
    <a-form-model
        :model="form"
        layout="vertical">
      <a-row>
        <a-col :xs="24" :md="12">
          <a-form-model-item label="Name">
            <a-input v-model="form.name" placeholder="Song name"/>
          </a-form-model-item>
        </a-col>
      </a-row>



      <a-row :gutter="8">
        <a-col :xs="24" :md="6">
          <a-form-model-item label="Genre">
            <a-select v-model="form.genre_id"
                      placeholder="Select genre">
              <a-select-option :key="genre.id" v-for="genre in genres" :value="genre.id">
                {{ genre.name }}
              </a-select-option>

            </a-select>
          </a-form-model-item>
        </a-col>
        <a-col :xs="24" :md="6">
          <a-form-model-item label="Status">
            <a-select placeholder="Status" v-model="form.status">
              <a-select-option :value="true">
                Available
              </a-select-option>
              <a-select-option :value="false">
                Not available
              </a-select-option>
            </a-select>
          </a-form-model-item>
        </a-col>
      </a-row>

      <a-row>
        <a-col :xs="24" :md="12">
          <a-form-model-item label="Link">
            <a-input v-model="form.link" placeholder="link mp3 cac kieu"/>
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

      <a-row>
        <a-col :xs="24" :md="12">
          <a-form-model-item label="Release at">
            <a-date-picker
                v-model="form.releasedAt"
                :disabled-date="(startValue) => startValue.valueOf() > new Date()"
                type="date"
                valueFormat="YYYY-MM-DD"
                placeholder="Release date"/>
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
import SongService from "@/services/SongService";
import GenreService from "@/services/GenreService";

export default {
  data() {
    return {
      id: undefined,
      message: 'Song added successfully',
      genres: [],
      form: {
        name: undefined,
        link: undefined,
        genre_id: undefined,
        status: undefined,
        thumbnail: undefined,
        releasedAt: undefined
      }
    };
  },
  methods: {
    getGenres() {
      GenreService.getGenres().then((response) => {
        this.genres = response.data.data.genres;
      })
    },

    onSubmit() {
      try {
        if (this.id) {
          SongService.updateSong(this.id, this.form).then((response) => {
            if (response.data.status !== 200) {
              this.$message.error(response.data.message + " Try again");
            }else {
              this.$message.success(this.message);
            }
          })
        } else {
          SongService.createSong(this.form).then((response) => {
            if (response.data.status !== 201) {
              this.$message.error(response.data.data.error);
            }else {
              this.$message.success(this.message);
              this.$router.push({name: 'songList'});
            }

          })
        }

      } catch (e) {
        this.$message.error(e.response.data.message);
      }


    }
  },
  created() {
    this.getGenres();
    this.id = this.$router.currentRoute.params.id;
    if (this.id) {
      this.message = 'Song edited successfully'
      SongService.getSongDetail(this.id).then((response) => {
        this.form = response.data.data.song;
      })
    }
  },

};
</script>