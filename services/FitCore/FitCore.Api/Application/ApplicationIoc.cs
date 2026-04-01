using FitCore.Api.Domain;

namespace FitCore.Api.Application
{
    public static class ApplicationIoc
    {
        public static IServiceCollection AddApplication( this IServiceCollection services)
        {
            services.AddMediatR(cfg => cfg.RegisterServicesFromAssembly(typeof(Program).Assembly));
            return services;
        }
    }
}
