using MyBestSellers.Domain;
using MyBestSellers.Domain.Interfaces;
using MongoDB.Driver;
using System.Linq.Expressions;

namespace MyBestSellers.Infrastructure.Repository
{
    public class UpdateAction<TEntity> : IUpdateAction<TEntity> where TEntity : AggregateRoot
    {
        private readonly TEntity _entity;
        private readonly IMongoCollection<TEntity> _collection;
        private readonly List<UpdateDefinition<TEntity>> _definitionsList;
        private readonly List<FilterDefinition<TEntity>> _filtersList;

        // Costruttore "internal" perché è chiamato da Repository.cs
        internal UpdateAction(IMongoCollection<TEntity> collection, TEntity entity)
        {
            _collection = collection;
            _entity = entity;
            _definitionsList = new List<UpdateDefinition<TEntity>>();
            _filtersList = new List<FilterDefinition<TEntity>>();
        }



        public IUpdateAction<TEntity> Set<TField>(Expression<Func<TEntity, TField>> field, TField value)
        {
            _definitionsList.Add(Builders<TEntity>.Update.Set(field, value));
            return this;
        }

        public async Task DoUpdateAsync()
        {
            if (_definitionsList == null || _definitionsList.Count == 0)
                throw new InvalidOperationException("Unable to do update, please use Set API to set your update operations.");

            // filters
            _filtersList.Add(Builders<TEntity>.Filter.Where(x => x.Id == _entity.Id));
            var filterDefinition = Builders<TEntity>.Filter.And(_filtersList);

            // update definition
            var updateDefinition = Builders<TEntity>.Update.Combine(_definitionsList);

            var a = await _collection.UpdateOneAsync(filterDefinition, updateDefinition);

            return;
        }
    }
}
