import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HistoricPlant, Plant } from '../models/plant';

@Injectable({
  providedIn: 'root'
})
export class PlantService {


  constructor(private http: HttpClient) { }

  getAllPlants(): Observable<Plant[]> {
    //console.log(`${this.Url}${this.Url_User}${this.allUsersList}`);
    return this.http.get<Plant[]>(`http://localhost:5018/api/plant/allPlants`)
  }

  getHistoricPlant(idPlant: number): Observable<HistoricPlant[]> {
    return this.http.get<HistoricPlant[]>(`http://localhost:5018/api/history/historyPlant/${idPlant}`);
  }


  importFile(data: FormData): Observable<any> {
    return this.http.post<any>('http://localhost:5018/api/plant/importar', data, {
      reportProgress: true,
      observe: 'events'
    });
  }

}
