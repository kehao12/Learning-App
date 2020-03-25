export interface CourseCategory {
    ID: number;
    Name: string;
    Alias: string;
    Description: string;
    ParentID?: number;
    DisplayOrder?: number;
    CreatedDate: Date;
    CreatedBy: string;
    UpdatedDate?: Date;
    UpdatedBy: string;
    Status: boolean;
}
