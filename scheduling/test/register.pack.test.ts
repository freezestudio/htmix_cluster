import tape from 'tape';
const test = tape;

import http from 'http';
import { PackHeader, PackBody, send_data } from '../lib/core/htmix';
import {
    HTMIX_SUB_USER_REGISTER,
    HTMIX_MAIN_USER_MANAGER,
    HTMIX_SUB_USER_LOGIN,
    HTMIX_MAIN_INFO_MANAGER,
    HTMIX_SUB_INFO_NEWS,
    HTMINX_MAIN_USER_EXAMINTION,
    HTMINX_SUB_EXAMINTION_SCORE
} from '../lib/protocol';
import { WebSubRegister } from '../lib/request/register';
import { WebSubLogin } from '../lib/request/login';
import { WebSignIn } from '../lib/request/signin';
import { cluster_config } from '../config';
import { WebExamination } from '../lib/request/examination';

// test('send register package [head+body] use GET', t => {
//     const body = new PackBody(new WebSubRegister({
//         id_card: '620001199003141234',
//         password: 'password',
//         mobile: '13234567890',
//     }));

//     const head = new PackHeader();
//     head.main_code = HTMIX_MAIN_USER_MANAGER;
//     head.sub_code = HTMIX_SUB_USER_REGISTER;

//     //注意设置长度和计算检验的次序
//     head.length = body.length();
//     head.calc_checksum();

//     const head_b64 = head.to_base64();
//     const body_b64 = body.to_base64();

//     const request = http.request({
//         method: 'GET',
//         port: cluster_config.port,
//         hostname: cluster_config.host,
//         path: '/require/v1/user_register',
//         headers: {
//             'Htmix-Protocol': `${head_b64};${body_b64}`
//         }
//     }, res => {
//         let data = '';
//         res.on('data', chunk => {
//             data += chunk;
//         });
//         res.on('end', () => {
//             const result = JSON.parse(data);
//             console.log(`on response: --`);
//             console.log(result);
//             t.equal(result['status'], 10003);
//             t.equal(result['error_code'], 10300);
//             t.same(result['message'], '此账号已经注册，请直接登录');
//             t.end();
//         });
//         res.on('error', err => {
//             console.log(`response error: ${err}`);
//             t.is(err, undefined);
//             t.end();
//         });
//     });
//     request.end();
// });

// test('send login package [head+body] use GET', t => {
//     const body = new PackBody(new WebSubLogin({
//         id_card: '620001199003141234',
//         password: 'password',
//     }));

//     const head = new PackHeader();
//     head.main_code = HTMIX_MAIN_USER_MANAGER;
//     head.sub_code = HTMIX_SUB_USER_LOGIN;

//     //注意设置长度和计算检验的次序
//     head.length = body.length();
//     head.calc_checksum();

//     const head_b64 = head.to_base64();
//     const body_b64 = body.to_base64();

//     const request = http.request({
//         method: 'GET',
//         port: cluster_config.port,
//         hostname: cluster_config.host,
//         path: '/require/v1/user_login',
//         headers: {
//             'Htmix-Protocol': `${head_b64};${body_b64}`
//         }
//     }, res => {
//         let data = '';
//         res.on('data', chunk => {
//             data += chunk;
//         });
//         res.on('end', () => {
//             const result = JSON.parse(data);
//             console.log(`on response: --`);
//             console.log(result);
//             t.equal(result['status'], 1);
//             t.equal(result['error_code'], 0);
//             t.same(result['message'], '用户登录成功');
//             t.end();
//         });
//         res.on('error', err => {
//             console.log(`response error: ${err}`);
//             t.is(err, undefined);
//             t.end();
//         });
//     });
//     request.end();
// });

// test('send register package [head+body] use POST', t => {
//     const body = new PackBody(new WebSubRegister({
//         id_card: '620001199003141234',
//         password: 'password',
//         mobile: '1321234567890'
//     }));

//     const head = new PackHeader();
//     head.main_code = HTMIX_MAIN_USER_MANAGER;
//     head.sub_code = HTMIX_SUB_USER_REGISTER;

//     //注意设置长度和计算检验的次序
//     head.length = body.length();
//     head.calc_checksum();

//     const head_b64 = head.to_base64();
//     const body_b64 = body.to_base64();

