import {NIcon} from "naive-ui";
import {RouterLink} from "vue-router";

export const renderIcon = (data:String) => {
    // @ts-ignore
    return h(NIcon,()=>null,() => h(
        Icon,{
            icon: data
        },()=>null
    ))
}

export const renderLink = (label:String,name:String) => {
    // @ts-ignore
    return h(RouterLink,{
        to: {
            name: name
        }
    },  {default: () => label})

}
