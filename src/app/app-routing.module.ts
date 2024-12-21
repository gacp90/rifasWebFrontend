import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PagesRoutingModule } from './pages/pages.routing';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full', data:{ title: 'Inicio' }},
  { path: '**', redirectTo: '/home', pathMatch: 'full', data:{ title: 'Inicio' }},
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes),
    PagesRoutingModule
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
