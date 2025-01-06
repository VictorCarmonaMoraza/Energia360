import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { WelcomeComponent } from './components/main/welcome/welcome.component';
import { RegisterComponent } from './components/main/register/register.component';
import { LoginComponent } from './components/main/login/login.component';
import { MainComponent } from './components/main/main.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { EnergyPlantsComponent } from './components/dashboard/energy-plants/energy-plants.component';
import { CreatePlantsComponent } from './components/dashboard/create-plants/create-plants.component';
import { InforPLantsComponent } from './components/dashboard/infor-plants/infor-plants.component';
import { MapGeoComponent } from './components/dashboard/map-geo/map-geo.component';
import { UppFilesPlantsComponent } from './components/dashboard/upp-files-plants/upp-files-plants.component';

const routes: Routes = [
  { path: '', redirectTo: '/welcome', pathMatch: 'full' },
  {
    path: 'welcome', component: MainComponent, children: [
      { path: '', component: WelcomeComponent },
      { path: 'register', component: RegisterComponent },
      { path: 'login', component: LoginComponent },
    ]
  },
  {
    path: 'dashboard', component: DashboardComponent, children: [
      { path: '', component: EnergyPlantsComponent },
      { path: 'info/:id', component: InforPLantsComponent },
      { path: 'mapGeoLoc', component: MapGeoComponent },
      { path: 'create', component: CreatePlantsComponent },
      { path: 'updatePlants', component: UppFilesPlantsComponent },
    ]
  },
  { path: '**', redirectTo: '/welcome', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
