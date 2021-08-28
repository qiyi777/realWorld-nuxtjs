const cookieparser = process.server ? require('cookieparser') : undefined


// 在服务端渲染期间运行的都是同一个实例
// 防止冲突，要把state定义成一个函数，返回数据对象
export const state = () => {
    return {
        user: null
    }
}

export const mutations = {
    setUser (state, data) {
        state.user = data
    }
}


export const actions = {
    // nuxtServerInit 是一个特殊的 action 方法
    // 这个action 会在服务器渲染期间自动调用
    // 作用：初始化容器数据，传递数据给客户端使用
    nuxtServerInit ({ commit }, { req }) {
        let user = null

        //如果请求头中有Cookie
        if (req.headers.cookie) {
            // 使用cookieparser 把 cookie 字符串转为js对象
            const parsed = cookieparser.parse(req.headers.cookie)
            try {
                user = JSON.parse(parsed.user)
                console.log(user)
            } catch (err) {

            }
        }

        //提交 mutation 修改 state 状态
        commit('setUser', user)
    }

}