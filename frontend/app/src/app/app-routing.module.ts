import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MedalsComponent } from './unregistered-user/medals-page/medals.component';
import { AthletPaticipantsComponent } from './unregistered-user/athlet-participants-page/athlet-paticipants/athlet-paticipants.component';
import { LoginComponent } from './unregistered-user/login-page/login.component';
import { RegisterRequestsComponent } from './organizer/register-requests-page/register-requests/register-requests.component';
import { RegisterComponent } from './unregistered-user/register-page/register.component';
import { HomepageComponent } from './homepage/homepage.component';
import { SportEnterComponent } from './organizer/sport-enter-page/sport-enter/sport-enter.component';
import { CompetitionFormationComponent } from './organizer/competition-formation-page/competition-formation/competition-formation.component';
import { CompetitionEnterComponent } from './organizer/competition-enter-page/competition-enter/competition-enter.component';
import { NationPaticipantsComponent } from './unregistered-user/nation-participants-page/nation-paticipants/nation-paticipants.component';
import { DrawFormationComponent } from './competition-delegate/draw-formation-page/draw-formation/draw-formation.component';
import { ScheduleFormationComponent } from './competition-delegate/schedule-formation-page/schedule-formation/schedule-formation.component';
import { ResultEnterComponent } from './competition-delegate/result-enter-page/result-enter/result-enter.component';
import { TeamAthletRegisterComponent } from './national-delegate/team-athlet-register-page/team-athlet-register/team-athlet-register.component';

const routes: Routes = [
  {path:"", component: HomepageComponent},
  {path:"medals", component: MedalsComponent},
  {path:"athlet-paticipants", component: AthletPaticipantsComponent},
  {path:"nation-paticipants", component: NationPaticipantsComponent},
  {path:"login", component: LoginComponent},
  {path:"register", component: RegisterComponent},
  {path:"register-requests", component: RegisterRequestsComponent},
  {path:"sport-enter", component: SportEnterComponent},
  {path:"competition-formation", component: CompetitionFormationComponent},
  {path:"competition-enter", component: CompetitionEnterComponent},
  {path:"draw-formation", component: DrawFormationComponent},
  {path:"schedule-formation", component: ScheduleFormationComponent},
  {path:"result-enter", component: ResultEnterComponent},
  {path:"team-athlet-register", component: TeamAthletRegisterComponent},

  {path:"**", component: HomepageComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
