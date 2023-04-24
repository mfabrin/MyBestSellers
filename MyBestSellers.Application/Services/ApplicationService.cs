using MyBestSellers.Application.DTO.Application;
using MyBestSellers.Application.OperationResults;
using MyBestSellers.Infrastructure.NYTimes;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MyBestSellers.Application.Services
{
    public class ApplicationService
    {
        private readonly NYTimesManager _timesManager;

        public ApplicationService(NYTimesManager timesManager)
        {
            _timesManager = timesManager;
        }


        public async Task<ItemResponse<ApplicationDataResponse>> GetApplicationData()
        {
            var bookCategories = await _timesManager.GetCategories();

            var response = new ApplicationDataResponse
            {
                BookCategories = bookCategories.results
                    .OrderBy(x => x.display_name)
                    .Select(x => new KeyValuePair<string, string>(x.list_name_encoded, x.display_name))
                    .ToList()
            };

            return new ItemResponse<ApplicationDataResponse>(response);
        }
    }
}
