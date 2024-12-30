import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HistoricPlant, RenewableEnergyPlant, RenewableEnergyPlantCreation } from '../models/plant';
import { EndpointsBack } from '../EndpointsBack/endpoints.app';

@Injectable({
  providedIn: 'root'
})
export class PlantService {

  urlApi: string = EndpointsBack.LOCALHOSTS_HTTP;
  typeUrlApi: string = 'plant';


  constructor(private http: HttpClient) { }

  getAllPlants(): Observable<RenewableEnergyPlant[]> {
    //console.log(`${this.Url}${this.Url_User}${this.allUsersList}`);
    return this.http.get<RenewableEnergyPlant[]>(`${this.urlApi}/${this.typeUrlApi}/allPlants`)
  }

  getHistoricPlant(idPlant: number): Observable<HistoricPlant[]> {
    return this.http.get<HistoricPlant[]>(`${this.urlApi}/${this.typeUrlApi}/historyPlant/${idPlant}`);
  }

  /**
   *
   * @param idPlant id de la planta
   * @returns informacion de la planta
   */
  getDataPlantById(idPlant: number): Observable<RenewableEnergyPlant> {
    return this.http.get<RenewableEnergyPlant>(`${this.urlApi}/${this.typeUrlApi}/info/${idPlant}`);
  }

  importFile(data: FormData): Observable<any> {
    return this.http.post<any>(`${this.urlApi}/${this.typeUrlApi}/importar`, data, {
      reportProgress: true,
      observe: 'events'
    });
  }

  postCreatePlant(data: RenewableEnergyPlantCreation): Observable<RenewableEnergyPlantCreation> {
    console.log(`${this.urlApi}/${this.typeUrlApi}/create`);
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    return this.http.post<RenewableEnergyPlantCreation>(`${this.urlApi}/${this.typeUrlApi}/create`, data, { headers });
  }

}
