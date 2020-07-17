using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Learning.API.Data;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Learning.API.Controllers
{

    [Route("api/[controller]")]
    [ApiController]
    public class ValuesController : ControllerBase
    {
        private readonly DataContext _context;
        private IRoleRepository _repo;
        public ValuesController(DataContext context,IRoleRepository repo)
        {
            _context = context;
            _repo = repo;
        }
    [AllowAnonymous]
        // GET api/values
        [HttpGet]
        public async Task<IActionResult> GetValues()
        {
        //     var values = from s in context.shift
        //                 where !context.employeeshift.Any(es=>(es.shiftid==s.shiftid)&&(es.empid==57))
        // select s;
            var values = from r in _context.Roles
                        select r;
           
  

 
            return Ok(values);
        }

        // [AllowAnonymous]
        // // GET api/values/5
        // [HttpGet("{id}")]
        // public async Task<IActionResult> GetValue(int id)
        // {
        //     var value = await _repo.GetStatisticOfOrder(1,id);

        //     return Ok(value);
        // }

        // POST api/values
        [HttpPost]
        public void Post([FromBody] string value)
        {
        }

    
        // PUT api/values/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody] string value)
        {
        }

        // DELETE api/values/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
        }
    }
}
