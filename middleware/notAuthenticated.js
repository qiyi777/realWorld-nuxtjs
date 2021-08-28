/**
 * 已经登录过不退回登录页
 * 而是回到首页
*/
export default function ({ store, redirect }) {
    if (store.state.user) {
        return redirect('/')
    }
}