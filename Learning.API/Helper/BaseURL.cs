using Microsoft.AspNetCore.Http;

namespace Learning.API.Helper
{
    public class BaseURL
    {
        public static string GetBaseUrl(HttpRequest request)
        {
            return request.Scheme + "://" + request.Host.ToString();
        }
    }
}