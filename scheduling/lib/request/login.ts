/**
 * 请求登录
 * author: freezestudio
 * date: 2018-8-1
 * ver: 1.0
 */

import { 
    PackBodyStruct, 
    from_string, 
    to_string
} from "../core/htmix";

export interface IWebSubLogin {
    id_card: string;
    password: string;
}

export class WebSubLogin implements PackBodyStruct {

    constructor(private login?: IWebSubLogin) {

    }

    init(view: ArrayBuffer): void {
        if (this.login) {
            const card_view = from_string(this.login!.id_card);
            const pwd_view = from_string(this.login!.password);
            const card_pointer = new Uint8Array(view, 0, 16);
            const pwd_pointer = new Uint8Array(view, 16, 18);
            card_pointer.set(card_view);
            pwd_pointer.set(pwd_view);
        }
    }

    from(view: ArrayBuffer): void {
        if (!this.login) {
            this.login = {
                id_card: to_string(view, 0, 18),
                password: to_string(view, 18, 16),
            }
        }
    }

    // 预期id_card的长度是18字节的身份证号，
    // 预期password的长度是用户密码的最大16字节
    length(): number {
        return 18 + 16;
    }
}