//     // 将要post的数据
//     const post_data = `${send_data}=${body_b64}`;
//     const request = http.request({
//         method: 'POST',
//         port: cluster_config.port,
//         hostname: cluster_config.host,
//         path: '/require/v1/user_register',
//         headers: {
//             'Htmix-Protocol': `${head_b64}`,
//             //'Content-Type':'application/json',
//             'Content-Length': post_data.length,
//         }
//     }, res => {
//         let data: any;
//         res.on('data', chunk => {
//             data += chunk;
//         });
//         res.on('end', () => {
//             console.log(`on response: ${data}`);
//             t.equal(JSON.parse(data).error_code, 0);
//             t.end();
//         });
//         res.on('error', err => {
//             console.log(`response error: ${err}`);
//             t.is(err, undefined);
//             t.end();
//         });
//     });
//     request.write(post_data);
//     request.end();
// });
// test('测试注册', t => {
//     const body = new PackBody(new WebSubRegister({
//         id_card: '620001199003141234',
//         password: 'abcd',
//         mobile: '13234567890',
//     }));

//     const head = new PackHeader();
//     head.main_code = HTMIX_MAIN_USER_MANAGER;
//     head.sub_code = HTMIX_SUB_USER_REGISTER;

//     //注意设置长度和计算检验的次序
//     head.length = body.length();
//     head.calc_checksum();

//     const head_b64 = head.to_base64();
//     const body_b64 = body.to_base64();

//     const request = http.request({
//         method: 'GET',
//         port: cluster_config.port,
//         hostname: cluster_config.host,
//         path: '/require/v1/user_register',
//         headers: {
//             'Htmix-Protocol': `${head_b64};${body_b64}`
//         }
//     }, res => {
//         let data = '';
//         res.on('data', chunk => {
//             data += chunk;
//         });
//         res.on('end', () => {
//             const result = JSON.parse(data);
//             console.log(`on response: --`);
//             console.log(result);
//             // t.equal(result['status'],10003);
//             // t.equal(result['error_code'],10300);
//             // t.same(result['message'],'此账号已经注册，请直接登录');
//             // t.end();
//         });
//         res.on('error', err => {
//             console.log(`response error: ${err}`);
//             t.is(err, undefined);
//             t.end();
//         });
//     });
//     request.end();
// });

// test('测试登录', t => {
//     const body = new PackBody(new WebSignIn({
//         id_card: '620001199003141234',
//         password: 'password',
//     }));

//     const head = new PackHeader();
//     head.main_code = HTMIX_MAIN_USER_MANAGER;
//     head.sub_code = HTMIX_SUB_USER_LOGIN;

//     //注意设置长度和计算检验的次序
//     head.length = body.length();
//     head.calc_checksum();

//     const head_b64 = head.to_base64();
//     const body_b64 = body.to_base64();

//     const request = http.request({
//         method: 'POST',
//         port: cluster_config.port,
//         hostname: cluster_config.host,
//         path: '/require/v1/user_signIn',
//         headers: {
//             'Htmix-Protocol': `${head_b64}`,

//             'Content-Type': 'application/x-www-form-urlencoded',
//             'Content-Length': Buffer.byteLength(`htmix-data=${body_b64}`)
//         }
//     }, res => {
//         let data = '';
//         res.on('data', chunk => {
//             data += chunk;
//         });
//         res.on('end', () => {
//             const result = JSON.parse(data);
//             console.log(`on response 登录: --`);
//             console.log(result);
//             t.equal(result['status'], 10001);
//             t.equal(result['error_code'], 10010);
//             t.same(result['message'], '成功登入');
//             t.end();
//         });
//         res.on('error', err => {
//             console.log(`response error: ${err}`);
//             t.is(err, undefined);
//             t.end();
//         });
//     });
//     request.write(`htmix-data=${body_b64}`);
//     request.end();
// });

// test('测试获取频道列表', t => {
//     const body = new PackBody(new WebNews({
//         pagesize: 10,
//         currentpage: 1
//     }));

//     const head = new PackHeader();
//     head.main_code = HTMIX_MAIN_INFO_MANAGER;
//     head.sub_code = HTMIX_SUB_INFO_NEWS;

//     //注意设置长度和计算检验的次序
//     head.length = body.length();
//     head.calc_checksum();

