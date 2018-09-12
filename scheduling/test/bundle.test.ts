import tape from 'tape';
const test = tape;

import {
    PackHeader,
    PackBody,
    bundle,
    debundle_body,
    debundle_header,
    http_header,
    send_data,
} from '../lib/core/htmix';

import {
    HTMIX_SUB_USER_REGISTER,
    HTMIX_SUB_USER_LOGIN,
    HTMIX_MAIN_USER_MANAGER,
} from '../lib/protocol';
import { WebSubRegister } from '../lib/request/register';

// test('bundle unbundle pack', t => {
//     const regist = new WebSubRegister({
//         id_card: '620001199003141234',
//         password: 'password',
//         mobile:'13234567890'
//     });
//     const bunch = bundle(HTMIX_MAIN_USER_MANAGER, HTMIX_SUB_USER_REGISTER, regist);

//     const raw_body = new PackBody(regist);
//     const raw_header = new PackHeader();
//     raw_header.main_code = HTMIX_MAIN_USER_MANAGER;
//     raw_header.sub_code = HTMIX_SUB_USER_REGISTER;
//     raw_header.length = raw_body.length();
//     raw_header.calc_checksum();

//     const header_b64 = raw_header.to_base64();
//     const body_b64 = raw_body.to_base64();

//     t.same(bunch[http_header], header_b64);
//     t.same(bunch[send_data], body_b64);

//     const un_body = debundle_body(body_b64, regist);
//     // console.log(`body's payload is:`);
//     // console.log(un_body.payload);
//     t.equal(un_body.payload.register.id_card, '620001199003141234');
//     t.equal(un_body.payload.register.password, 'password');
//     t.equal(un_body.length(), raw_header.length);

//     const un_header=debundle_header(header_b64);
//     t.equal(un_header.main_code,HTMIX_MAIN_USER_MANAGER);
//     t.equal(un_header.sub_code,HTMIX_SUB_USER_REGISTER);
    
//     t.end();
// });
