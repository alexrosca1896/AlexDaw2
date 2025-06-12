import { Injectable } from '@angular/core';
import { Observable, of, switchMap, tap } from 'rxjs';
import { Client } from '../../../models/client.model';
import { ApiEndpoints } from '../../../../core/constants/api-endpoints';
import { HttpService } from '../../../../core/services/http.service';
import { jwtDecode } from 'jwt-decode';

interface JwtPayload {
  id: string;
  sub: string;
  jti: string;
  exp: number;
}

@Injectable({ providedIn: 'root' })
export class AuthService {
  private tokenKey = 'auth_token';
  private currentUser: Client | null = null;

  constructor(private http: HttpService) {}

  register(client: Client): Observable<Client> {
    return this.http.post<Client>(ApiEndpoints.REGISTER, client);
  }

  login(dni: string, password: string): Observable<Client> {
    return this.http
      .post<{ token: string }>(ApiEndpoints.LOGIN, {
        user: dni,
        password: password,
      })
      .pipe(
        tap((response) => localStorage.setItem(this.tokenKey, response.token)),
        switchMap(() => this.loadUserProfile())
      );
  }

  getToken(): string | null {
    if (typeof window !== 'undefined') {
      return localStorage.getItem(this.tokenKey);
    }
    return null;
  }

  logout(): void {
    if (typeof window !== 'undefined') {
      localStorage.removeItem(this.tokenKey);
    }
    this.currentUser = null;
  }

  isLoggedIn(texto?: string): boolean {
    return !!this.getToken();
  }

  public getCurrentUser(): Client | null {
    return this.currentUser;
  }

  loadUserProfile(): Observable<Client> {
    const id = this.getClientIdFromToken();
    if (!id) return of(null as any);

    const user = this.http
      .get<Client>(ApiEndpoints.CLIENT_BY_ID(id))
      .pipe(tap((client) => (this.currentUser = client)));
    return user;
  }

  updateClient(client: any): Observable<void> {
    return this.http
      .put<void>(ApiEndpoints.UPDATE_CLIENT + '/' + client.id, client)
      .pipe(
        tap(() => {
          this.currentUser = client;
        })
      );
  }

  private getClientIdFromToken(): number | null {
    const token = this.getToken();
    if (!token) return null;
    const decoded = jwtDecode<JwtPayload>(token);
    return +decoded.id;
  }
}
