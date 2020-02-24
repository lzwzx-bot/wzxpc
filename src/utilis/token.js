export function getToken(){
    return window.localStorage.getItem('mmtoken');
}
export function setToken(token){
    window.localStorage.setItem('mmtoken',token);
}
export function removeToken(){
    window.localStorage.removeItem('mmtoken')
}