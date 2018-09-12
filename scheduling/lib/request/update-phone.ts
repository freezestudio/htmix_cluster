/**
 * 请求更新手机号
 * author: freezestudio
 * date: 2018-8-1
 * ver: 1.0
 */

import { PackBodyStruct, from_string, to_string } from "../core/htmix";


export interface IWebUserInfo {
    id_card: string;
    phone:string;
}

export class WebUpdatePhone implements PackBodyStruct {

    constructor(private user?: IWebUserInfo) {

    }
    init(view: ArrayBuffer): void {
        if (this.user) {
            const card_view = from_string(this.user.id_card);
            const phone_view = from_string(this.user.phone);
            const idcard_pointer = new Int8Array(view, 0, 18);
            const phone_pointer = new Int8Array(view, 18, 11);
            idcard_pointer.set(card_view);
             phone_pointer.set(phone_view);
        }
    }

    from(view: ArrayBuffer): void {
        if (!this.user) {
            this.user = {
                id_card: to_string(view, 0, 18),
                phone: to_string(view,18,11)
            }
        }
    }


    length(): number {
        return 18 + 11;
    }
}
