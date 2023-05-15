/*
 * @Description: 自定义router
 * @Author: wangfengxiang
 * @Date: 2023-03-05 08:18:33
 * @LastEditTime: 2023-05-15 22:36:29
 * @LastEditors: wangfengxiang
 */
class HistoryRouter {
    constructor() {
        this.current = null
    }

}
class vueRouter {
    constructor(options) {
        this.mode = options.mode || 'hash'
        this.routers = options.routers || []
        this.history = new HistoryRouter
        this.init()
    }
    init() {
        if (this.mode == 'hash') {
            location.hash ? '' : location.hash = '/'
            // 页面初始设置current
            window.addEventListener('load', () => {
                this.history.current = loction.hash.slice(1)
            })
            // hash更新current
            window.addEventListener('hashchange', () => {
                this.history.current = loction.hash.slice(1)
            })
        } else {
            location.pathname ? '' : location.pathname = '/'
            // 页面初始设置current
            window.addEventListener('load', () => {
                this.history.current = loction.pathname
            })
            // history更新current
            window.addEventListener('popstate', () => {
                this.history.current = loction.pathname
            })
        }
    }
}

vueRouter.install = function(Vue){
    Vue.mixin({
        beforeCreate(){
            // $options是new vue时传入的参数
            if(this.$options && this.$options.router){
                // 此时this是根组件实例
                this._root = this
                this._router=this.$options.router

            }

            // 监听this._router.history上的current属性  ？？
            vue.util.defineReactive(this,'current',this._router.history)
        }
    })
}