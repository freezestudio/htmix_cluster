/**
 * 请求注册
 * author: freezestudio
 * date: 2018-8-1
 * ver: 1.0
 */

import { 
    PackBodyStruct, 
    from_string, 
    to_string
} from "../core/htmix";

//包结构

export interface IWebSubRegister {
    id_card: string;
    password: string;
    mobile: string;
}

// 用户注册包
export class WebSubRegister implements PackBodyStruct {

    constructor(private register?: IWebSubRegister) {

    }

    init(view: ArrayBuffer): void {
        if (this.register) {
            const card_view = from_string(this.register!.id_card);
            const pwd_view = from_string(this.register!.password);
            const m_view = from_string(this.register!.mobile);
            const card_pointer = new Int8Array(view, 0, 18);
            const pwd_pointer = new Int8Array(view, 18, 16);
            const m_pointer = new Int8Array(view, 18 + 16, 11);
            card_pointer.set(card_view);
            pwd_pointer.set(pwd_view);
            m_pointer.set(m_view);
        }
    }

    from(view: ArrayBuffer): void {
        if (!this.register) {
            this.register = {
                id_card: to_string(view, 0, 18),
                password: to_string(view, 18, 16),
                mobile: to_string(view, 18 + 16, 11),
            }
        }
    }

    // 预期id_card的长度是18字节的身份证号，
    // 预期password的长度是用户密码的最大16字节，
    // 预期mobile的长度是手机号码的长度11字节。
    length(): number {
        return 18 + 16 + 11;
    }
}
