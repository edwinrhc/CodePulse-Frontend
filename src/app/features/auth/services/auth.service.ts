  import { Injectable } from '@angular/core';
  import { LoginRequest } from '../models/login-request.model';
  import { BehaviorSubject, Observable } from 'rxjs';
  import { LoginResponse } from '../models/login-response.model';
  import { HttpClient } from '@angular/common/http';
  import { environment } from 'src/environments/environment';
  import { User } from '../models/user.model';
import { CookieService } from 'ngx-cookie-service';

  @Injectable({
    providedIn: 'root',
  })
  export class AuthService {
    $user = new BehaviorSubject<User | undefined>(undefined);

    constructor(
          private http: HttpClient,
          private cookieService: CookieService) {}

    login(request: LoginRequest): Observable<LoginResponse> {
      return this.http.post<LoginResponse>(
        `${environment.apiBaseUrl}/api/auth/login`,
        {
          email: request.email,
          password: request.password,
        }
      );
    }

    setUser(user: User): void {
      this.$user.next(user);
      localStorage.setItem('user-email', user.email);
      localStorage.setItem('user-roles', user.roles.join(','));
    }

    user(): Observable<User | undefined> {
      return this.$user.asObservable();
    }

    getUser(): User | undefined {

      // Obtener el correo electrónico y los roles del usuario del almacenamiento local
      const email = localStorage.getItem('user-email');
      const roles = localStorage.getItem('user-roles');

// Verificar si se encontraron el correo electrónico y los roles en el almacenamiento local
      if(email && roles){
        // Si se encontraron, crear un objeto User con la información obtenida
        const user: User =  {
          email: email,
          roles: roles?.split(',') // Convertir la cadena de roles separada por comas en un arreglo
        }
        return user; // Devolver el objeto User creado
      }
      // Si no se encontraron el correo electrónico y los roles, devolver undefined
      return undefined;
    }


    logout():void{
      localStorage.clear();
      this.cookieService.delete('Authorization', '/');
      this.$user.next(undefined);
    }


  }
