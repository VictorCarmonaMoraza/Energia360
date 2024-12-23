import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HistoricPlant, Plant } from '../models/plant';

@Injectable({
  providedIn: 'root'
})
export class PlantService {

  urlApi:string ='http://localhost:5018/api';
  typeUrlApi:string ='plant';


  constructor(private http: HttpClient) { }

  getAllPlants(): Observable<Plant[]> {
    //console.log(`${this.Url}${this.Url_User}${this.allUsersList}`);
    return this.http.get<Plant[]>(`${this.urlApi}/${this.typeUrlApi}/allPlants`)
  }

  getHistoricPlant(idPlant: number): Observable<HistoricPlant[]> {
    return this.http.get<HistoricPlant[]>(`${this.urlApi}/${this.typeUrlApi}/historyPlant/${idPlant}`);
  }

  /**
   *
   * @param idPlant id de la planta
   * @returns informacion de la planta
   */
  getDataPlantById(idPlant:number):Observable<Plant>{
    return this.http.get<Plant>(`${this.urlApi}/${this.typeUrlApi}/info/${idPlant}`);
  }

  importFile(data: FormData): Observable<any> {
    return this.http.post<any>(`${this.urlApi}/${this.typeUrlApi}/importar`, data, {
      reportProgress: true,
      observe: 'events'
    });
  }

}
