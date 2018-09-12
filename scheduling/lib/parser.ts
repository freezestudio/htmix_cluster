/**
 * url解析文件
 * author: freezestudio
 * date: 2018-8-1
 * ver: 1.0
 */
import { PackHeader, checksum, http_header } from "./core/htmix";
import { ClientRequest } from "http";

import {
    HTMIX_SUB_USER_REGISTER,
    HTMIX_SUB_USER_LOGIN,
    HTMIX_MAIN_USER_MANAGER,
    HTMIX_MAIN_INFO_MANAGER,
    HTMIX_SUB_INFO_NEWS,
    HTMIX_SUB_INFO_TIPS,
    HTMIX_SUB_INFO_STORY_CARTOON,
    HTMIX_SUB_INFO_ALARM,
    HTMIX_SUB_USER_USERINFO,
    HTMIX_MAIN_DAILY,
    HTMIX_SUB_DAILY_LIB,
    HTMIX_SUB_DAILY_KNOWLEDGE,
    HTMINX_MAIN_USER_EXAMINTION,
    HTMIX_SUB_CHANGE_PASSWORD,
    HTMIX_SUB_USER_CHANGE_MOBILE,
    HTMINX_SUB_EXAMINTION_SCORE
} from './protocol';

import { 
    on_request_register,
    on_request_login, 
    on_request_user_info,
    on_request_update_pwd,
    on_request_update_phone,
    on_request_news,
    on_request_tips,
    on_request_story_cartoon,
    on_request_alarm,
    on_request_daily_knowledge,
    on_request_examination
} from "./request/request";

// ┌─────────────────────────────────────────────────────────────────────────────────────────────┐
// │                                            href                                             │
// ├──────────┬──┬─────────────────────┬─────────────────────┬───────────────────────────┬───────┤
// │ protocol │  │        auth         │        host         │           path            │ hash  │
// │          │  │                     ├──────────────┬──────┼──────────┬────────────────┤       │
// │          │  │                     │   hostname   │ port │ pathname │     search     │       │
// │          │  │                     │              │      │          ├─┬──────────────┤       │
// │          │  │                     │              │      │          │ │    query     │       │
// "  https:   //    user   :   pass   @ sub.host.com : 8080   /p/a/t/h  ?  query=string   #hash "
// │          │  │          │          │   hostname   │ port │          │                │       │
// │          │  │          │          ├──────────────┴──────┤          │                │       │
// │ protocol │  │ username │ password │        host         │          │                │       │
// ├──────────┴──┼──────────┴──────────┼─────────────────────┤          │                │       │
// │   origin    │                     │       origin        │ pathname │     search     │ hash  │
// ├─────────────┴─────────────────────┴─────────────────────┴──────────┴────────────────┴───────┤
// │                                            href                                             │
// └─────────────────────────────────────────────────────────────────────────────────────────────┘

export function parse_pack_get(proxyReq: ClientRequest, htmix_head: string, htmix_body?: string) {
    const proto = PackHeader.from(htmix_head);
    if (htmix_body) {
        parse_pack('GET', proxyReq, proto, htmix_body);
    } else {
        parse_pack('GET', proxyReq, proto);
    }
}

export function parse_pack_post(proxyReq: ClientRequest, htmix_head: string, post_data?: any) {
    const proto = PackHeader.from(htmix_head);
    if (post_data) {
        parse_pack('POST', proxyReq, proto, post_data);
    } else {
        parse_pack('POST', proxyReq, proto);
    }

}

function parse_pack(method: 'GET' | 'POST' | string,
    proxyReq: ClientRequest, proto: PackHeader, data?: any) {
    const verify = verify_package(proto);
    if (verify) {
        switch (proto.main_code) {
            case HTMIX_MAIN_USER_MANAGER: 
                parse_user_manager(method, proxyReq, proto.sub_code, data);
                break;
            case HTMIX_MAIN_INFO_MANAGER: 
                parse_info_manager(method, proxyReq, proto.sub_code, data);
                break;
            case HTMIX_MAIN_DAILY: 
                parse_daily(proxyReq, proto.sub_code, data);
                break;
            case HTMINX_MAIN_USER_EXAMINTION: 
                parse_user_examintion(method, proxyReq, proto.sub_code, data);
                break;
            default:
                break;
        }
    }
}

function verify_package(proto: PackHeader) {
    if (proto.version !== 1) {
        return false;
    }
    const check = checksum(proto.to_uint8());
    if ((check & 0xff) !== 0) {
        return false;
    }
    return true;
}

function parse_user_manager(method: 'GET' | 'POST' | string,
    proxyReq: ClientRequest, sub_code: number, data?: any) {

    switch (sub_code) {
        case HTMIX_SUB_USER_REGISTER:
            on_request_register(proxyReq, data);
            break;
        case HTMIX_SUB_USER_LOGIN:
            on_request_login(proxyReq, data);
            break;
        case HTMIX_SUB_USER_USERINFO:
            on_request_user_info(proxyReq, data);
            break;
        case HTMIX_SUB_CHANGE_PASSWORD:
            on_request_update_pwd(proxyReq, data);
            break;
        case HTMIX_SUB_USER_CHANGE_MOBILE:
            on_request_update_phone(proxyReq, data);
            break;
        default:
            break;
    }
}

function parse_info_manager(method: 'GET' | 'POST' | string,
    proxyReq: ClientRequest, sub_code: number, data?: any) {

    switch (sub_code) {
        case HTMIX_SUB_INFO_NEWS: 
            on_request_news(proxyReq, data)
            break;
        case HTMIX_SUB_INFO_TIPS: 
            on_request_tips(proxyReq, data)
            break;
        case HTMIX_SUB_INFO_STORY_CARTOON: 
            on_request_story_cartoon(proxyReq, data);
            break;
        case HTMIX_SUB_INFO_ALARM: 
            on_request_alarm(proxyReq, data)
            break;
        default:
            break;
    }
}

function parse_daily(proxyReq: ClientRequest, sub_code: number, data: any) {
    if (sub_code === HTMIX_SUB_DAILY_LIB) {
        proxyReq.setHeader('daily-lib', 'all');
        proxyReq.removeHeader(http_header);
        console.log('request daily lib');
    } else if (sub_code === HTMIX_SUB_DAILY_KNOWLEDGE) {
        on_request_daily_knowledge(proxyReq, data);
    }
}

function parse_user_examintion(method: 'GET' | 'POST' | string,
    proxyReq: ClientRequest, sub_code: number, data?: any) {
    switch (sub_code) {
        case HTMINX_SUB_EXAMINTION_SCORE:
            on_request_examination(proxyReq, data);
            break;
        default:
            break;
    }

}