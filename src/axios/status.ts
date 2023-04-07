import { MessageReactive } from "naive-ui";

const naiveMessage = useMessage();
export const showMessage = (status:number|string) : MessageReactive => {
    let message:string = "";
    switch (status) {
        case 0:
            message = "SUCCESS";
            naiveMessage.success(message);
            break;
        default:
            message = `连接出错(${status})!`;
    }
    return naiveMessage.error(`${message}，请检查网络或联系管理员！`);
};