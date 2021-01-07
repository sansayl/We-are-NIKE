import axios from 'axios'

const http=axios.create({
    baseURL:'',//如果你配置了，那么所有的url前面都会拼接一个    baseURL
    timeout:10000, //过期时间  ajax请求超多这个时间自动中断
    headers:{
        "Content-Type":"application/json"
    }
});

//axios请求前的拦截
http.interceptors.request.use(req=>{
    //从session中获取token
    let token = sessionStorage.getItem('token');
    //如果有就在请求投中设置  req.headers['xxxx']=token   xxxx这个token的名字是后台定的。
    token && (req.headers['token']=token);
    return req;
},error=>{
    Promise.reject(error)
});

export default  http