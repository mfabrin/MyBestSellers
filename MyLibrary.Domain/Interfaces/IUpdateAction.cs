using System;
using System.Collections.Generic;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;

namespace MyLibrary.Domain.Interfaces
{
    public interface IUpdateAction<TEntity> where TEntity : AggregateRoot
    {
        Task DoUpdateAsync();
        IUpdateAction<TEntity> Set<TField>(Expression<Func<TEntity, TField>> field, TField value);
    }
}
