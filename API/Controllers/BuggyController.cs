using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Data;
using API.Entities;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    public class BuggyController : BaseApiController
    {
        private readonly DataContext _context;
        public BuggyController(DataContext context)
        {
            _context = context;
        }
        [HttpGet("auth")]
        [Authorize]
        public ActionResult<string> GetSecret()
        {
            return "secret text";
        }
        [HttpGet("not-found")]
        
        public ActionResult<AppUser> GetNotFound()
        {
            var thing=_context.Users.Find(-1);
            if(thing==null) return NotFound();
            return Ok(thing);
        }
        [HttpGet("server-error")]
        
        public ActionResult<string> GetServerError()
        {
            var thing=_context.Users.Find(-1);
            var thingtoReturn=thing.ToString();
            return thingtoReturn;
        }
        [HttpGet("bad-request")]
        
        public ActionResult<AppUser> GetBadRequest()
        {
            return BadRequest("This is not good request. ");
        }

    }
}