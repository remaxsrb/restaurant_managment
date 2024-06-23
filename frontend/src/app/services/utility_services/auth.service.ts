import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Router } from '@angular/router';
import { UserService } from '../model_services/user.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly TOKEN_KEY = 'authToken';

  constructor(
    private http: HttpClient,
    private router: Router,
    private userService: UserService,
    public jwtHelper: JwtHelperService
  ) {}

  login(username: string, password: string) {
    return this.userService.login(username, password)
  }

  logout() {
    if (this.get_role() === 'admin') {
      localStorage.removeItem(this.TOKEN_KEY);
      this.router.navigate(['/admin_login']);
    } else {
      localStorage.removeItem(this.TOKEN_KEY);

      this.router.navigate(['/login']);
    }
  }

  is_LoggedIn(): boolean {
    const token = this.get_token();
    return token !== null && !this.jwtHelper.isTokenExpired(token);
  }

  get_token(): string | null {
    return localStorage.getItem(this.TOKEN_KEY);
  }

  is_Authenticated(): boolean {
    const token = this.get_token();
    return !!token && !this.jwtHelper.isTokenExpired(token);
  }

  get_role(): string {
    const token = this.get_token();
    if (!token) return '';
    const decodedToken = this.decode_token(token);
    return decodedToken.role;
  }

  decode_token(token: string): any {
    return this.jwtHelper.decodeToken(token);
  }
}
