import { Component, ElementRef, ViewChild } from '@angular/core';

import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {

  public empresa:any = environment.empresa;
  @ViewChild('swiper', { static: true }) swiperRef!: ElementRef;

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

  }
  
  public config = {
    slidesPerView: 1,
    spaceBetween: 10,
    loop: true,
    breakpoints: {
        990: {
            slidesPerView: 3,
            spaceBetween: 20
        },
        640: {
          slidesPerView: 2,
          spaceBetween: 40
      }
    },
    pagination: { clickable: true, dynamicBullets: true },
    grabCursor: true
  };

}
