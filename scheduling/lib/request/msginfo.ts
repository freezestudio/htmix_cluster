/**
 * 信息
 * author: freezestudio
 * date: 2018-8-1
 * ver: 1.0
 */

import { PackBodyStruct, from_number, to_number } from "../core/htmix";


//包结构
export interface IMsgInfo {
    pagesize: number,
    currentpage: number,
}

export class MsgInfo implements PackBodyStruct {

    constructor(private nstak?: IMsgInfo) {
    }
    init(view: ArrayBuffer): void {
        if (this.nstak) {
            const pagesize_view = from_number(this.nstak.pagesize);
            const currentpage_view = from_number(this.nstak.currentpage);
            const pagesize_pointer = new Int8Array(view, 0, 4);
            const currentpage_pointer = new Int8Array(view, 4, 4);
            pagesize_pointer.set(pagesize_view);
            currentpage_pointer.set(currentpage_view);
        }
    }

    from(view: ArrayBuffer): void {
        if (!this.nstak) {
            this.nstak = {
                pagesize: to_number(view, 0, 4),
                currentpage: to_number(view, 4, 4)
            }
        }
    }


    length(): number {
        return 4 + 4;
    }
}
