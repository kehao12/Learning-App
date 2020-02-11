using System;

namespace Learning.API.Models.Abstract
{
    public class IAuditable
    {
        DateTime? CreatedDate { set; get; }
        string CreatedBy { set; get; }
        DateTime? UpdatedDate { set; get; }
        string UpdatedBy { set; get; }

        bool Status { set; get; }
    }
}