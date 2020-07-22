using System.Collections.Generic;
using System.Threading.Tasks;
using AutoMapper;
using Learning.API.Data;
using Learning.API.DTOs.Item;
using Learning.API.Helper;
using Learning.API.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Learning.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ItemController : ControllerBase
    {
        private readonly IItemRepository _repo;
        private readonly IMapper _mapper;
        private readonly IFileRepository _file;
        public ItemController(IItemRepository repo, IMapper mapper, IFileRepository file)
        {
            _mapper = mapper;
            _repo = repo;
            _file = file;
        }
        [AllowAnonymous]
        [HttpGet]
        public async Task<IActionResult> GetItem()
        {
            var Items = await _repo.GetItems();

            var ItemsToReturn = _mapper.Map<IEnumerable<ItemForListDto>>(Items);

            return Ok(ItemsToReturn);
        }



        [AllowAnonymous]
        [HttpGet("{id}", Name = "GetItem")]
        public async Task<IActionResult> GetItem(int id)
        {
            var Items = await _repo.GetItem(id);
            if (Items.Files.TypeId == 1)
            {
                Items.Files.Url = BaseURL.GetBaseUrl(Request) + "/Upload/Video/" + Items.Files.Url;
            }
            if (Items.Files.TypeId == 2)
            {
                Items.Files.Url = BaseURL.GetBaseUrl(Request) + "/Upload/File/" + Items.Files.Url;
            }

            var ItemsToReturn = _mapper.Map<ItemForDetailedDto>(Items);

            return Ok(ItemsToReturn);
        }

        [HttpGet("getitemoflesson/{id}")]
        public async Task<IActionResult> GetItemOfLesson(int id)
        {
            var Items = await _repo.GetItemOfLesson(id);
            foreach (var item in Items)
            {
                if (item.Files.TypeId == 1)
                {
                    item.Files.Url = BaseURL.GetBaseUrl(Request) + "/Upload/Video/" + item.Files.Url;
                }
                if (item.Files.TypeId == 2)
                {
                    item.Files.Url = BaseURL.GetBaseUrl(Request) + "/Upload/File/" + item.Files.Url;
                }

            }

            var ItemsToReturn = _mapper.Map<IEnumerable<ItemForListDto>>(Items);


            return Ok(ItemsToReturn);
        }

        [HttpGet("getitembycourse/{id}")]
        public async Task<IActionResult> GetItemByCourse(int id)
        {
            var Items = await _repo.GetItemByCourse(id);

            var ItemsToReturn = _mapper.Map<IEnumerable<ItemForListDto>>(Items);


            return Ok(ItemsToReturn);
        }
        // [HttpGet("getCountItem/{id}")]
        // public async Task<IActionResult> GetCountItem(int id)
        // {
        //     int count = _repo.CountItem(id);
        //     return Ok(count);
        // }

        [HttpPost]
        public async Task<IActionResult> AddItem(ItemForAddDto ItemForAddDto)
        {
            // ItemForAddDto.Name = ItemForAddDto.Name.ToLower();

            // if (await _repo.UserExists(ItemForAddDto.Name))
            //     return BadRequest("Tài khoản đã tồn tại");


            var ItemToCreate = _mapper.Map<Item>(ItemForAddDto);
            _repo.Add(ItemToCreate);
            await _repo.SaveAll();

            return Ok(ItemToCreate);
        }




        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateItem(int id, ItemForUpdatedDto ItemForUpdateDto)
        {

            var ItemFromRepo = await _repo.GetItem(id);

            var item = _mapper.Map(ItemForUpdateDto, ItemFromRepo);
  
            // if (ItemForUpdateDto.File.TypeId == 3) {
            //     var fileFormRepo = await _file.GetFile(ItemForUpdateDto.File.Id);
            //     var file = _mapper.Map(ItemForUpdateDto.File, fileFormRepo);
            //     await _repo.SaveAll();
            // }

            if (await _repo.SaveAll())
                return NoContent();
            return Ok();

        }


        [HttpDelete("{id}")]
        public async Task<ActionResult> DeleteItem(int id)
        {
            var Item = await _repo.GetItem(id);
            if (Item == null)
            {
                return NotFound();
            }

            _repo.Delete(Item);
            await _repo.SaveAll();

            return Ok();
        }
    }
}