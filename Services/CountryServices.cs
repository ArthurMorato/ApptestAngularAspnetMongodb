using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using vatcalculator.Services;
using vatcalculator.Models;
using MongoDB.Driver;
using Microsoft.Extensions.Options;

namespace vatcalculator.Services
{
    public class CountryServices
    {
    private readonly IMongoCollection<Country> _countriesCollection;

    public CountryServices(
        IOptions<VetcalcSettings> countriesDatabaseSettings)
    {
        var mongoClient = new MongoClient(
            countriesDatabaseSettings.Value.ConnectionString);

        var mongoDatabase = mongoClient.GetDatabase(
            countriesDatabaseSettings.Value.DatabaseName);

        _countriesCollection = mongoDatabase.GetCollection<Country>(
            countriesDatabaseSettings.Value.CollectionName);
    }

    public async Task<List<Country>> GetAsync() =>
        await _countriesCollection.Find(_ => true).ToListAsync();
    }    

}