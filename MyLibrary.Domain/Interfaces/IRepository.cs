using System.Linq.Expressions;

namespace MyLibrary.Domain.Interfaces
{
    public interface IRepository<TEntity> where TEntity : AggregateRoot
    {
        Task<List<TEntity>> Get(Expression<Func<TEntity, bool>> predicate, int skip = -1, int take = -1, Expression<Func<TEntity, object>> sortOrder = null, bool sortDescending = false);
        Task<List<TNewEntity>> Get<TNewEntity>(Expression<Func<TEntity, bool>> predicate, Expression<Func<TEntity, TNewEntity>> projection, int skip = -1, int take = -1, Expression<Func<TEntity, object>> sortOrder = null, bool sortDescending = false);

        Task<long> GetCount(Expression<Func<TEntity, bool>> predicate);

        Task<TEntity> GetSingleOrDefaultAsync(Expression<Func<TEntity, bool>> predicate);
        Task<TProjection> GetSingleOrDefaultAsync<TProjection>(Expression<Func<TEntity, bool>> predicate, Expression<Func<TEntity, TProjection>> projection);

        Task InsertAsync(TEntity entity);

        IUpdateAction<TEntity> Update(TEntity entity);
    }
}