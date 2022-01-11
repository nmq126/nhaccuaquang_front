import axios from 'axios'

const PLAYLIST_API_BASE_URL = 'http://localhost:8080/api/v1/playlists'

class PlaylistService{
    getPlaylists(){
        return axios.get(PLAYLIST_API_BASE_URL);
    }

    getPlaylistDetail(id){
        return axios.get(PLAYLIST_API_BASE_URL + '/' + id);
    }

    getPlaylistDetailSongs(id){
        return axios.get(PLAYLIST_API_BASE_URL + '/' + id + '/detail');
    }

    createPlaylist(body){
        return axios.post(PLAYLIST_API_BASE_URL, body);
    }

    updatePlaylist(id, body){
        return axios.put(PLAYLIST_API_BASE_URL + '/' + id, body);
    }

    deletePlaylist(id){
        return axios.delete(PLAYLIST_API_BASE_URL + '/' + id);
    }

    removeSongFromPlaylist(pid, sid){
        return axios.delete(PLAYLIST_API_BASE_URL + '/' + pid + '/remove', {
            params :{
                songId: sid
            }
        })
    }
}

export default new PlaylistService()