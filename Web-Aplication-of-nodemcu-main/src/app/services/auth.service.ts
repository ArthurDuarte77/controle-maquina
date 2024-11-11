import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable, catchError, map, of } from 'rxjs';
import { Router } from '@angular/router';
import { UsersLogin  } from '../interfaces/usersLogin';
import { currentUser } from '../interfaces/currentUser';
import { Users, Role } from '../interfaces/users';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private token: any = ""
  interval: NodeJS.Timer | undefined;

  constructor(private http: HttpClient, private router: Router) { }

  login(email: string, password: string) {
    var body: UsersLogin = {
      email: email!,
      password: password,
    }
    return this.http.post(environment.apiUrl + "auth/authenticate", body).pipe(
      map((res: any) => {
        if (res != null) {
          console.log(res)
          this.interval = setInterval(() => {
            const headers = this.getHeadersWithAuthorization();
            this.http.get(environment.apiUrl + "user/id", {headers}).subscribe((res: any) => {
            }, error => {
              this.http.post(environment.apiUrl + "auth/authenticate", body).subscribe((res: any) => {
                var currentUserBody: currentUser = {
                  "token": res.token,
                  "email": body.email
                }
                localStorage.setItem('currentUser', JSON.stringify(currentUserBody));  
              }, error => {
                this.logout()
                this.router.navigate(['/login'])
              })
            })
          }, 10000)
          var currentUserBody: currentUser = {
            "token": res.token,
            "email": body.email
          }
          localStorage.setItem('currentUser', JSON.stringify(currentUserBody)); 
          return res;
        } else {
          return false;
        }
      }),
      catchError((error: any) => {
        console.error('Error:', error);
        return of(false);
      })
    );
  }

  createLogin(credentials: Users){
    const headers = this.getHeadersWithAuthorization();
    this.http.post<Users>(environment.apiUrl + "auth/register", credentials, {headers}).subscribe((res: Users) => {return res})
  }

  logout() {
    clearInterval(this.interval)
    localStorage.removeItem('currentUser'); 
    this.router.navigate(['/login'])

  }

  getCurrentUser() {
    return localStorage.getItem('currentUser')!
  }

  isLoggedIn() {
    const headers = this.getHeadersWithAuthorization();
    this.http.get(environment.apiUrl + "user/id", {headers}).subscribe((res: any) => {
    },(error) => {
      this.logout();
      return of(true)
    });
    
    return of(localStorage.getItem('currentUser') !== null);
  }

  getById(): Observable<Users>{
    const headers = this.getHeadersWithAuthorization();
    return this.http.get<Users>(environment.apiUrl + "user/id", {headers})
  }
  veryfyPassword(password: string, newPassword: string): Observable<Boolean>{
    const headers = this.getHeadersWithAuthorization();
    var body =  {
      "password": password,
      "encodePassword": newPassword 

    }
    return this.http.post<Boolean>(environment.apiUrl + "user", body ,{headers});
  }

  private getHeadersWithAuthorization(): HttpHeaders {
    this.token = JSON.parse(localStorage.getItem('currentUser')!)
    return new HttpHeaders({
      'Authorization': `Bearer ${this.token.token}`
    });
  }
}
