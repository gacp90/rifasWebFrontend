import { NgModule, CUSTOM_ELEMENTS_SCHEMA  } from '@angular/core';
import { CommonModule } from '@angular/common';

// COMPONENTS
import { HomeComponent } from './home/home.component';
import { PagesComponent } from './pages.component';
import { FooterComponent } from '../shared/footer/footer.component';
import { RouterModule } from '@angular/router';
import { CardsComponent } from './components/cards/cards.component';
import { ContactComponent } from './contact/contact.component';
import { RifaComponent } from './rifa/rifa.component';
import { PipesModule } from '../pipes/pipes.module';
import { CountdownTimerComponent } from './components/countdown-timer/countdown-timer.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    HomeComponent,
    PagesComponent,
    FooterComponent,
    CardsComponent,
    ContactComponent,
    RifaComponent,
    CountdownTimerComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    PipesModule,
    FormsModule,
    ReactiveFormsModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class PagesModule { }
