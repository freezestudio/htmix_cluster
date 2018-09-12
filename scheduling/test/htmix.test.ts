import tape from 'tape';
const test = tape;

import {
    checksum,
    PackHeader,
    to_string,
    from_string,
    to_number,
    from_number,
    PackBodyStruct,
    PackBody,
    tail_placeholder,

} from '../lib/core/htmix';

import {
    HTMIX_SUB_USER_REGISTER,
    HTMIX_MAIN_USER_MANAGER,
} from '../lib/protocol';

// //////////////////////////////////////////////////////////////////////
// // PackHead

// test('should checksum return 0', t => {
//     t.plan(1);

//     const htmix = new PackHeader();
//     htmix.main_code = HTMIX_MAIN_USER_MANAGER;
//     htmix.sub_code = HTMIX_SUB_USER_REGISTER;
//     htmix.calc_checksum();

//     // [16,16,0,0,0,1,0,1] cs=221
//     const uint_8 = htmix.to_uint8();
//     t.equal(checksum(uint_8) & 0xff, 0);
// });

// test('protocol package header i/o array', t => {
//     const arr = [16, 16, 0, 0, 221, 1, 0, 1];
//     const htmix = PackHeader.from(arr);
//     t.equal(htmix.main_code, 1);
//     t.equal(htmix.sub_code, 1);
//     t.equal(htmix.checksum, 221);

//     let buffer = new ArrayBuffer(8);
//     let view = new Uint8Array(buffer);
//     view.set(arr);

//     const uint_8 = htmix.to_uint8();
//     t.equal(uint_8[0], view[0]);
//     t.equal(uint_8[1], view[1]);
//     t.equal(uint_8[2], view[2]);
//     t.equal(uint_8[3], view[3]);
//     t.equal(uint_8[4], view[4]);
//     t.equal(uint_8[5], view[5]);
//     t.equal(uint_8[6], view[6]);
//     t.equal(uint_8[7], view[7]);
//     t.end();
// });

// test('protocol package header i/o base64', t => {
//     const base64 = 'MTYsMTYsMCwwLDIyMSwxLDAsMQ==';
//     const htmix = PackHeader.from(base64);
//     t.equal(htmix.to_base64(), base64);
//     t.equal(htmix.main_code, 1);
//     t.equal(htmix.sub_code, 1);
//     t.equal(htmix.checksum, 221);
//     t.end();
// });

// ////////////////////////////////////////////////////////////
// // function

// test('array buffer <-> string', t => {
//     const str = '2018年12月12日';
//     const buf = from_string(str);
//     console.log(`buffer byte length: ${buf.byteLength}, buffer length ${buf.length}`);
//     let view = new ArrayBuffer(buf.byteLength);
//     const view_p = new Uint8Array(view);
//     view_p.set(buf);
//     t.equal(to_string(view, 0, view.byteLength), str);
//     t.end();
// });

test('array buffer <-> number', t => {
    const num = 32767;
    const buf = from_number(num);
    let view = new ArrayBuffer(buf.length);
    const view_p = new Int8Array(view);
    view_p.set(buf);
    t.equal(to_number(view, 0, view.byteLength), num);
    t.end();
});

// /////////////////////////////////////////////////////////////////
// // PackBody

// interface ILoginTest {
//     name: string; //20
//     age: number; // 4
//     pwd: string; //20
// }

// class LoginTest implements PackBodyStruct {

//     constructor(public login?: ILoginTest) {

//     }

//     init(view: ArrayBuffer): void {
//         if (this.login) {
//             const name_vw = from_string(this.login.name!);
//             const age_vw = from_number(this.login.age!);
//             const pwd_vw = from_string(this.login.pwd!);

//             let name_pt = new Int8Array(view, 0, 20);
//             name_pt.set(name_vw);
//             let age_pt = new Int8Array(view, 20, 4);
//             age_pt.set(age_vw);
//             let pwd_pt = new Int8Array(view, 24, 20);
//             pwd_pt.set(pwd_vw);
//         }
//     }

