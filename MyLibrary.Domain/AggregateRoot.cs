using MyLibrary.Domain.ValueObjects;

namespace MyLibrary.Domain
{
    public class AggregateRoot
    {
        public Guid Id { get; private set; }
        public AuditInfo AuditInfo { get; internal set; }
    }
}