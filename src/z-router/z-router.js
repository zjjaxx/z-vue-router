let Vue
class ZRouter {
    constructor(option) {
        this.$option = option
        this.routeMap = {}
        this.app = new Vue({
            data: {
                current: "/test"
            }
        })
    }
    init() {
        this.initEvent()
        this.initRouterMap()
        this.initComponent()
    }
    initEvent() {
        window.addEventListener("hashchange", this.handleChange)
        window.addEventListener("load", this.handleChange)
    }
    handleChange() {
        this.app.current = location.hash.slice(1) || "/"
    }
    initRouterMap() {
        this.$option.routes.forEach(item => {
            this.routeMap[item.path] = item.component
        })
    }
    initComponent() {
        Vue.component("router-link", {
            props: {
                to: {
                    type: String,
                    default: () => {
                        return ""
                    }
                }
            },
            render() {
                return (
                    <a href={"#"+this.to}>{this.$slots.default}</a>
                )
            }
        })
        Vue.component("router-view", {
            render: (h) => {
                console.log("render",this.routeMap[this.app.current])
                return (
                <div>{this.app.current}</div>
                 
                )
            }
        })

    }
}
ZRouter.install = function (_Vue) {
    Vue = _Vue
    Vue.mixin({
        beforeCreate() {
            if (this.$options.router) {
                Vue.prototype.$router = this.$options.router
                this.$options.router.init()
            }
        }
    })
}
export default ZRouter