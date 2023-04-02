import axios from 'axios';

const USER_LIST_BASE_URL = "http://13.210.125.44:8080/api/user/view-all?pageSize=5";

class UserService {
    getUsers() {
        axios.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem('accessToken')}`;
        return axios.get(USER_LIST_BASE_URL);
    }
    getEmployees(){
        axios.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem('accessToken')}`;
        return axios.get(USER_LIST_BASE_URL);
    }
    getEmployeesByFilter(words){
        axios.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem('accessToken')}`;
        return axios.get("http://13.210.125.44:8080/api/user/find-all-by-filter?words="+words);
    }
    createEmployee(employee){
        return axios.post(USER_LIST_BASE_URL, employee);
    }

    getEmployeeById(employeeId){
        return axios.get(USER_LIST_BASE_URL + '/' + employeeId);
    }

    updateEmployee(employee, employeeId){
        return axios.put(USER_LIST_BASE_URL + '/' + employeeId, employee);
    }

    deleteEmployee(employeeId){
        return axios.delete(USER_LIST_BASE_URL + '/' + employeeId);
    }
}

export default new UserService()