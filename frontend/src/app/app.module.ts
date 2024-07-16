import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

//Prime NG modules
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TableModule } from 'primeng/table';
import { RadioButtonModule } from 'primeng/radiobutton';
import { CalendarModule } from 'primeng/calendar';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextModule } from 'primeng/inputtext';
import { FileUploadModule } from 'primeng/fileupload';
import { RatingModule } from 'primeng/rating';
import { FloatLabelModule } from 'primeng/floatlabel';
import { MessageModule } from 'primeng/message';
import { MessagesModule } from 'primeng/messages';
import { PasswordModule } from 'primeng/password';

// Third-party Modules
import { JwtModule, JwtHelperService } from '@auth0/angular-jwt';

// My Components and services
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { AuthService } from './services/utility_services/auth.service';
import { AuthInterceptor } from './interceptors/auth.interceptor';
import { HomepageComponent } from './components/homepage/homepage.component';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import { AdminLoginComponent } from './components/admin-login/admin-login.component';
import { GuestDashBoardComponent } from './components/guest-dashboard/guest-dashborad.component';
import { WaiterDashboardComponent } from './components/waiter-dashboard/waiter-dashboard.component';
import { AdminDashboardComponent } from './components/admin-dashboard/admin-dashboard.component';
import { ChangePasswordComponent } from './components/change-password/change-password.component';
import { AskQuestionComponent } from './components/ask-question/ask-question.component';
import { AdminDashboardRestaurantsComponent } from './components/admin-dashboard-restaurants/admin-dashboard-restaurants.component';
import { AdminDashboardWaitersComponent } from './components/admin-dashboard-waiters/admin-dashboard-waiters.component';
import { AdminDashboardGuestsComponent } from './components/admin-dashboard-guests/admin-dashboard-guests.component';
import { UserProfileComponent } from './components/user-profile/user-profile.component';
import { GuestDashboardRestaurantsComponent } from './components/guest-dashboard-restaurants/guest-dashboard-restaurants.component';
import { GuestDashboardReservationsComponent } from './components/guest-dashboard-reservations/guest-dashboard-reservations.component';
import { GuestDashboardFoodOrderComponent } from './components/guest-dashboard-food-order/guest-dashboard-food-order.component';
import { RestaurantComponent } from './components/restaurant/restaurant.component';
import { NewRestaurantFormComponent } from './components/new-restaurant-form/new-restaurant-form.component';

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
    NewRestaurantFormComponent,
  ],
  bootstrap: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    CalendarModule,
    RatingModule,
    DropdownModule,
    InputTextModule,
    FileUploadModule,
    TableModule,
    RadioButtonModule,
    FloatLabelModule,
    MessageModule,
    MessagesModule,
    PasswordModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: () => localStorage.getItem('access_token'),
        allowedDomains: ['https://127.0.0.1:4000/'],
      },
    }),
  ],
  providers: [
    AuthService,
    JwtHelperService,
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
  ],
})
export class AppModule {}
