import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class WhatsappService {

  constructor(  private http: HttpClient) { }

  /** ================================================================
   *  SEND MESSAGE
  ==================================================================== */
  sendMessage(id: string, message: any, wp: string){
    return this.http.post<{ok: boolean, msg: string}>( `${wp}/api/whatsapp/send/aaa1`, message);
  }
}
