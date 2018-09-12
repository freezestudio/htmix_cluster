/**
 * 请求
 * author: freezestudio
 * date: 2018-8-1
 * ver: 1.0
 */

 import { ClientRequest } from "http";
import { PackBody, send_data, http_header } from "../core/htmix";
import { WebSubRegister } from "./register";
import { WebSubLogin } from "./login";
import { WebUserInfo } from "./userinfo";
import { WebUpdatePwd } from "./update-pwd";
import { WebUpdatePhone } from "./update-phone";
import { MsgInfo } from "./msginfo";
import { WebExamination } from "./examination";
import { WebSignIn } from "./signin";

export function on_request_register(proxyReq: ClientRequest, data: any) {
    on_request(proxyReq, new WebSubRegister(), data);
    console.log('request user register');
}


export function on_request_login(proxyReq: ClientRequest, data: any) {
    on_request(proxyReq, new WebSubLogin(), data);
    console.log('request user login');
}

export function on_request_signin(proxyReq: ClientRequest, data: any) {
    on_request(proxyReq, new WebSignIn(), data);
    console.log('request user signin');
}

export function on_request_user_info(proxyReq: ClientRequest, data: any) {
    on_request(proxyReq, new WebUserInfo(), data);
    console.log('request user info');
}


export function on_request_update_pwd(proxyReq: ClientRequest, data: any) {
    on_request(proxyReq, new WebUpdatePwd(), data);
    console.log('request update pwd');
}


export function on_request_update_phone(proxyReq: ClientRequest, data: any) {
    on_request(proxyReq, new WebUpdatePhone(), data);
    console.log('request update phone');
}


export function on_request_news(proxyReq: ClientRequest, data: any) {
    on_request(proxyReq, new MsgInfo(), data);
    console.log('request news');
}

export function on_request_story_cartoon(proxyReq: ClientRequest, data: any) {
    on_request(proxyReq, new MsgInfo(), data);
    console.log('request story cartoon');
}

export function on_request_tips(proxyReq: ClientRequest, data: any) {
    on_request(proxyReq, new MsgInfo(), data);
    console.log('request tips');
}

export function on_request_alarm(proxyReq: ClientRequest, data: any) {
    on_request(proxyReq, new MsgInfo(), data);
    console.log('request alarm');
}

export function on_request_daily_knowledge(
    proxyReq: ClientRequest,
    data?: any) {
    on_request(proxyReq, new MsgInfo(), data);
    console.log('request daily knowledge');
}

export function on_request_examination(proxyReq: ClientRequest, data: any) {
    on_request(proxyReq, new WebExamination(), data);
    console.log('trans idcard,score');
}

//////////////////////////////////////////////////////////////////////////////
// 

function on_request(proxyReq: ClientRequest, pack_type: any, data: any) {
    if (!data) return;

    const body = new PackBody(pack_type);
    body.from(data);

    const payload = body.payload;
    if (!payload) return;
    
    const body_data = JSON.stringify(payload);
    proxyReq.setHeader(send_data, body_data);
    proxyReq.removeHeader(http_header);
}
