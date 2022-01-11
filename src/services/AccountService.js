import axios from 'axios'

const ACCOUNT_API_BASE_URL = 'http://localhost:8080/api/v1/accounts'
const ROLE_API_BASE_URL = 'http://localhost:8080/api/v1/roles'

class AccountService{

    getAccounts(){
        return axios.get(ACCOUNT_API_BASE_URL);
    }

    getAccountDetail(id){
        return axios.get(ACCOUNT_API_BASE_URL + "/" + id);
    }

    createAccount(body){
        return axios.post(ACCOUNT_API_BASE_URL, body);
    }

    getRoles(){
        return axios.get(ROLE_API_BASE_URL );
    }

    login(body){
        return axios.post(ACCOUNT_API_BASE_URL + "/login", body);
    }

    addRoleToAccount(form){
        return axios.post(ACCOUNT_API_BASE_URL + "/role/add", form);
    }

    removeRoleFromAccount(form){
        return axios.post(ACCOUNT_API_BASE_URL + "/role/remove", form);
    }

}
export default new AccountService()