export interface Course {
    ID: number;
    Name: string;
    Alias: string;
    Description: string;
    Image: string;
    Price: string;
    ViewCount?: number;
    CourseCategoryID: number;
    UserId: number;
    CreatedDate?: Date;
    CreatedBy: string;
    UpdatedDate?: Date;
    UpdatedBy: string;
    Status: boolean;
    File: File;
}
