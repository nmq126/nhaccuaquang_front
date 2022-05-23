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

    update(id, form){
        return axios.put(ACCOUNT_API_BASE_URL + "/" + id, this.convert(form));
    }

    removeRoleFromAccount(form){
        return axios.post(ACCOUNT_API_BASE_URL + "/role/remove", form);
    }

    removePermissionFromAccount(form){
        return axios.post(ACCOUNT_API_BASE_URL + "/permission/remove", form);
    }

    convert(body){
        let arrRole = [];
        let arrPermission = [];
        for (let i = 0; i < body.roles.length; i++) {
            let pri = {
                id: body.roles[i]
            }
            arrRole.push(pri)
        }
        for (let i = 0; i < body.permissions.length; i++) {
            let pri = {
                id: body.permissions[i]
            }
            arrPermission.push(pri)
        }
        let data = {
            roles: arrRole,
            permissions: arrPermission
        }
        console.log(data)
        return data
    }
}
export default new AccountService()