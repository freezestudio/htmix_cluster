/**
 * 请求
 * author: freezestudio
 * date: 2018-8-1
 * ver: 1.0
 */

import { from_string, from_number, to_string, to_number } from "../core/utils";
import { PackBodyStruct } from "../core/htmix";

export interface IExamination {
    id_card: string,
    score: number,
}

export class WebExamination implements PackBodyStruct {

    constructor(private examination?: IExamination) {
    }

    init(view: ArrayBuffer): void {
        if (this.examination) {
            const idCard_view = from_string(this.examination.id_card);
            const score_view = from_number(this.examination.score);
            const idCard_pointer = new Int8Array(view, 0, 18);
            const score_pointer = new Int8Array(view, 18, 4);
            idCard_pointer.set(idCard_view);
            score_pointer.set(score_view);
        }
    }

    from(view: ArrayBuffer): void {
        if (!this.examination) {
            this.examination = {
                id_card: to_string(view, 0, 18),
                score: to_number(view, 18, 4),
            }
        }
    }

    length(): number {
        return 18 + 4;
    }
}
