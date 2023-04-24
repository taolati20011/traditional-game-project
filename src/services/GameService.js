import axios from 'axios';

const GAME_LIST_BASE_URL = "http://13.210.125.44:8080/api/game";
const IMAGE_LIST_BASE_URL = "http://13.210.125.44:8080/api/image";
const TYPE_LIST_BASE_URL = "http://13.210.125.44:8080/api/type"

class UserService {
    getGames(pageSize, pageNo){
        axios.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem('accessToken')}`;
        return axios.get(GAME_LIST_BASE_URL + "/get-all-by-filter"+ "?pageSize=" + pageSize + "&pageNo=" + pageNo);
    }

    getGameByFilter(words, pageSize, pageNo){
        axios.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem('accessToken')}`;
        return axios.get(GAME_LIST_BASE_URL+ "/get-all-by-filter?words="+words+ "&pageSize=" + pageSize + "&pageNo=" + pageNo);
    }

    getTotalNumberOfGame(words) {
        axios.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem('accessToken')}`;
        return axios.get(GAME_LIST_BASE_URL + "/count-game?words=" + words);
    }

    createGame(game){
        axios.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem('accessToken')}`;
        axios.defaults.headers.common['Content-Type'] = 'application/json';
        return axios.post(GAME_LIST_BASE_URL + "/add", game);
    }

    updateGame(gameId, game){
        axios.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem('accessToken')}`;
        return axios.put(GAME_LIST_BASE_URL + '/edit/' + gameId, game);
    }

    deleteGame(gameId){
        axios.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem('accessToken')}`;
        return axios.delete(GAME_LIST_BASE_URL + '/delete/' + gameId);
    }

    uploadMainImage(gameId, isMainImage, file){
        axios.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem('accessToken')}`;
        let fd = new FormData();
        fd.append('file', file)
        return axios.post(IMAGE_LIST_BASE_URL + '/upload?gameId=' + gameId + '&isMainImage=' + isMainImage, fd , {
            headers: {
                'Content-Type': 'multipart/form-data',
            }
        });
    }

    uploadCoverImage(gameId, isMainImage, files){
        axios.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem('accessToken')}`;
        let fd = new FormData();
        for (let i = 0 ; i < files.length ; i++) {
            fd.append("file", files[i]);
        }
        return axios.post(IMAGE_LIST_BASE_URL + '/uploadMultiple?gameId=' + gameId + '&isMainImage=' + isMainImage, fd, {
            headers: {
                'Content-Type': 'multipart/form-data',
            }
        });
    }

    getMainImageByType(){
        axios.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem('accessToken')}`;
        return axios.get(GAME_LIST_BASE_URL + "/get-main-file")
    }

    getCoverImageByType(typeId){
        axios.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem('accessToken')}`;
        return axios.get(GAME_LIST_BASE_URL + "/get-cover-file/" + typeId)
    }

    getAllType(){
        axios.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem('accessToken')}`;
        return axios.get(TYPE_LIST_BASE_URL + "/get-all");
    }

    getAllImage(id){
        axios.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem('accessToken')}`;
        return axios.get(GAME_LIST_BASE_URL + "/get-cover-file/" + id);
    }
}

export default new UserService()