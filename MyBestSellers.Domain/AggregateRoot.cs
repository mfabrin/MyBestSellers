
namespace MyBestSellers.Domain
{
    public class AggregateRoot
    {
        public Guid Id { get; private set; }

        public virtual bool IsTransient()
        {
            return Id == Guid.Empty || Id == new Guid();
        }
    }
}