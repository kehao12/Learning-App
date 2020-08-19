using System.Linq;
using AutoMapper;
using DatingApp.API.Dtos;
using Learning.API.Dtos;
using Learning.API.DTOs;
using Learning.API.DTOs.File;
using Learning.API.DTOs.Item;
using Learning.API.Models;

namespace Learning.API.Helper
{    public class AutoMapperProfiles : Profile
    {
        public AutoMapperProfiles()
        {
            CreateMap<User, UserForListDto>()
                .ForMember(dest => dest.PhotoUrl, opt => {
                    opt.MapFrom(src => src.Photos.FirstOrDefault(p => p.IsMain).Url);
                })
                .ForMember(dest => dest.Age, opt => {
                    opt.ResolveUsing(d => d.DateOfBirth.CalculateAge());
                });
            CreateMap<User, UserForDetailedDto>()
                .ForMember(dest => dest.PhotoUrl, opt => {
                    opt.MapFrom(src => src.Photos.FirstOrDefault(p => p.IsMain).Url);
                });
            CreateMap<Photo, PhotosForDetailedDto>();
            CreateMap<UserForUpdateDto, User>();
            CreateMap<Photo, PhotoForReturnDto>();
            CreateMap<PhotoForCreationDto, Photo>();
            CreateMap<UserForRegisterDto, User>();

            CreateMap<CourseCategoryForAddDto, CourseCategory>();
            CreateMap<CourseCategoryForUpdateDto, CourseCategory>();

            CreateMap<CourseForDetailedDto, Course>();
            CreateMap<CourseForAddDto, Course>();
             CreateMap<CourseForUpdateDto, Course>();

             CreateMap<ChangeStatusCourseForDto, Course>();

            CreateMap<LessonForAddDto, Lesson>();
            CreateMap<LessonForDetailDto, Lesson>();
            CreateMap<LessonForUpdateDto, Lesson>();

             CreateMap<ItemForAddDto, Item>();
              CreateMap<ItemForUpdatedDto, Item>();

            CreateMap<FileForAddDto, File>();
            CreateMap<File, FileForListDto>();
            CreateMap<FileForUpdateItemIdDto, File>();

             CreateMap<CodeForAddDto, Code>();

             CreateMap<UserCourseForAddDto,UserCourse>();

             CreateMap<OrderForAddDto,Order>();
             CreateMap<OrderForUpdatedDto,Order>();
            
            CreateMap<ReviewForAddDto, Review>();
            CreateMap<QuestionForUpdateDto, Question>();
            CreateMap<AnswerForUpdateDto, Answer>();

            CreateMap<ExamForUpdatedDto, Test>();
            CreateMap<ReviewForUpdatedDto, Review>();
        }
    }
}