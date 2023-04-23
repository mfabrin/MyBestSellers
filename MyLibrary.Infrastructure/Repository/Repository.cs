using Microsoft.Extensions.Options;
using MongoDB.Driver;
using MyLibrary.Common.Settings;
using MyLibrary.Domain;
using MyLibrary.Domain.Interfaces;
using System;
using System.Linq.Expressions;

namespace MyLibrary.Infrastructure.Repository
{
    public class Repository<TEntity> : IRepository<TEntity> where TEntity : AggregateRoot
    {
        private readonly IMongoDatabase _database;
        private readonly IMongoCollection<TEntity> _collection;

        public Repository(IOptions<DbSettings> settings, PrepareDatabase prepareDatabase)
        {
            if (_database == null)
            {
                var client = new MongoClient(settings.Value.DefaultConnection);
                _database = client.GetDatabase(settings.Value.Database);
            }

            _collection = _database.GetCollection<TEntity>(typeof(TEntity).Name);
        }



        public async Task<List<TEntity>> Get(
            Expression<Func<TEntity, bool>> predicate,
            int skip = -1, int take = -1,
            Expression<Func<TEntity, object>> sortOrder = null,
            bool sortDescending = false)
        {
            var cursor = _collection.Find<TEntity>(predicate);

            if (sortOrder != null)
                cursor = sortDescending ? cursor.SortByDescending(sortOrder) : cursor.SortBy(sortOrder);

            if (skip != -1)
                cursor = cursor.Skip(skip);
            if (take != -1)
                cursor = cursor.Limit(take);

            return await cursor.ToListAsync();
        }

        public async Task<List<TNewEntity>> Get<TNewEntity>(
            Expression<Func<TEntity, bool>> predicate,
            Expression<Func<TEntity, TNewEntity>> projection,
            int skip = -1, int take = -1,
            Expression<Func<TEntity, object>> sortOrder = null,
            bool sortDescending = false)
        {
            var cursor = _collection.Find<TEntity>(predicate);

            if (sortOrder != null)
                cursor = sortDescending ? cursor.SortByDescending(sortOrder) : cursor.SortBy(sortOrder);

            if (skip != -1)
                cursor = cursor.Skip(skip);
            if (take != -1)
                cursor = cursor.Limit(take);

            return await cursor.Project(projection).ToListAsync();
        }


        public async Task InsertAsync(TEntity entity)
        {
            await _collection.InsertOneAsync(entity);
        }

        public async Task<TEntity> GetSingleOrDefaultAsync(Expression<Func<TEntity, bool>> predicate)
        {
            var cursor = _collection.Find(predicate);

            return await cursor.SingleOrDefaultAsync();
        }

        public async Task<TProjection> GetSingleOrDefaultAsync<TProjection>(
            Expression<Func<TEntity, bool>> predicate,
            Expression<Func<TEntity, TProjection>> projection)
        {

            return await _collection.Find(predicate).Project(projection).SingleOrDefaultAsync();
        }

        public IUpdateAction<TEntity> Update(TEntity entity)
        {
            return new UpdateAction<TEntity>(_collection, entity);
        }

        public async Task<long> GetCount(Expression<Func<TEntity, bool>> predicate)
        {
            return await _collection.CountDocumentsAsync<TEntity>(predicate);
        }

        public async Task Delete(TEntity entity)
        {
            var filter = Builders<TEntity>.Filter.Eq("Id", entity.Id);
            await _collection.DeleteOneAsync(filter);
        }
    }
}