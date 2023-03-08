using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Text.Json.Serialization;

namespace vatcalculator.Models
{
    public class Country
    {
        public Int32 Id { get; set; }
        [JsonPropertyName("Name")]
        public String? CountryName { get; set; } 
        public List<string>? VatValues { get; set; }
    }
}