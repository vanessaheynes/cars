import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Car {
  [key: string]: any;
}

@Injectable({
  providedIn: 'root'
})

export class CarService {
  private apiUrl = '/api/cars'; 
  constructor(private http: HttpClient) {}

  getCars(): Observable<Car[]> {
    return this.http.get<Car[]>(`${this.apiUrl}/cars`);
  }
}
