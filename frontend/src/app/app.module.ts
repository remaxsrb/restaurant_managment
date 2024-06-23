// src/app/app.module.ts
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { AuthService } from './services/auth.service';
import { FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AdminDashboardComponent } from './components/admin-dashboard/admin-dashboard.component';
import { AdminLoginComponent } from './components/admin-login/admin-login.component';
import { ChangePasswordComponent } from './components/change-password/change-password.component';
import { HomepageComponent } from './components/homepage/homepage.component';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import { WaiterDashboardComponent } from './components/waiter-dashboard/waiter-dashboard.component';
import { AuthInterceptor } from './interceptors/auth.interceptor';
import { GuestDashBoardComponent } from './components/guest-dashboard/guest-dashborad.component';
import { JwtModule, JwtHelperService } from '@auth0/angular-jwt';

@NgModule({
  declarations: [
    AppComponent,
    HomepageComponent,
    LoginComponent,
    SignupComponent,
    AdminLoginComponent,
    GuestDashBoardComponent, 
    WaiterDashboardComponent,
    AdminDashboardComponent,
    ChangePasswordComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    FormsModule,
    HttpClientModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: () => {
          return localStorage.getItem('access_token');
        },
        allowedDomains: ["http://127.0.0.1:4000/"],
        //disallowedRoutes: ["http://example.com/examplebadroute/"],
      },
    }),
  ],
  providers: [
    AuthService,
    JwtHelperService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
