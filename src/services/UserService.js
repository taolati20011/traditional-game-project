import axios from 'axios';

const USER_LIST_BASE_URL = "http://13.210.125.44:8080/api/user";

class UserService {
    getUsers() {
        axios.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem('accessToken')}`;
        return axios.get(USER_LIST_BASE_URL + "/view-all?pageSize=5");
    }
    getEmployees(pageSize, pageNo){
        axios.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem('accessToken')}`;
        return axios.get(USER_LIST_BASE_URL + "/view-all?pageSize=" + pageSize + "&pageNo=" + pageNo);
    }
    getEmployeesByFilter(words){
        axios.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem('accessToken')}`;
        return axios.get(USER_LIST_BASE_URL + "/find-all-by-filter?words="+words);
    }
    getTotalNumberOfEmployee() {
        axios.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem('accessToken')}`;
        return axios.get(USER_LIST_BASE_URL + "/count-user");
    }
    createEmployee(employee){
        axios.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem('accessToken')}`;
        axios.defaults.headers.common['Content-Type'] = 'application/json';
        return axios.post(USER_LIST_BASE_URL + "/signup", employee);
    }

    getEmployeeById(employeeId){
        return axios.get(USER_LIST_BASE_URL + "/get-info-by-id/" + employeeId);
    }

    updateEmployee(employee, employeeId){
        return axios.put(USER_LIST_BASE_URL + '/' + employeeId, employee);
    }

    deleteEmployee(employeeId){
        return axios.delete(USER_LIST_BASE_URL + '/' + employeeId);
    }
}

export default new UserService()