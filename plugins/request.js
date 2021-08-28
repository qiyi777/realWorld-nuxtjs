import axios from "axios"

//创建请求对象
export const request = axios.create({
    baseURL: 'https://conduit.productionready.io'
    // baseURL: 'http://realworld.api.fed.lagounews.com/'
})

//通过插件机制获取上下文对象 (query, params, req, res, app, store)
//请求拦截
//插件导出必须作为 default 成员
export default ({ store }) => {

    //请求拦截器
    request.interceptors.request.use(function (config) {

        const { user } = store.state

        if (user && user.token) {
            //设置用户token
            config.headers.Authorization = `Token ${user.token}`
        }

        return config
    }, function (error) {

        return Promise.reject(error)
    })
}
