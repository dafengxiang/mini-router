/*
 * @Description: 自定义router
 * @Author: wangfengxiang
 * @Date: 2023-03-05 08:18:33
 * @LastEditTime: 2023-05-16 08:42:28
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
        // this.routers = options.routers || []
        this.history = new HistoryRouter

        this.routes = options.routes || []
        this.routesMap = this.createMap(this.routes)

        this.init()
    }
    init() {
        if (this.mode == 'hash') {
            location.hash ? '' : location.hash = '/'
            // 页面初始设置current
            window.addEventListener('load', () => {
                this.history.current = location.hash.slice(1)
            })
            // hash更新current
            window.addEventListener('hashchange', () => {
                this.history.current = location.hash.slice(1)
            })
        } else {
            location.pathname ? '' : location.pathname = '/'
            // 页面初始设置current
            window.addEventListener('load', () => {
                this.history.current = location.pathname
            })
            // history更新current
            window.addEventListener('popstate', () => {
                this.history.current = location.pathname
            })
        }
    }
    createMap(router) {
        return router.reduce((memo, current) => {
            memo[current.path] = current.component
            return memo
        }, {})
    }
}

// 插件注册混入逻辑
vueRouter.install = function (Vue) {
    Vue.mixin({
        beforeCreate() {
            // $options是new vue时传入的参数
            // new Vue({router})
            if (this.$options && this.$options.router) {
                // 此时this是根组件实例
                this._root = this // 意义何在？
                this._router = this.$options.router
                // 监听this._router.history上的current属性  ？？
                Vue.util.defineReactive(this, 'current', this._router.history)

            } else {
                // 向上一级查找根实例
                this._root = this.$patent._root
            }

            // 健壮性：可使用$router，不可修改（没有set）
            Object.defineProperty(this, '$router', {
                get() {
                    return this._root._router
                }
            })
        }
    })
    // 注册router-view组件，根据current变量渲染组件
    Vue.component('router-view', {
        render(h) {
            //如何根据当前current，获取当前对应的组件
            const current = this._self._root._router.history.current,
                routesMap = this._self._root._router.routesMap

            return h(routesMap[current])
        }
    })
}

export default vueRouter