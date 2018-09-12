/**
 * 协议文件
 * author: freezestudio
 * date: 2018-8-1
 * ver: 1.0
 */

import { PackHeader } from './header';
import { PackBody } from './body';

/**
 * 协议的封装与解析
 */

//
// +---------------+---------------+---------------+---------------+
// |       0       |       1       |       2       |       3       |
// +-------+-------+-------+-------+-------------------------------+
// |   4   |   4   |   4   |   4   |              16               |
// +-------+-------+---------------+-------------------------------+
// |  ver  |  auth |  enc  |  rev  |              len              |
// +-------+-------+-------+-------+-------------------------------+
// |      cs       |     main      |              sub              |
// +-------+-------+---------------+-------------------------------+
// |       4       |       5       |       6       |       7       |
// +-------+-------+-------+-------+-------------------------------+
//

export { checksum, to_string, from_string, to_number, from_number } from './utils';
export { PackHeader } from './header';
export { PackBodyStruct, PackBody, tail_placeholder } from './body';

// 编码方式，默认为base64
export const YL_ENC_NONE = 0x00;
export const YL_ENC_BASE64 = 0x1;
export const YL_ENC_MD5 = 0x02;
export const YL_ENC_AES = 0x04;
export const YL_ENC_SHA = 0x08;

export const http_header = 'htmix-protocol';
export const send_data = 'htmix-data';

export interface Bundle {
    [http_header]: string;
    [send_data]: string;
    [index: string]: string;
}

/**
 * 封装协议包
 * @param main 主协议号
 * @param sub 子协议号
 * @param body_interface 协议体数据
 */
export function bundle(main: number, sub: number, body_interface: any) {
    const body = new PackBody(body_interface);
    const header = new PackHeader();
    header.main_code = main;
    header.sub_code = sub;
    header.length = body.length();
    header.calc_checksum();
    return <Bundle>{
        [http_header]: header.to_base64(),
        [send_data]: body.to_base64(),
    }
}

/**
 * 解析协议头
 * @param encode Base64编码的协议头
 */
export function debundle_header(encode: string) {
    const header = new PackHeader(encode);
    return header;
}

/**
 * 解析协议体
 * @param encode Base64编码的协议体
 * @param body_interface 协议体封装的结构
 */
export function debundle_body(encode: string, body_interface: any) {
    const body = new PackBody(body_interface);
    body.from(encode);
    return body;
}
