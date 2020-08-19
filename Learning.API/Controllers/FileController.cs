using System;
using System.Collections.Generic;
using System.IO;
using System.Threading.Tasks;
using AutoMapper;
using CloudinaryDotNet;
using CloudinaryDotNet.Actions;
using Learning.API.Data;
using Learning.API.DTOs;
using Learning.API.DTOs.File;
using Learning.API.Helper;
using Learning.API.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;
using File = Learning.API.Models.File;

namespace Learning.API.Controllers
{
    [AllowAnonymous]
    [Route("api/[controller]")]
    [ApiController]
    public class FileController : ControllerBase
    {
        private readonly IFileRepository _repo;
        private readonly IMapper _mapper;
        private IHostingEnvironment _hostingEnv;

        private readonly IOptions<CloudinarySettings> _cloudinaryConfig;
        private Cloudinary _cloudinary;
        public FileController(IHostingEnvironment hostingEnv, IFileRepository repo, IMapper mapper,
            IOptions<CloudinarySettings> cloudinaryConfig)
        {
            _hostingEnv = hostingEnv;
            _cloudinaryConfig = cloudinaryConfig;
            _mapper = mapper;
            _repo = repo;

            Account acc = new Account(
                _cloudinaryConfig.Value.CloudName,
                _cloudinaryConfig.Value.ApiKey,
                _cloudinaryConfig.Value.ApiSecret
            );

            _cloudinary = new Cloudinary(acc);
        }
        [AllowAnonymous]
        [HttpGet]
        public async Task<IActionResult> GetFiles()
        {
            var files = await _repo.GetFiles();
            foreach (var item in files)
            {
                if (item.TypeId == 1)
                {
                    item.Url = BaseURL.GetBaseUrl(Request) + "/Upload/Video/" + item.Url;
                }
                if (item.TypeId == 2)
                {
                    item.Url = BaseURL.GetBaseUrl(Request) + "/Upload/File/" + item.Url;
                }

            }


            var filesToReturn = _mapper.Map<IEnumerable<FileForListDto>>(files);

            return Ok(filesToReturn);
        }
        [AllowAnonymous]
        [HttpGet("{id}", Name = "GetFile")]
        public async Task<IActionResult> GetFile(int id)
        {
            var item = await _repo.GetFile(id);
            if (item.TypeId == 1)
            {
                item.Url = BaseURL.GetBaseUrl(Request) + "/Upload/Video/" + item.Url;
            }
            if (item.TypeId == 2)
            {
                item.Url = BaseURL.GetBaseUrl(Request) + "/Upload/File/" + item.Url;
            }

            var photo = _mapper.Map<FileForDetailedDto>(item);

            return Ok(photo);
        }

        public async Task<IActionResult> GetFile1(int id)
        {
            var item = await _repo.GetFile(id);

            var photo = _mapper.Map<FileForDetailedDto>(item);

            return Ok(photo);
        }

        [HttpPost]
        [RequestSizeLimit(100_000_000)]
        public async Task<IActionResult> AddVideo([FromForm] FileForAddDto fileForAddDto)
        {
            var file = fileForAddDto.File;
            fileForAddDto.TypeId = 1;
            var fileToCreate = _mapper.Map<File>(fileForAddDto);
            _repo.Add(fileToCreate);
            await _repo.SaveAll();

            if (file != null)
            {
                string newFileName = fileToCreate.Id + "_" + file.FileName;
                string path = Path.Combine(_hostingEnv.ContentRootPath, "Upload/Video", newFileName);
                using (var stream = new FileStream(path, FileMode.Create))
                {
                    file.CopyTo(stream);
                    fileForAddDto.Url = newFileName;
                    fileToCreate.Url = fileForAddDto.Url;
                    //_data.Entry(fileForAddDto).Property(x => x.Image).IsModified = true;
                    var fileFromRepo1 = await _repo.GetFile(fileToCreate.Id);
                    _mapper.Map(fileToCreate, fileFromRepo1);
                    await _repo.SaveAll();
                }
            }
        fileToCreate.Url = BaseURL.GetBaseUrl(Request) + "/Upload/Video/" + fileForAddDto.Url;


            // var uploadResult = new VideoUploadResult();

            // if (file.Length > 0)
            // {
            //     using (var stream = file.OpenReadStream())
            //     {
            //         var uploadParams = new VideoUploadParams()
            //         {
            //             File = new FileDescription(file.Name, stream),

            //         };

            //         uploadResult = _cloudinary.Upload(uploadParams);
            //     }
            // }

            // fileForAddDto.Url = uploadResult.Uri.ToString();
            // fileForAddDto.PublicId = uploadResult.PublicId;
            // fileForAddDto.Duration = uploadResult.Duration;

            // fileForAddDto.ItemId = 1;
            // var data = _mapper.Map<File>(fileForAddDto);
            // _repo.Add(data);

            // if (await _repo.SaveAll())
            // {
            //     var photoToReturn = _mapper.Map<File>(data);
            //     return CreatedAtRoute("GetFile", new { id = data.Id }, photoToReturn);
            // }

            // return BadRequest("Could not add the photo");
            return CreatedAtRoute("GetFile", new { id = fileToCreate.Id }, fileToCreate);
        }

