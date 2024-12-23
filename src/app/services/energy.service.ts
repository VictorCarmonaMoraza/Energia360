import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Plant } from '../models/plant';
import { EnergyType } from '../models/energy';
import { EndpointsBack } from '../EndpointsBack/endpoints.app';

@Injectable({
  providedIn: 'root'
})
export class EnergyService {

    urlApi:string = EndpointsBack.LOCALHOSTS_HTTP;
    typeUrlApi:string ='energy';

  constructor(private http: HttpClient) { }

  /**
   * Obtain all  the type of energy
   * @returns all  the type of energy that exist in the system
   */
  getAllEnergyTypes(): Observable<EnergyType[]> {
    //this is the url with will call a Back
    return this.http.get<EnergyType[]>(`${this.urlApi}/${this.typeUrlApi}/all`)
  }

  getTypeEnergyById(idEnergy: number):Observable<EnergyType>{
    return this.http.get<EnergyType>(`${this.urlApi}/${this.typeUrlApi}/typeEnergy/${idEnergy}`)
  }
}
