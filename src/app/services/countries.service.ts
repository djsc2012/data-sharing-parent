import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class CountriesService {
  url = `/assets/countries.json`;

  constructor(private http: HttpClient) {}

  getCountries() {
    return this.http.get<Response>(this.url);
  }
}

export interface CountryInfo {
  name: string;
  code: string;
}

export interface Response {
  data: CountryInfo[];
}
