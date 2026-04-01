
namespace FitCore.Api.Domain.Entites.BaseEntites
{
    public abstract class BaseDictionary : TenantEntityWithChangeTracking
    {
        public required string Label { get; set; }
        public required string Description { get; set; }
        public bool IsDefault { get; set; }
    }

    public class DictionaryAttribute : Attribute
    {
        public string Name { get; }

        public DictionaryAttribute(string name)
        {
            Name = name;
        }
    }
}
