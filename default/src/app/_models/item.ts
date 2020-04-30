import { Files } from './file';

export interface Item {
    Id: number;
    Name: string;
    LesssonId: number;
    Description: string;
    files?: Files;
    fileId: number;
}
