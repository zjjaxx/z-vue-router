let Vue
class ZVueRouter {
    constructor(options) {
        this.$options = options
        this.state = Vue.observable({ current: "/" })
        window.addEventListener("hashchange", this.hashChange.bind(this))
        window.addEventListener("load", this.hashChange.bind(this))
    }
    hashChange() {
        let url = window.location.hash.slice(1)
        this.state.current = url
    }
}

ZVueRouter.install = (_Vue) => {
    Vue = _Vue
    Vue.mixin({
        beforeCreate: function () {
            if (this.$options.router) {
                Vue.prototype.$router = this.$options.router
            }
        }
    })
    Vue.component("router-link", {
        props: {
            to: {
                type: String,
                required: true,
                default: () => {
                    return ""
                }
            }
        },
        render(h) {
            return h("a", { attrs: { href: "#" + this.to } }, this.$slots.default)
        }
    })
    Vue.component("router-view", {
        render(h) {
            let currentComponent = this.$router.$options.routes.filter(route => {
                return route.path == this.$router.state.current
            })
            return h(currentComponent[0].component)
        }
    })
}
export default ZVueRouter