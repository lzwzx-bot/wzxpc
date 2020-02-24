import axios from "axios"

export function sendMS (data){
    return axios({
        url:process.env.VUE_APP_URL+'/sendsms',
              method:'post',
              data,
              withCredentials:true
    });
}
export function reg(data){
    return axios({
        url:process.env.VUE_APP_URL+'/register',
              method:'post',
              data,
              withCredentials:true
    });
}