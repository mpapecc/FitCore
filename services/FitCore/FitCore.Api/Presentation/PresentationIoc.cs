using System.ComponentModel;
using System.Xml.Linq;
using FitCore.Api.Presentation.Features;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Controllers;

namespace FitCore.Api.Presentation
{
    public static class PresentationIoc
    { 
        public static IServiceCollection AddPresentation(this IServiceCollection services)
        {
            services.AddControllers(o =>
                o.Conventions
                    .Add(new GenericControllerRouteConvention()))
                    .ConfigureApplicationPartManager(m =>
                        m.FeatureProviders.Add(new GenericTypeControllerFeatureProvider()
                ));

            services.AddOpenApi();

            services.AddCors(options =>
            {
                options.AddPolicy("FitCorePolicy", policy =>
                    policy
                        .WithOrigins(
                            "http://localhost:5173",
                            "https://localhost:5173",  // Vite web app
                            "http://localhost:8081"// Expo mobile
                        )
                        .AllowAnyHeader()
                        .AllowAnyMethod()
                        .AllowCredentials());
            });

            return services;
        }
    }
}