//     from(view: ArrayBuffer): void {
//         if (!this.login) {
//             this.login = {
//                 name: to_string(view, 0, 20),
//                 age: to_number(view, 20, 4),
//                 pwd: to_string(view, 24, 20),
//             };
//         }
//     }

//     length() {
//         return 20 + 4 + 20;
//     }
// }

// test('protocol package body from array buffer', t => {
//     const login = new PackBody(new LoginTest({
//         name: '不超过十个字',
//         age: 24,
//         pwd: 'password'
//     }));
//     const result = [228, 184, 141, 232, 182, 133, 232, 191, 135, 229,
//         141, 129, 228, 184, 170, 229, 173, 151, 0, 0, 0,
//         0, 0, 24, 112, 97, 115, 115, 119, 111, 114, 100,
//         0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
//     const uint_8 = login.to_uint8();

//     const body = new PackBody(new LoginTest());
//     body.from(uint_8);

//     const login_name = body.payload.login!.name;
//     const login_age = body.payload.login!.age;
//     const login_pwd = body.payload.login!.pwd;

//     t.same(login_name, '不超过十个字');
//     t.same(login_age, 24);
//     t.same(login_pwd, 'password');

//     t.end();
// });

// test('protocol package body from base64', t => {
//     const login = new PackBody(new LoginTest({
//         name: '不超过十个字',
//         age: 24,
//         pwd: 'password'
//     }));
//     const b64 = login.to_base64();

//     const body = new PackBody(new LoginTest());
//     body.from(b64);

//     const login_name = body.payload.login!.name;
//     const login_age = body.payload.login!.age;
//     const login_pwd = body.payload.login!.pwd;

//     t.same(login_name, '不超过十个字');
//     t.same(login_age, 24);
//     t.same(login_pwd, 'password');

//     t.end();
// });

// ///////////////////////////////////////////////////////////////////////////
// // 测试添加尾随数据的包

// interface IPackWithTail {
//     title: string;
//     time: number;
//     data: string;
// }

// class PackWithTail implements PackBodyStruct {
//     constructor(private pwt?: IPackWithTail) {

//     }

//     init(view: ArrayBuffer, tail?: number | undefined): void {
//         if (this.pwt) {
//             const title_view = from_string(this.pwt.title);
//             const title_pointer = new Uint8Array(view, 0, 20);
//             title_pointer.set(title_view);

//             const time_view = from_number(this.pwt.time);
//             const time_pointer = new Uint8Array(view, 20, 4);
//             time_pointer.set(time_view);

//             const data_view = from_string(this.pwt.data);
//             const data_pointer = new Uint8Array(view, 28, tail);
//             data_pointer.set(data_view);

//             const placeholder_view = from_number(data_view.byteLength);
//             const placeholder_pointer = new Uint8Array(view, 24, 4);
//             placeholder_pointer.set(placeholder_view);
//         }
//     }

//     from(view: ArrayBuffer): void {
//         if (!this.pwt) {
//             this.pwt = {
//                 title: to_string(view, 0, 20),
//                 time: to_number(view, 20, 4),
//                 data: to_string(view, 28, to_number(view, 24, 4)),
//             };
//         }
//     }

//     length(): number {
//         return 20 + 4;
//     }
// }

// test('测试添加尾随数据的包', t => {
//     t.plan(3);

//     const content = '通知：根据XX领导指示，现定于2018年8月20日进行考试，试题共X道,其中...';
//     const bytes_length = from_string(content).byteLength;
    
//     const pwt = new PackWithTail({
//         title: '考试通知',
//         time: 60,//分钟
//         data: content,
//     });

//     const body = new PackBody(pwt, bytes_length);
//     const buffer = body.to_uint8();

//     let dpwt = new PackWithTail();
//     const dbody = new PackBody(dpwt);
//     dbody.from(buffer);

//     const actual: any = dbody.payload['pwt'];
//     const expect: any = pwt['pwt'];
//     console.log(actual.data);

//     t.same(actual.title, expect.title);
//     t.equal(actual.time, expect.time);
//     t.same(actual.data, expect.data);
// });
