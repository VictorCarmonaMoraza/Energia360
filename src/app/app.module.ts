import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MainComponent } from './components/main/main.component';
import { WelcomeComponent } from './components/main/welcome/welcome.component';
import { LoginComponent } from './components/main/login/login.component';
import { RegisterComponent } from './components/main/register/register.component';

import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { NavbarComponent } from './components/dashboard/navbar/navbar.component';
import { EnergyPlantsComponent } from './components/dashboard/energy-plants/energy-plants.component';
import { CreatePlantsComponent } from './components/dashboard/create-plants/create-plants.component';
import { MapGeoComponent } from './components/dashboard/map-geo/map-geo.component';
import { InforPLantsComponent } from './components/dashboard/infor-plants/infor-plants.component';
import { UppFilesPlantsComponent } from './components/dashboard/upp-files-plants/upp-files-plants.component';

import {MatGridListModule} from '@angular/material/grid-list';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';

@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    WelcomeComponent,
    LoginComponent,
    RegisterComponent,
    DashboardComponent,
    NavbarComponent,
    EnergyPlantsComponent,
    CreatePlantsComponent,
    MapGeoComponent,
    InforPLantsComponent,
    UppFilesPlantsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatGridListModule
  ],
  providers: [
    provideAnimationsAsync()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
