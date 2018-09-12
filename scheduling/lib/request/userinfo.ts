/**
 * 请求获取用户信息
 * author: freezestudio
 * date: 2018-8-1
 * ver: 1.0
 */

import { 
    PackBodyStruct, 
    from_string, 
    to_string 
} from "../core/htmix";


export interface IWebUserInfo {
    id_card: string;
}

export class WebUserInfo implements PackBodyStruct {

    constructor(private userinfo?: IWebUserInfo) {

    }
    init(view: ArrayBuffer): void {
        if (this.userinfo) {
            const card_view = from_string(this.userinfo.id_card);
            const idcard_pointer = new Int8Array(view, 0, 18);
            idcard_pointer.set(card_view);
        }
    }

    from(view: ArrayBuffer): void {
        if (!this.userinfo) {
            this.userinfo = {
                id_card: to_string(view, 0, 18)
            }
        }
    }
    
    length(): number {
        return 18;
    }
}
