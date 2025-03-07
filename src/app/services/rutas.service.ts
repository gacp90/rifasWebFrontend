import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { environment } from '../../environments/environment';
import { Ruta } from '../models/rutas.model';
const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class RutasService {

  constructor(  private http: HttpClient) { }

  /** ================================================================
   *   GET TOKEN
  ==================================================================== */
  get token():string {
    return localStorage.getItem('token') || '';
  }

  /** ================================================================
   *   GET HEADERS
  ==================================================================== */
  get headers() {
    return {
      headers: {
        'x-token': this.token
      }
    }
  }

  /** ================================================================
   *  LOAD RUTAS
  ==================================================================== */
  loadRutas(query: any){
    return this.http.post<{ok: boolean, rutas: Ruta[], total: number}>( `${base_url}/rutas/query`, query, this.headers );
  }

}
