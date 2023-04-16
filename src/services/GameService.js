import axios from 'axios';

const GAME_LIST_BASE_URL = "http://localhost:8080/api/game";

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
}

export default new UserService()