import axios from 'axios'

const ROLE_API_BASE_URL = 'http://localhost:8080/api/v1/roles'

class RoleService{

    getRoles(){
        return axios.get(ROLE_API_BASE_URL );
    }

    getRoleDetail(id){
        return axios.get(ROLE_API_BASE_URL + "/" + id);
    }

    getPermissions(){
        return axios.get(ROLE_API_BASE_URL + "/permission");
    }

    createRole(body){
        let data = this.convert(body)
        return axios.post(ROLE_API_BASE_URL, data)
    }

    updateRole(id, body){
        let data = this.convert(body)
        return axios.put(ROLE_API_BASE_URL + '/' + id, data)
    }

    deleteRole(id){
        return axios.delete(ROLE_API_BASE_URL + '/' + id)
    }

    convert(body){
        let arr = [];
        for (let i = 0; i < body.permissions.length; i++) {
            let pri = {
                id: body.permissions[i]
            }
            arr.push(pri)
        }
        let data = {
            name : body.name,
            permissions: arr
        }
        return data
    }

}
export default new RoleService()