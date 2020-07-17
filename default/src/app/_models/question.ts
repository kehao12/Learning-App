import { Option } from './option';

export class Question {
    id: number;
    content: string;
    answer: Option[];
    answered: boolean;

    constructor(data: any) {
        data = data || {};
        this.id = data.id;
        this.content = data.content;
        this.answer = [];
        data.answer.forEach(o => {
            this.answer.push(new Option(o));
        });
    }
}
