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



        public async Task<BestSellersOverviewResponse> GetBestSellersOverview(string publishDate)
        {
            var client = GetClient();

            var restRequest = new RestRequest($"/lists/full-overview.json");

            restRequest.AddParameter("api-key", _settings.Value.APIKey);
            restRequest.AddParameter("publishDate", publishDate);

            var response = await client.ExecuteAsync<BestSellersOverviewResponse>(restRequest);

            if (response.StatusCode != HttpStatusCode.OK)
                throw new Exception("Error calling API for best sellers overview", response.ErrorException);

            return response.Data;
        }

        public async Task<BestSellersCategoryResponse> GetBestSellers(string publishDate, string category)
        {
            var client = GetClient();

            var restRequest = new RestRequest($"/lists/{publishDate}/{category}.json");

            restRequest.AddParameter("api-key", _settings.Value.APIKey);

            var response = await client.ExecuteAsync<BestSellersCategoryResponse>(restRequest);

            if (response.StatusCode != HttpStatusCode.OK)
                throw new Exception("Error calling API for best sellers", response.ErrorException);

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
