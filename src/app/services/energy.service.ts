import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Plant } from '../models/plant';
import { EnergyType } from '../models/energy';

@Injectable({
  providedIn: 'root'
})
export class EnergyService {

  constructor(private http: HttpClient) { }

  /**
   * Obtain all  the type of energy
   * @returns all  the type of energy that exist in the system
   */
  getAllEnergyTypes(): Observable<EnergyType[]> {
    //this is the url with will call a Back
    return this.http.get<EnergyType[]>(`http://localhost:5018/api/energy/all`)
  }
}
