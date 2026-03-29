namespace FitCore.Api.Domain.Entites.BaseEntites
{
    public abstract class AbstractEntity<T> : IBaseEntity<T> where T : struct
    {
        public T Id { get; set; }
    }
}
