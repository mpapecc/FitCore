using System.Reflection;
using FitCore.Api.Domain.Entites.BaseEntites;
using FitCore.Api.Presentation.Controllers;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.ApplicationModels;
using Microsoft.AspNetCore.Mvc.ApplicationParts;
using Microsoft.AspNetCore.Mvc.Controllers;

namespace FitCore.Api.Presentation.Features
{
    public class GenericControllerFeatureProvider : ControllerFeatureProvider
    {
        // Override the base check — return false for the open generic
        protected override bool IsController(TypeInfo typeInfo)
        {
            if (typeInfo.IsGenericTypeDefinition)
                return false;

            return base.IsController(typeInfo);
        }
    }


    public class GenericTypeControllerFeatureProvider : IApplicationFeatureProvider<ControllerFeature>
    {
        public void PopulateFeature(IEnumerable<ApplicationPart> parts, ControllerFeature feature)
        {
            var currentAssembly = typeof(GenericTypeControllerFeatureProvider).Assembly;
            var candidates = currentAssembly.GetExportedTypes().Where(x => x.GetCustomAttributes<DictionaryAttribute>().Any());

            foreach (var candidate in candidates)
            {
                var controller = typeof(DictionaryController<>).MakeGenericType(candidate);
                //controller.Name = $"{candidate.Name}Controller";

                feature.Controllers.Add(
                    controller.GetTypeInfo()
                );
            }
        }
    }

    public class GenericControllerRouteConvention : IControllerModelConvention
    {
        public void Apply(ControllerModel controller)
        {
            if (controller.ControllerType.IsGenericType)
            {
                var genericType = controller.ControllerType.GenericTypeArguments[0];
                var customNameAttribute = genericType.Name;
                
                controller.ControllerName = customNameAttribute;
                controller.Selectors.Add(new SelectorModel
                {
                    AttributeRouteModel = new AttributeRouteModel(new RouteAttribute($"api/{customNameAttribute}"))
                });
            }
        }
    }
}
