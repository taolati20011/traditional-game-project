import axios from 'axios';

const USER_LIST_BASE_URL = "http://localhost:8080/api/user/view-all?pageSize=5";

class UserService {
    getUsers() {
        return axios.get(USER_LIST_BASE_URL);
    }
}

export default new UserService()