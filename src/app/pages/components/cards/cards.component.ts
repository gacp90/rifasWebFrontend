import { Component, ElementRef, Input, ViewChild } from '@angular/core';
import { Rifa } from 'src/app/models/rifas.model';
import { RifasService } from 'src/app/services/rifas.service';

@Component({
  selector: 'app-cards',
  templateUrl: './cards.component.html',
  styleUrls: ['./cards.component.css']
})
export class CardsComponent {

  @Input('params') params!: any;

  constructor(  private rifasService: RifasService){}

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    const swiperElement = this.swiperRefCard.nativeElement;

    // Asignar configuración al Web Component
    Object.assign(swiperElement, this.configCard);

    // Inicializar Swiper
    swiperElement.initialize();

    this.loadRifas();
  }

  
  /**======================================================================
   * LOAD RIFAS
  ===================================================================== */
  public rifas: Rifa[] = [];
  public query: any = {
    desde: 0,
    hasta: 100,
    sort: {}
  }

  loadRifas(){

    switch (this.params.search) {
      case 'Activas':

        this.query.abierta = true;
        
        break;
      
      case 'Finalizadas':
        this.query.abierta = false;
        break;
    
      default:
        break;
    }

    this.rifasService.loadRifas(this.query)
        .subscribe( ({rifas}) => {
          this.rifas = rifas;          
        })

  }


  /**======================================================================
   * SWIPER
  ===================================================================== */
  @ViewChild('swiperCards', { static: true }) swiperRefCard!: ElementRef;
  public configCard = {
    slidesPerView: 2,
    spaceBetween: 10,
    loop: true,
    breakpoints: {
        990: {
            slidesPerView: 5,
            spaceBetween: 20
        },
        640: {
          slidesPerView: 3,
          spaceBetween: 40
      }
    },
    pagination: { clickable: true, dynamicBullets: true },
    grabCursor: true
  };

}