        [HttpPost("AddFile")]
        public async Task<IActionResult> AddFile([FromForm] FileForAddDto fileForAddDto)
        {

            var file = fileForAddDto.File;
            fileForAddDto.TypeId = 2;
            var fileToCreate = _mapper.Map<File>(fileForAddDto);
            _repo.Add(fileToCreate);
            await _repo.SaveAll();
            int idOfFileAdded = _repo.GetFileMaxID();
            if (file != null)
            {
                string newFileName = idOfFileAdded + "_" + file.FileName;
                string path = Path.Combine(_hostingEnv.ContentRootPath, "Upload/File", newFileName);
                using (var stream = new FileStream(path, FileMode.Create))
                {
                    file.CopyTo(stream);
                    fileForAddDto.Url = newFileName;
                    fileToCreate.Url = fileForAddDto.Url;
                    //_data.Entry(fileForAddDto).Property(x => x.Image).IsModified = true;
                    var fileFromRepo1 = await _repo.GetFile(idOfFileAdded);
                    _mapper.Map(fileToCreate, fileFromRepo1);
                    await _repo.SaveAll();
                }
            }
             fileToCreate.Url = BaseURL.GetBaseUrl(Request) + "/Upload/File/" + fileForAddDto.Url;
            return CreatedAtRoute("GetFile", new { id = idOfFileAdded }, fileToCreate);

        }

        [HttpPost("AddExam")]
        public async Task<IActionResult> AddExam(FileExamForAddDto fileExamForAddDto)
        {

            var file = new File
            {
                TestId = fileExamForAddDto.TestId,
                TypeId = 3
            };

            var fileToCreate = _mapper.Map<File>(file);
            _repo.Add(fileToCreate);
            await _repo.SaveAll();
            var item = new Item
            {
                Name = fileExamForAddDto.Name,
                Description = fileExamForAddDto.Description,
                FileId = fileToCreate.Id,
                LessonId = fileExamForAddDto.LessonId
            };
            _repo.Add(item);
            await _repo.SaveAll();
            return Ok(item);
        }

       [HttpPost("AddAudio")]
        [RequestSizeLimit(100_000_000)]
        public async Task<IActionResult> AddAudio([FromForm] FileForAddDto fileForAddDto)
        {
            var file = fileForAddDto.File;
            fileForAddDto.TypeId = 1;
            var fileToCreate = _mapper.Map<File>(fileForAddDto);
            _repo.Add(fileToCreate);
            await _repo.SaveAll();

            if (file != null)
            {
                string newFileName = fileToCreate.Id + "_" + file.FileName;
                string path = Path.Combine(_hostingEnv.ContentRootPath, "Upload/Audio", newFileName);
                using (var stream = new FileStream(path, FileMode.Create))
                {
                    file.CopyTo(stream);
                    fileForAddDto.Url = newFileName;
                    fileToCreate.Url = fileForAddDto.Url;
                    //_data.Entry(fileForAddDto).Property(x => x.Image).IsModified = true;
                    var fileFromRepo1 = await _repo.GetFile(fileToCreate.Id);
                    _mapper.Map(fileToCreate, fileFromRepo1);
                    await _repo.SaveAll();
                }
            }
        fileToCreate.Url = BaseURL.GetBaseUrl(Request) + "/Upload/Audio/" + fileForAddDto.Url;


            // var uploadResult = new VideoUploadResult();

            // if (file.Length > 0)
            // {
            //     using (var stream = file.OpenReadStream())
            //     {
            //         var uploadParams = new VideoUploadParams()
            //         {
            //             File = new FileDescription(file.Name, stream),

            //         };

            //         uploadResult = _cloudinary.Upload(uploadParams);
            //     }
            // }

            // fileForAddDto.Url = uploadResult.Uri.ToString();
            // fileForAddDto.PublicId = uploadResult.PublicId;
            // fileForAddDto.Duration = uploadResult.Duration;

            // fileForAddDto.ItemId = 1;
            // var data = _mapper.Map<File>(fileForAddDto);
            // _repo.Add(data);

            // if (await _repo.SaveAll())
            // {
            //     var photoToReturn = _mapper.Map<File>(data);
            //     return CreatedAtRoute("GetFile", new { id = data.Id }, photoToReturn);
            // }

            // return BadRequest("Could not add the photo");
            return CreatedAtRoute("GetFile", new { id = fileToCreate.Id }, fileToCreate);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateFile(int id, FileForUpdateItemIdDto fileForUpdateItemIdDto)
        {
            var FileFromRepo = await _repo.GetFile(id);

            _mapper.Map(fileForUpdateItemIdDto, FileFromRepo);

            if (await _repo.SaveAll())
                return NoContent();
            return Ok();
        }

    }
}