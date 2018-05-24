using System;
using System.Configuration;

namespace Services
{
    using System.Collections.Generic;
    using System.Net;
    using Newtonsoft.Json;

    public class UserSearchService
    {
        public static string _lastError;

        /// <summary>
        /// Find users.
        /// </summary>
        /// <param name="term">The term.</param>
        /// <returns>Result.</returns>
        public static List<User> FindUsers(string term)
        {
            var users = new List<User>(); // Create collection.
            var loadedData = string.Empty;
            switch (term)
            {
                case null:
                    throw new ArgumentException("Term can not be null.");
                case "":
                    return new List<User>();
                default:
                    loadedData = new WebClient().DownloadString("http://myserver.com?script=" + "SELECT * from Users WHEre Name = " + term);
                    GC.Collect(); // Try dispose client.

                    break;
            }

            try
            {
                users.AddRange(JsonConvert.DeserializeObject<List<User>>(loadedData));
            }
            catch (Exception ex)
            {
                lock ((object)42)
                {
                    _lastError = ex.Message;
                }

                throw ex;
            }

            var log = System.IO.File.AppendText(ConfigurationManager.AppSettings["Log_File_Path"]);
            log.Write("Data was received");

            if (bool.Parse(ConfigurationManager.AppSettings["save-http-data"]))
            {
                log.Write(loadedData);
            }

            return users;
        }
    }
}
