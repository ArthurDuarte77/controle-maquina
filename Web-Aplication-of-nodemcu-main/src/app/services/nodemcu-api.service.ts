import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Nodemcu } from '../interfaces/nodemcu';



@Injectable({
  providedIn: 'root'
})
export class NodemcuApiService {

  token: any = ""



  constructor(private http: HttpClient) { }

  getThdados(): Observable<Nodemcu[]>{
    const headers = this.getHeadersWithAuthorization();
    return this.http.get<Nodemcu[]>(environment.apiUrl + "nodemcu", {headers})
  }

  getThdadosMachina(name: string): Observable<Nodemcu[]>{
    const headers = this.getHeadersWithAuthorization();
    return this.http.get<Nodemcu[]>(environment.apiUrl + 'nodemcu/' + name, {headers})
  }


  findByNameOrderByIdDescLimit1(name: string): Observable<Nodemcu>{
    const headers = this.getHeadersWithAuthorization();
    return this.http.get<Nodemcu>(environment.apiUrl + "nodemcu/desc/" + name, {headers})
  }

  private getHeadersWithAuthorization(): HttpHeaders {
    this.token = JSON.parse(localStorage.getItem('currentUser')!)
    return new HttpHeaders({
      'Authorization': `Bearer ${this.token.token}`
    });
  }

}
