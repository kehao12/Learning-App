using System;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.AspNetCore.Http;

namespace Learning.API.DTOs.File
{
    public class FileForUpdateItemIdDto
    {
        public int ItemId { get; set; }
    }
}