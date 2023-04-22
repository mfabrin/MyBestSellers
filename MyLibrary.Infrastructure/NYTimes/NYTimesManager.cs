using Microsoft.Extensions.Options;
using MyLibrary.Common.Settings;
using RestSharp;
using MyLibrary.Infrastructure.NYTimes.Models;
using System.Net;

namespace MyLibrary.Infrastructure.NYTimes
{
    public class NYTimesManager
    {
        public IOptions<NYTimesSettings> _settings;

        public NYTimesManager(IOptions<NYTimesSettings> settings)
        {
            _settings = settings;
        }


        public async Task<CategoryBooksResponse> GetCategoryBooks(int pageNr, string publishDate, string category)
        {
            var client = GetClient();

            var restRequest = new RestRequest($"/lists/{publishDate}/{category}.json");

            restRequest.AddParameter("api-key", _settings.Value.APIKey);
            restRequest.AddParameter("offset", pageNr);

            var response = await client.ExecuteAsync<CategoryBooksResponse>(restRequest);

            if (response.StatusCode != HttpStatusCode.OK)
                throw new Exception("Error calling API for books", response.ErrorException);

            return response.Data;
        }

        public async Task<CategoriesResponse> GetCategories()
        {
            var client = GetClient();

            var restRequest = new RestRequest($"/lists/names.json");

            restRequest.AddParameter("api-key", _settings.Value.APIKey);

            var response = await client.ExecuteAsync<CategoriesResponse>(restRequest);

            if (response.StatusCode != HttpStatusCode.OK)
                throw new Exception("Error calling API for categories", response.ErrorException);

            return response.Data;
        }


        private RestClient GetClient()
        {
            var client = new RestClient(_settings.Value.Endpoint);
            return client;
        }
    }
}
