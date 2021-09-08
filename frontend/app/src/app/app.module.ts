import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { LoginComponent } from './unregistered-user/login-page/login.component';
import { RegisterComponent } from './unregistered-user/register-page/register.component';
import { PasswordUpdateComponent } from './unregistered-user/password-update-page/password-update.component';
import { HomepageComponent } from './homepage/homepage.component';
import { AthletPaticipantsComponent } from './unregistered-user/athlet-participants-page/athlet-paticipants/athlet-paticipants.component';
import { MedalsComponent } from './unregistered-user/medals-page/medals.component';
import { NationPaticipantsComponent } from './unregistered-user/nation-participants-page/nation-paticipants/nation-paticipants.component';
import { CompetitionEnterComponent } from './organizer/competition-enter-page/competition-enter/competition-enter.component';
import { CompetitionFormationComponent } from './organizer/competition-formation-page/competition-formation/competition-formation.component';
import { RecordsComponent } from './organizer/records-page/records/records.component';
import { RegisterRequestsComponent } from './organizer/register-requests-page/register-requests/register-requests.component';
import { SportEnterComponent } from './organizer/sport-enter-page/sport-enter/sport-enter.component';
import { DrawFormationComponent } from './competition-delegate/draw-formation-page/draw-formation/draw-formation.component';
import { ResultEnterComponent } from './competition-delegate/result-enter-page/result-enter/result-enter.component';
import { ScheduleFormationComponent } from './competition-delegate/schedule-formation-page/schedule-formation/schedule-formation.component';
import { DisciplineAthletsComponent } from './national-delegate/discipline-athlets-page/discipline-athlets/discipline-athlets.component';
import { SportAthletsComponent } from './national-delegate/sport-athlets-page/sport-athlets/sport-athlets.component';
import { TeamAthletRegisterComponent } from './national-delegate/team-athlet-register-page/team-athlet-register/team-athlet-register.component';
import { HeaderComponent } from './header/header.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    PasswordUpdateComponent,
    HomepageComponent,
    AthletPaticipantsComponent,
    MedalsComponent,
    NationPaticipantsComponent,
    CompetitionEnterComponent,
    CompetitionFormationComponent,
    RecordsComponent,
    RegisterRequestsComponent,
    SportEnterComponent,
    DrawFormationComponent,
    ResultEnterComponent,
    ScheduleFormationComponent,
    DisciplineAthletsComponent,
    SportAthletsComponent,
    TeamAthletRegisterComponent,
    HeaderComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
