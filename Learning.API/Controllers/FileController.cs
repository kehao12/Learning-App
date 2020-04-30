using System;
using System.Collections.Generic;
using System.IO;
using System.Threading.Tasks;
using AutoMapper;
using CloudinaryDotNet;
using CloudinaryDotNet.Actions;
using Learning.API.Data;
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
    public class FileController: ControllerBase
    {
        private readonly IFileRepository _repo;
        private readonly IMapper _mapper;
        private IHostingEnvironment _hostingEnv;
        
        private readonly IOptions<CloudinarySettings> _cloudinaryConfig;
        private Cloudinary _cloudinary;
        public FileController(IHostingEnvironment hostingEnv, IFileRepository repo,IMapper mapper,
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

            var filesToReturn = _mapper.Map<IEnumerable<FileForListDto>>(files);

            return Ok(filesToReturn);
        }
        [AllowAnonymous]
        [HttpGet("{id}", Name = "GetFile")]
        public async Task<IActionResult> GetFile(int id)
        {
            var photoFromRepo = await _repo.GetFile(id);

            var photo = _mapper.Map<FileForDetailedDto>(photoFromRepo);

            return Ok(photo);
        }


        [HttpPost]
        public async Task<IActionResult> AddVideo([FromForm]FileForAddDto fileForAddDto)
        {
            var file = fileForAddDto.File;

            var uploadResult = new VideoUploadResult();

            if (file.Length > 0)
            {
                using (var stream = file.OpenReadStream())
                {
                    var uploadParams = new VideoUploadParams()
                    {
                        File = new FileDescription(file.Name, stream),
                        
                    };

                    uploadResult = _cloudinary.Upload(uploadParams);
                }
            }

            fileForAddDto.Url = uploadResult.Uri.ToString();
            fileForAddDto.PublicId = uploadResult.PublicId;
            fileForAddDto.Duration = uploadResult.Duration;
            fileForAddDto.TypeId = 1;

            // fileForAddDto.ItemId = 1;
            var data = _mapper.Map<File>(fileForAddDto);
            _repo.Add(data);

            if (await _repo.SaveAll())
            {
                var photoToReturn = _mapper.Map<File>(data);
                return CreatedAtRoute("GetFile", new { id = data.Id }, photoToReturn);
            }

            return BadRequest("Could not add the photo");
        }

        [HttpPost("AddFile")]
        public async Task<IActionResult> AddFile([FromForm]FileForAddDto fileForAddDto) {
            
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
            return CreatedAtRoute("GetFile", new { id = idOfFileAdded }, fileToCreate);
    
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateFile(int id, FileForUpdateItemIdDto fileForUpdateItemIdDto) {
            var FileFromRepo = await _repo.GetFile(id);

            _mapper.Map(fileForUpdateItemIdDto, FileFromRepo);

            if (await _repo.SaveAll())
                return NoContent();
            return Ok();
        }
    
    }
}