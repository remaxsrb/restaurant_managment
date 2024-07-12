// src/app/app.module.ts
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {
  HTTP_INTERCEPTORS,
  provideHttpClient,
  withInterceptorsFromDi,
} from '@angular/common/http';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { AuthService } from './services/utility_services/auth.service';
import { FormsModule } from '@angular/forms';
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
import { AskQuestionComponent } from './components/ask-question/ask-question.component';
import { AdminDashboardRestaurantsComponent } from './components/admin-dashboard-restaurants/admin-dashboard-restaurants.component';
import { AdminDashboardWaitersComponent } from './components/admin-dashboard-waiters/admin-dashboard-waiters.component';
import { AdminDashboardGuestsComponent } from './components/admin-dashboard-guests/admin-dashboard-guests.component';
import { UserProfileComponent } from './components/user-profile/user-profile.component';
import { GuestDashboardRestaurantsComponent } from './components/guest-dashboard-restaurants/guest-dashboard-restaurants.component';
import { GuestDashboardReservationsComponent } from './components/guest-dashboard-reservations/guest-dashboard-reservations.component';
import { GuestDashboardFoodOrderComponent } from './components/guest-dashboard-food-order/guest-dashboard-food-order.component';
import { RestaurantComponent } from './components/restaurant/restaurant.component';
import { TimepickerModule } from 'ngx-bootstrap/timepicker';
import { RatingModule } from 'ngx-bootstrap/rating';
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
    AskQuestionComponent,
    AdminDashboardRestaurantsComponent,
    AdminDashboardWaitersComponent,
    AdminDashboardGuestsComponent,
    UserProfileComponent,
    GuestDashboardRestaurantsComponent,
    GuestDashboardReservationsComponent,
    GuestDashboardFoodOrderComponent,
    RestaurantComponent,
  ],
  bootstrap: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    TimepickerModule,
    RatingModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: () => {
          return localStorage.getItem('access_token');
        },
        allowedDomains: ['https://127.0.0.1:4000/'],
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
      multi: true,
    },
    provideHttpClient(withInterceptorsFromDi()),
  ],
})
export class AppModule {}
