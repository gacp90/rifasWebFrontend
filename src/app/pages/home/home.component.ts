import { Component, ElementRef, ViewChild } from '@angular/core';

import { environment } from '../../../environments/environment';
import { RifasService } from 'src/app/services/rifas.service';
import { Rifa } from 'src/app/models/rifas.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {

  public empresa:any = environment.empresa;
  @ViewChild('swiper', { static: true }) swiperRef!: ElementRef;

  constructor(  private rifasService: RifasService){}

  ngOnInit(): void {
    let scrollToTop = window.setInterval(() => {
      let pos = window.pageYOffset;
      if (pos > 0) {
          window.scrollTo(0, pos - 50); // how far to scroll on each step
      } else {
          window.clearInterval(scrollToTop);
      }
    }, 16);    

    const swiperElement = this.swiperRef.nativeElement;

    // Asignar configuración al Web Component
    Object.assign(swiperElement, this.config);

    // Inicializar Swiper
    swiperElement.initialize();

    this.loadRifas();

  }

  /** ================================================================
   *  LOAD RIFAS
  ==================================================================== */
  public rifas: Rifa[] = [];
  public query: any = {
    desde: 0,
    hasta: 50,
    abierta: true,
    estado: 'Activa',
    sort: { fecha: -1}
  }

  loadRifas(){

    this.rifasService.loadRifas(this.query)
        .subscribe( ({rifas}) => {
          this.rifas = rifas;          
        }, (err) => {
          console.log(err);          
        })

  }
  

  /**======================================================================
   * SWIPER
  ===================================================================== */  
  public config = {
    grabCursor: false,
    centeredSlides: true,
    speed: 3000,
    autoplay: {
      delay: 0,
      disableOnInteraction: false
    },
    freeModeMomentum: false,
    breakpoints: {
      0: {
          slidesPerView: 1,
          spaceBetween: 8
      },
      500: {
        slidesPerView: 3,
        spaceBetween: 16
      },
      768: {
          slidesPerView: 3,
          spaceBetween: 24
      }
    }
  };

}
