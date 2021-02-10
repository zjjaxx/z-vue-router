import ZRouter from "./z-router"
import Home from "../pages/Home"
import Test from "../pages/Test"
import Vue from "vue"
Vue.use(ZRouter)
const router =new ZRouter({
    routes:[
        {
            path:"/",
            component:Home
        },
        {
            path:"/test",
            component:Test
        }
    ]
})
export default router