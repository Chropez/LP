using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Web;

namespace LP.Providers
{
    public class FileMultipartFormDataStreamProvider : MultipartFormDataStreamProvider
    {
        public FileMultipartFormDataStreamProvider(string rootPath)
            : base(rootPath)
        {
        }

        public FileMultipartFormDataStreamProvider(string rootPath, int bufferSize)
            : base(rootPath, bufferSize)
        {
        }

        public override string GetLocalFileName(HttpContentHeaders headers)
        {
            var fileName = base.GetLocalFileName(headers);
            if (string.IsNullOrEmpty(headers.ContentDisposition.FileName))
            {
                fileName = Guid.NewGuid().ToString();
            }

            fileName = headers.ContentDisposition.FileName;

            fileName = TrimFileName(fileName);

            var t = Path.Combine(HttpContext.Current.Server.MapPath("~/Uploads"), fileName);
            if (File.Exists(Path.Combine(RootPath, fileName)))
                fileName = Path.GetFileNameWithoutExtension(fileName) + "-" + Guid.NewGuid().ToString() + Path.GetExtension(fileName);



            return fileName;

        }

        public static string TrimFileName(string fileName)
        {
            if (fileName == null) throw new ArgumentNullException("fileName");

            var newFileName = fileName;
            if (newFileName.StartsWith("\"") && newFileName.EndsWith("\""))
                newFileName = newFileName.Trim('"');

            if (newFileName.Contains(@"/") || newFileName.Contains(@"\"))
                newFileName = Path.GetFileName(newFileName);

            newFileName = newFileName.Replace(" ", string.Empty);

            return newFileName;
        }
    }
}