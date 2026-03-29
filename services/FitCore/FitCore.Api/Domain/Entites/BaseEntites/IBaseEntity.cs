namespace FitCore.Api.Domain.Entites.BaseEntites
{
    public interface IBaseEntity<Key> where Key : struct
    {
        Key Id { get; set; }
    }
}
