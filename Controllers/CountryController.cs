using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using vatcalculator.Services;
using vatcalculator.Models; 

    


namespace vatcalculator.Controllers
{
    [ApiController]
    [Route("vatcalcapi/[controller]")]
    public class CountryController : ControllerBase
    {
        private readonly CountryServices _countryServices;
        public CountryController(CountryServices countryServices)
        {
            _countryServices = countryServices;
        }

        [HttpGet("ListAll")]
        public async Task<List<Country>> Get() =>
            await _countryServices.GetAsync();
    }
}