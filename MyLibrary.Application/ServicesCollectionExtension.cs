using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using MyLibrary.Application.Services;
using MyLibrary.Common.Settings;
using MyLibrary.Domain.Interfaces;
using MyLibrary.Infrastructure.NYTimes;
using MyLibrary.Infrastructure.Repository;

namespace MyLibrary.Application
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