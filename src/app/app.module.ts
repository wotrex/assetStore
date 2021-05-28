import { Component, NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { Routes, RouterModule } from '@angular/router';
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import { StripeModule } from "stripe-angular"

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { AssetsComponent } from './components/assets/assets.component';
import { AboutComponent } from './components/about/about.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { AuthGuard } from './auth.guard';
import { TokenInterceptor } from './token.iterceptor';
import { LogoutComponent } from './components/logout/logout.component';
import { NavComponent } from './components/nav/nav.component';
import { LoginedGuard } from './logined.guard';
import { SuccessComponent } from './components/success/success.component';
import { ProfileComponent } from './components/profile/profile.component';

const appRoutes: Routes = [
  {path: "", component: HomeComponent},
  {path: 'about', component: AboutComponent},
  {path: 'assets', component: AssetsComponent, canActivate:[AuthGuard]},
  {path: 'logout', component: LogoutComponent, canActivate:[AuthGuard]},
  {path: 'login', component: LoginComponent, canActivate:[LoginedGuard]},
  {path: 'register', component: RegisterComponent, canActivate:[LoginedGuard]},
  {path: 'successPayment', component: SuccessComponent, canActivate:[AuthGuard]},
  {path: 'profile', component: ProfileComponent, canActivate:[AuthGuard]},
  {path: '**', component: NotFoundComponent},
]


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    AssetsComponent,
    AboutComponent,
    NotFoundComponent,
    LoginComponent,
    RegisterComponent,
    LogoutComponent,
    NavComponent,
    SuccessComponent,
    ProfileComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    RouterModule.forRoot(appRoutes),
    StripeModule.forRoot("pk_test_51IvG6CI90no2RL3hI2VnCGRWEQKuvpfWVzu5BDbXScukKse2FjJFsj5vcFzpUAgwRra0DVYDxkWiTHKcC8qT6G1y00mt1UCGFI")
  ],
  providers: [{
    provide: HTTP_INTERCEPTORS,
    multi: true,
    useClass: TokenInterceptor
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
