import axios from 'axios';

const GAME_LIST_BASE_URL = "http://localhost:8080/api/game/get-all";

class UserService {
    getGames(){
        axios.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem('accessToken')}`;
        return axios.get(GAME_LIST_BASE_URL);
    }

    getGameByFilter(words){
        axios.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem('accessToken')}`;
        return axios.get("http://localhost:8080/api/game/get-all-by-filter?words="+words);
    }

    createGame(employee){
        return axios.post(GAME_LIST_BASE_URL, employee);
    }

    getGameById(employeeId){
        return axios.get(GAME_LIST_BASE_URL + '/' + employeeId);
    }

    updateGame(employee, employeeId){
        return axios.put(GAME_LIST_BASE_URL + '/' + employeeId, employee);
    }

    deleteGame(employeeId){
        return axios.delete(GAME_LIST_BASE_URL + '/' + employeeId);
    }
}

export default new UserService()