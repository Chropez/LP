using LP.Providers;
using LP.ViewModels.Uploads;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Threading.Tasks;
using System.Web;
using System.Web.Http;

namespace LP.Controllers
{
    public class UploadController : ApiController
    {
        // GET: api/Upload
        public IEnumerable<string> Get()
        {
            return new string[] { "value1", "value2" };
        }

        // GET: api/Upload/5
        public string Get(int id)
        {
            return "value";
        }

        // POST: api/Upload
        public async Task<HttpResponseMessage> Post()
        {
            if (!Request.Content.IsMimeMultipartContent())
            {
                throw new HttpResponseException(HttpStatusCode.UnsupportedMediaType);
            }
            string root = HttpContext.Current.Server.MapPath("~/Uploads");
            var provider = new FileMultipartFormDataStreamProvider(root);

            try
            {
                await Request.Content.ReadAsMultipartAsync(provider);

                var uploadedFiles = new List<UploadedFileViewModel>();
                foreach (MultipartFileData file in provider.FileData)
                {
                    UploadedFileViewModel uploadedFile = new UploadedFileViewModel
                    {
                        Url = Url.Content("~/Uploads/") + Path.GetFileName(file.LocalFileName),
                        Name = Url.Content(file.Headers.ContentDisposition.FileName)
                    };
                    uploadedFiles.Add(uploadedFile);
                }



                //Thread.Sleep(10000);
                var t = "test";
                return Request.CreateResponse(HttpStatusCode.OK, uploadedFiles.First());
            }
            catch (System.Exception e)
            {
                return Request.CreateErrorResponse(HttpStatusCode.InternalServerError, e);
            }
        }

        // PUT: api/Upload/5
        public void Put(int id, [FromBody]string value)
        {
        }

        // DELETE: api/Upload/5
        public void Delete(int id)
        {
        }
    }
}
