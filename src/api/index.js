import axios from 'axios'
import{getToken} from "../utilis/token.js"

// 克隆一个axios对象出来，
// 他的名字叫indexRequest
// 他有一些初始基因，就是设置了基地址，以及设置了请求头携带token
// 所以以后，如果要是通过indexRequest这个对象去发请求，就会自动有基地址和自动携带token了
let indexRequest = axios.create({

    // 基地址
    baseURL:process.env.VUE_APP_URL,
})
// 添加请求拦截器
indexRequest.interceptors.request.use(function (config) {
    // 在发送请求之前做些什么
    config.headers.token=getToken()
    return config;
  }, function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
  });


// 获取登录的用户信息
export function info() {


    return indexRequest({
        url:"/info",
        method:"get"
    })
}

// 退出请求
export function logout() {


    return indexRequest({
        url:"/logout",
        method:"get"
    })
}