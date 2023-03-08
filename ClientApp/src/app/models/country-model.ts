export class Country {
  public Id?: number;
  public Name = "";
  public VatValues = [];

  getCountries(country: Country): string[] {
    return country.VatValues.filter(Name => typeof Name === 'string');
  }
}
