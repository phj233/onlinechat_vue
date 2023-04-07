import {createDiscreteApi} from "naive-ui";

const naiveMessage = createDiscreteApi(["message"]).message
export const showMessage = (status:number,info:String) => {
    if (status === 0) {
        // @ts-ignore
        naiveMessage.success(info)
    }else {
        // @ts-ignore
        naiveMessage.error(info)
    }
};