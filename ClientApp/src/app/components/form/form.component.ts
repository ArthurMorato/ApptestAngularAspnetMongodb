import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, MaxLengthValidator, Validators } from '@angular/forms';
import { Country } from 'src/app/models/country-model';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css'],
})
export class FormComponent implements OnInit {


  selectedCountry: string = '';
  countriesNames?: string[];
  countries?: Country[];
  vatValue?: 0;
  showRadioButtons = false;
  selectedCountryVats: any;
  selectedVat: number = 0;
  priceWithoutVatVal: number = 0;
  valueAddedTaxVal: number = 0;
  priceInclTaxVal: number = 0;



  constructor(private authService: AuthService) { }

  submitForm = new FormGroup({
    country: new FormControl("", [Validators.required]),
    vatValue: new FormControl("", [Validators.required]),
    optionval: new FormControl("", Validators.required),
    priceWithoutVatVal: new FormControl("", [Validators.required, Validators.min(1), Validators.pattern("^[0-9]+(\.[0-9]+)?$")]),
    valueAddedTaxVal: new FormControl("", [Validators.required, Validators.min(1), Validators.pattern("^[0-9]+(\.[0-9]+)?$")]),
    priceInclTaxVal: new FormControl("", [Validators.required, Validators.min(1), Validators.pattern("^[0-9]+(\.[0-9]+)?$")]),
  });

  whenSubmitted() {
    //  this.authService.getCountries().subscribe(res => {
    //   this.countries = res;
    //  });

  }

  ngOnInit() {
    const temp = this.authService.getCountries().subscribe(res => {
      this.countriesNames = res.map((country) => country.Name);
      this.countries = res;
    });
  }

  onCountrySelect(event: any): void {
    this.authService.getCountries().subscribe(res => {
      this.selectedCountry = event.target.value;
      this.selectedCountryVats = res.find(country => country.Name === this.selectedCountry)?.VatValues || [];
      this.showRadioButtons = this.selectedCountryVats.length > 0;
    });
  }

  containsOnlyRegex(str: string) {

    return /^[0-9]+(\.[0-9]+)?$/.test(str);
  }

  onInputValueChange(event: any) {
    if (this.containsOnlyRegex(event.target.value) && this.selectedVat) {
      switch (event.target.id) {
        case 'priceWithoutVatVal':
          this.valueAddedTaxVal = (this.selectedVat * event.target.value) / 100;
          this.priceInclTaxVal = event.target.value + this.valueAddedTaxVal;
          this.submitForm.patchValue({
            valueAddedTaxVal: this.valueAddedTaxVal.toString(),
            priceInclTaxVal: this.priceInclTaxVal.toString()
          });
          break;
        case 'valueAddedTaxVal':
          console.log(this.containsOnlyRegex(event.target.id));
          this.priceWithoutVatVal = (100 * event.target.value) / this.selectedVat;
          this.priceInclTaxVal = event.target.value + this.priceWithoutVatVal;
          this.submitForm.patchValue({
            priceWithoutVatVal: this.priceWithoutVatVal.toString(),
            priceInclTaxVal: this.priceInclTaxVal.toString()
          });
          break;
        case 'priceInclTaxVal':
          this.priceWithoutVatVal = (100 * event.target.value) / this.selectedVat;
          this.valueAddedTaxVal = event.target.value + this.priceWithoutVatVal;
          this.submitForm.patchValue({
            priceWithoutVatVal: this.priceWithoutVatVal.toString(),
            priceInclTaxVal: this.priceInclTaxVal.toString()
          });
          break;
      }
    }
     else {
      console.log("Caiu no else!!!!");
      console.log(this.containsOnlyRegex(event.target.value));
    }
  }

  onVatChange(event: any) {
    this.selectedVat = (event.target.id); //erro value
    this.submitForm.patchValue({
      priceWithoutVatVal: "",
      valueAddedTaxVal: "",
      priceInclTaxVal: ""
    });
  }

  get Country(): FormControl {
    return this.submitForm.get("country") as FormControl;
  }

  get Vat(): FormControl {
    return this.submitForm.get("vatValue") as FormControl;
  }

  get Optionval(): FormControl {
    return this.submitForm.get("optionval") as FormControl;
  }

  get PriceWithoutVatVal(): FormControl {
    return this.submitForm.get("priceWithoutVatVal") as FormControl;
  }

  get ValueAddedTaxVal(): FormControl {
    return this.submitForm.get("valueAddedTaxVal") as FormControl;
  }

  get PriceInclTaxVal(): FormControl {
    return this.submitForm.get("priceInclTaxVal") as FormControl;
  }

}
