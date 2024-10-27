import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { EndpointsBack } from '../EndpointsBack/endpoints.app';
import { User } from '../models/user';


@Injectable({
  providedIn: 'root'
})
export class UserService {

  Url = EndpointsBack.LOCALHOSTS_HTTP;
  Url_User = EndpointsBack.URL_USERS;

  //Todos los usuarios
  allUsersList: string = EndpointsBack.ALL_USERS;


  constructor(private http: HttpClient) { }



  saveUser(user: User): Observable<any> {
    return this.http.post(`${this.Url}${this.Url_User}/create`, user)
  }

  getUsers():Observable<any>{
    console.log(`${this.Url}${this.Url_User}${this.allUsersList}`);
    return this.http.get<any>(`${this.Url}${this.Url_User}${this.allUsersList}`)
  }
}
