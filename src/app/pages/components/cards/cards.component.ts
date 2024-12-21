import { Component, ElementRef, Input, ViewChild } from '@angular/core';

@Component({
  selector: 'app-cards',
  templateUrl: './cards.component.html',
  styleUrls: ['./cards.component.css']
})
export class CardsComponent {

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    const swiperElement = this.swiperRefCard.nativeElement;

    // Asignar configuración al Web Component
    Object.assign(swiperElement, this.configCard);

    // Inicializar Swiper
    swiperElement.initialize();
  }

  @Input('params') params!: any;
  public products: any[] = [];

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
