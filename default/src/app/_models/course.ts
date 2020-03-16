export interface Course {
    ID: number;
    Name: string;
    Alias: string;
    Description: string;
    Image: string;
    Price: number;
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
