import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { environment } from '../../environments/environment';
import { Ticket } from '../models/ticket.model';
const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class TicketsService {

  constructor(  private http: HttpClient) { }

  /** ================================================================
   *  LOAD TICKETS
  ==================================================================== */
  loadTickets(query: any){
    return this.http.post<{ok: boolean, tickets: Ticket[], total: number, disponibles: number, apartados: number, pagados: number}>( `${base_url}/tickets/query`, query);
  }

  /** ================================================================
   *  LOAD TICKET ID
  ==================================================================== */
  searchTicket(busqueda: string, rifa: string){
    return this.http.get<{ok: boolean, tickets: Ticket[]}>( `${base_url}/tickets/search/${rifa}/${busqueda}`);
  }

  /** ================================================================
   *  REGISTER PAID
  ==================================================================== */
  registerPaid(formData: any){
    return this.http.post<{ok: boolean, confirmados: Ticket[], rechazados: Ticket[]}>( `${base_url}/tickets/payments/online`, formData);
  }
}
