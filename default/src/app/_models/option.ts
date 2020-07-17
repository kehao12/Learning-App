export class Option {
    id: number;
    questionId: number;
    content: string;
    answerTrue: boolean;
    selected: boolean;

    constructor(data: any) {
        data = data || {};
        this.id = data.id;
        this.questionId = data.questionId;
        this.content = data.content;
        this.answerTrue = data.answerTrue;
    }
}
