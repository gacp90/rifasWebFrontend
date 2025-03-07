import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Rifa } from '../models/rifas.model';

import { environment } from '../../environments/environment';
const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class RifasService {

  constructor(  private http: HttpClient) { }

  /** ================================================================
   *  LOAD RIFAS
  ==================================================================== */
  loadRifas(query: any){
    return this.http.post<{ok: boolean, rifas: Rifa[], total: number}>( `${base_url}/rifas/query`, query );
  }

  /** ================================================================
   *  LOAD RIFA ID
  ==================================================================== */
  loadRifaID(id: string){
    return this.http.get<{ok: boolean, rifa: Rifa}>( `${base_url}/rifas/${id}` );
  }
}
