import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomepageComponent } from './components/homepage/homepage.component';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import { AdminLoginComponent } from './components/admin-login/admin-login.component';
import { WaiterDashboardComponent } from './components/waiter-dashboard/waiter-dashboard.component';
import { AdminDashboardComponent } from './components/admin-dashboard/admin-dashboard.component';
import { ChangePasswordComponent } from './components/change-password/change-password.component';
import { AuthGuard } from './guards/auth.guard';
import { RoleGuard } from './guards/role.guard';
import { GuestDashBoardComponent } from './components/guest-dashboard/guest-dashborad.component';
import { AskQuestionComponent } from './components/ask-question/ask-question.component';
import { RestaurantComponent } from './components/restaurant/restaurant.component';
import { AdminDashboardRestaurantsComponent } from './components/admin-dashboard-restaurants/admin-dashboard-restaurants.component';
import { AdminDashboardWaitersComponent } from './components/admin-dashboard-waiters/admin-dashboard-waiters.component';
import { AdminDashboardGuestsComponent } from './components/admin-dashboard-guests/admin-dashboard-guests.component';
import { GuestDashboardRestaurantsComponent } from './components/guest-dashboard-restaurants/guest-dashboard-restaurants.component';
import { GuestDashboardReservationsComponent } from './components/guest-dashboard-reservations/guest-dashboard-reservations.component';
import { GuestDashboardFoodOrderComponent } from './components/guest-dashboard-food-order/guest-dashboard-food-order.component';
import { UserProfileComponent } from './components/user-profile/user-profile.component';

const routes: Routes = [
  { path: '', component: HomepageComponent },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'admin_login', component: AdminLoginComponent },
  {
    path: 'guest',
    component: GuestDashBoardComponent,
    canActivate: [AuthGuard, RoleGuard],
    data: { expected_role: 'guest' },
    children: [
      { path: 'restaurants', component: GuestDashboardRestaurantsComponent},
      { path: 'reservations', component: GuestDashboardReservationsComponent },
      { path: 'orders', component: GuestDashboardFoodOrderComponent },
      { path: 'profile', component: UserProfileComponent },
      { path: '', redirectTo: 'profile', pathMatch: 'full' }, 
    ]
  },
  { path: 'restaurant_info', component: RestaurantComponent},

  {
    path: 'waiter',
    component: WaiterDashboardComponent,
    canActivate: [AuthGuard, RoleGuard],
    data: { expected_role: 'waiter' },
  },
  {
    path: 'admin',
    component: AdminDashboardComponent,
    canActivate: [AuthGuard, RoleGuard],
    data: { expected_role: 'admin' },
    children: [
      { path: 'restaurants', component: AdminDashboardRestaurantsComponent },
      { path: 'waiters', component: AdminDashboardWaitersComponent },
      { path: 'guests', component: AdminDashboardGuestsComponent },
      { path: '', redirectTo: 'restaurants', pathMatch: 'full' }, 
    ]
  },

  { path: 'change_password', component: ChangePasswordComponent },
  { path: 'ask_question', component: AskQuestionComponent },
  {
    path: 'guest/restaurant_info',
    component: RestaurantComponent,
    canActivate: [AuthGuard, RoleGuard],
    data: { expected_role: 'guest' },
  },
  { path: '**', redirectTo: '404', pathMatch: 'full' }, //Error route
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
