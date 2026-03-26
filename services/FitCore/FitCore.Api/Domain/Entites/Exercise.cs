using FitCore.Api.Domain.Entites.BaseEntites;

namespace FitCore.Api.Domain.Entites
{
    public class Exercise : TenantEntityWithChangeTracking  
    {
        public string Name { get; set; }
        public int Sets { get; set; }
        public int Reps { get; set; }
        public string Weight { get; set; }

    }
}
