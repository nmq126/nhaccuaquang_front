import axios from 'axios'

const SONG_API_BASE_URL = 'http://localhost:8080/api/v1/songs'

class SongService{
    getSongs(params){
        return axios.get(SONG_API_BASE_URL, {
            params: params,
        });
    }

    getSongDetail(id){
        return axios.get(SONG_API_BASE_URL + '/' + id);
    }

    createSong(body){
        return axios.post(SONG_API_BASE_URL, body);
    }

    updateSong(id, body){
        return axios.put(SONG_API_BASE_URL + '/' + id, body);
    }

    deleteSong(id){
        return axios.delete(SONG_API_BASE_URL + '/' + id);
    }

    addSongToPlaylist(pid, sid){
        return axios.get(SONG_API_BASE_URL + '/' + sid + '/add',{
            params: {
                playlistId : pid
            }
        })
    }
}

export default new SongService()