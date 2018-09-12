/**
 * 请求登录
 * author: freezestudio
 * date: 2018-8-1
 * ver: 1.0
 */

import { PackBodyStruct, from_string, to_string } from "../core/htmix";

export interface IWebSubSignIn {
    id_card: string;
    password: string;
}

export class WebSignIn implements PackBodyStruct{

    constructor(private signin?:IWebSubSignIn){

    }
    init(view: ArrayBuffer): void {
       if(this.signin){
           const card_view = from_string(this.signin.id_card);
           const pwd_view = from_string(this.signin.password);
           const idcard_pointer = new Int8Array(view,0,18);
           const pwd_pointer = new Int8Array(view,18,16);
           idcard_pointer.set(card_view);
           pwd_pointer.set(pwd_view);
       }
    }    
    
    from(view: ArrayBuffer): void {
       if(!this.signin){
           this.signin = {
               id_card:to_string(view,0,18),
               password:to_string(view,18,16)
           }
       }
    }


    length(): number {
       return 18 + 16;
    }
}
