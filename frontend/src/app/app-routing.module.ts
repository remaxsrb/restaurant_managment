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


const routes: Routes = [
  { path: '', component: HomepageComponent },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'admin_login', component: AdminLoginComponent},
  { path: 'guest', component: GuestDashBoardComponent, canActivate: [AuthGuard, RoleGuard], data: { expected_role: 'guest' } },
  { path: 'waiter', component: WaiterDashboardComponent,canActivate: [AuthGuard, RoleGuard], data: { expected_role: 'waiter' } },
  { path: 'admin', component: AdminDashboardComponent, canActivate: [AuthGuard, RoleGuard], data: { expected_role: 'admin' } } ,
  { path: 'change_password', component: ChangePasswordComponent },
  { path: 'ask_question', component: AskQuestionComponent },



];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
