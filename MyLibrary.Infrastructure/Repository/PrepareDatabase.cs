using MongoDB.Bson;
using MongoDB.Bson.Serialization;
using MongoDB.Bson.Serialization.Conventions;
using MongoDB.Bson.Serialization.Serializers;

namespace MyLibrary.Infrastructure.Repository
{
    public class PrepareDatabase
    {
        public PrepareDatabase()
        {
            BsonDefaults.GuidRepresentation = GuidRepresentation.Standard;

            BsonSerializer.RegisterSerializer(typeof(decimal), new DecimalSerializer(BsonType.Decimal128));
            BsonSerializer.RegisterSerializer(typeof(decimal?), new NullableSerializer<decimal>(new DecimalSerializer(BsonType.Decimal128)));

            ConventionRegistry.Register("Ignore null values", new ConventionPack
            {
                //new IgnoreIfNullConvention(true),
                new IgnoreExtraElementsConvention(true),
                new EnumRepresentationConvention(BsonType.String)
            }, _ => true);


        }
    }
}