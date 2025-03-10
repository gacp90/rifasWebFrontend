import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

import { PagesComponent } from './pages.component';
import { HomeComponent } from './home/home.component';
import { ContactComponent } from './contact/contact.component';
import { RifaComponent } from './rifa/rifa.component';

// COMPONENTS

const routes: Routes = [
    { 
        path: '',
        component: PagesComponent,
        data:{ title: 'Inicio' },
        children:
        [
            { path: '', component: HomeComponent, data:{ title: 'Inicio' } },
            { path: 'contact', component: ContactComponent, data:{ titulo: 'Contacto'} },
            { path: 'home', component: HomeComponent, data:{ titulo: 'Inicio'} },
            { path: 'rifa/:id', component: RifaComponent, data:{ titulo: 'Rifa'} },
            // { path: 'carrito', component: CarritoComponent, data:{ titulo: 'Carrito'} },
        ] 
    }, 
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class PagesRoutingModule {}
