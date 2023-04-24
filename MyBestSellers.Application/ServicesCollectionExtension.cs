using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using MyBestSellers.Application.Services;
using MyBestSellers.Common.Settings;
using MyBestSellers.Domain.Interfaces;
using MyBestSellers.Infrastructure.NYTimes;
using MyBestSellers.Infrastructure.Repository;

namespace MyBestSellers.Application
{
    public static class ServicesCollectionExtension
    {
        public static void AddApplicationServices(this IServiceCollection services, IConfiguration configuration)
        {
            // Settings
            services.Configure<DbSettings>(configuration.GetSection(nameof(DbSettings)));
            services.Configure<NYTimesSettings>(configuration.GetSection(nameof(NYTimesSettings)));


            // Repository
            services.AddSingleton(typeof(PrepareDatabase));
            services.AddScoped(typeof(IRepository<>), typeof(Repository<>));

            // Infrastructure services
            services.AddScoped<NYTimesManager>();

            // Services
            services.AddScoped<ApplicationService>();
            services.AddScoped<BookService>();
        }
    }
}