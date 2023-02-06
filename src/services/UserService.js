import axios from 'axios';

const USER_LIST_BASE_URL = "http://localhost:8080/api/user/view-all?pageSize=5";

class UserService {
    getUsers() {
        axios.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem('accessToken')}`;
        return axios.get(USER_LIST_BASE_URL);
    }
    getEmployees(){
        axios.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem('accessToken')}`;
        return axios.get(USER_LIST_BASE_URL);
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