//     const head_b64 = head.to_base64();
//     const body_b64 = body.to_base64();
//     const request = http.request({
//         method: 'GET',
//         port: cluster_config.port,
//         hostname: cluster_config.host,
//         path: '/news/1',
//         headers: {
//             'Htmix-Protocol': `${head_b64};${body_b64}`,
//             // 'Content-Type':'application/x-www-form-urlencoded',
//             // 'Content-Length':Buffer.byteLength(`htmix-data=}`)
//         }
//     }, res => {
//         let data = '';
//         res.on('data', chunk => {
//             data += chunk;
//         });
//         res.on('end', () => {
//             console.log(data);
//             const result = JSON.parse(data);
//             console.log(`on response: --`);
//             console.log(result);
//             t.equal(result['status'], 0);
//             t.equal(result['error_code'], 0);
//             // t.same(result['message'],'成功登入');
//             t.end();
//         });
//         res.on('error', err => {
//             console.log(`response error: ${err}`);
//             t.is(err, undefined);
//             t.end();
//         });
//     });
//     request.end();
// });


// test('测试获取新闻内容', t => {
//     const body = new PackBody(new WebNews({
//         pagesize: 10,
//         currentpage: 1
//     }));

//     const head = new PackHeader();
//     head.main_code = HTMIX_MAIN_INFO_MANAGER;
//     head.sub_code = HTMIX_SUB_INFO_NEWS;

//     //注意设置长度和计算检验的次序
//     head.length = body.length();
//     head.calc_checksum();

//     const head_b64 = head.to_base64();
//     const body_b64 = body.to_base64();
//     const request = http.request({
//         method: 'GET',
//         port: cluster_config.port,
//         hostname: cluster_config.host,
//         path: '/news/1/1',
//         headers: {
//             'Htmix-Protocol': `${head_b64};${body_b64}`,
//             // 'Content-Type':'application/x-www-form-urlencoded',
//             // 'Content-Length':Buffer.byteLength(`htmix-data=}`)
//         }
//     }, res => {
//         let data = '';
//         res.on('data', chunk => {
//             data += chunk;
//         });
//         res.on('end', () => {
//             console.log(data);
//             const result = JSON.parse(data);
//             console.log(`on response: --`);
//             console.log(result);
//             t.equal(result['status'], 0);
//             t.equal(result['error_code'], 0);
//             // t.same(result['message'],'成功登入');
//             t.end();
//         });
//         res.on('error', err => {
//             console.log(`response error: ${err}`);
//             t.is(err, undefined);
//             t.end();
//         });
//     });
//     request.end();
// });


// test('测试考试记录', t => {
//     const body = new PackBody(new webExamination({
//         id_card: '620001199003141234',
//         count: 100
//     }));

//     const head = new PackHeader();
//     head.main_code = HTMINX_MAIN_USER_EXAMINTION;
//     head.sub_code = HTMINX_SUB_EXAMINTION_COUNT;

//     //注意设置长度和计算检验的次序
//     head.length = body.length();
//     head.calc_checksum();

//     const head_b64 = head.to_base64();
//     const body_b64 = body.to_base64();
//     const request = http.request({
//         method: 'GET',
//         port: cluster_config.port,
//         hostname: cluster_config.host,
//         path: '/require/v1/examination',
//         headers: {
//             'Htmix-Protocol': `${head_b64};${body_b64}`
//         }
//     }, res => {
//         let data = '';
//         res.on('data', chunk => {
//             data += chunk;
//         });
//         res.on('end', () => {
//             console.log(data);
//             const result = JSON.parse(data);
//             console.log(`on response: --`);
//             console.log(result);
//             t.equal(result['status'], 0);
//             t.equal(result['error_code'], 0);
//             // t.same(result['message'],'成功登入');
//             t.end();
//         });
//         res.on('error', err => {
//             console.log(`response error: ${err}`);
//             t.is(err, undefined);
//             t.end();
//         });
//     });
//     request.end();
// });

test('测试内容添加', t => {
   
    const post_data =  JSON.stringify({'title':'123','source':'123','author':'123456','cover':'12456789','content':'456789','createBy':64,'createDate':'2018-1-1 10:10:00'});
    const request = http.request({
        method: 'POST',
        port: cluster_config.port,
        hostname: cluster_config.host,
        path: '/require/v1/content/news',
        headers:{
            'Content-Type': 'application/json',
            'Content-Length': Buffer.byteLength(post_data)
        }
    }, res => {
        let data = '';
        res.on('data', chunk => {
            data += chunk;
        });
        res.on('end', () => {
            console.log(data);
            const result = JSON.parse(data);
            console.log(`on response: --`);
            console.log(result);
            t.equal(result['status'], 0);
            t.equal(result['error_code'], 0);
            t.end();
        });
        res.on('error', err => {
            console.log(`response error: ${err}`);
            t.is(err, undefined);
            t.end();
        });
    });
    request.write(post_data);
    request.end();
});