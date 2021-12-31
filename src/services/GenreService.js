import axios from 'axios'

const GENRE_API_BASE_URL = 'http://localhost:8080/api/v1/genres'

class GenreService{
    getGenres(){
        return axios.get(GENRE_API_BASE_URL);
    }

    getGenreDetail(id){
        return axios.get(GENRE_API_BASE_URL + '/' + id);
    }

    createGenre(body){
        return axios.post(GENRE_API_BASE_URL, body);
    }

    updateGenre(id, body){
        return axios.put(GENRE_API_BASE_URL + '/' + id, body);
    }

    deleteGenre(id){
        return axios.delete(GENRE_API_BASE_URL + '/' + id);
    }
}

export default new GenreService()