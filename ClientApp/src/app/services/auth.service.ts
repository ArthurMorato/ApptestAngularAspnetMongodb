import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, pipe } from 'rxjs';
import { Country } from '../models/country-model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private readonly http: HttpClient) { }

  baseServerUrl = "https://localhost:7041/vatcalcapi/Country/ListAll";

  public getCountries = (): Observable<Country[]> => {
    return this.http.get<Country[]>(this.baseServerUrl);
  }
}
