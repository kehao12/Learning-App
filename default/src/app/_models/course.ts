import { Lesson } from './lesson';
import { UserCourse } from './usercourse';

export interface Course {
    iD: number;
    name: string;
    alias: string;
    description: string;
    image: string;
    price: number;
    viewCount?: number;
    courseCategoryID: number;
    userId: number;
    createdDate?: Date;
    createdBy: string;
    updatedDate?: Date;
    updatedBy: string;
    status: boolean;
    file: File;
    lesson ?: Lesson[];
    userCourses: UserCourse[];
}
