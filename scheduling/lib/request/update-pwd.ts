/**
 * 请求更新密码
 * author: freezestudio
 * date: 2018-8-1
 * ver: 1.0
 */

import { PackBodyStruct, from_string, to_string } from "../core/htmix";


export interface IWebUserInfo {
    id_card: string;
    password: string;
}

export class WebUpdatePwd implements PackBodyStruct {

    constructor(private user?: IWebUserInfo) {

    }
    init(view: ArrayBuffer): void {
        if (this.user) {
            const card_view = from_string(this.user.id_card);
            const pwd_view = from_string(this.user.password);
            const idcard_pointer = new Int8Array(view, 0, 18);
            const pwd_pointer = new Int8Array(view, 18, 16);
            idcard_pointer.set(card_view);
            pwd_pointer.set(pwd_view);
        }
    }

    from(view: ArrayBuffer): void {
        if (!this.user) {
            this.user = {
                id_card: to_string(view, 0, 18),
                password: to_string(view, 18, 16),
            }
        }
    }


    length(): number {
        return 18 + 16;
    }
}
