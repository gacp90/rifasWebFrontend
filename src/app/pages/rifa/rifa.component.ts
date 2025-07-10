import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

import { _metodos, Rifa } from 'src/app/models/rifas.model';
import { Ruta } from 'src/app/models/rutas.model';
import { Ticket } from 'src/app/models/ticket.model';
import { RifasService } from 'src/app/services/rifas.service';
import { RutasService } from 'src/app/services/rutas.service';
import { TicketsService } from 'src/app/services/tickets.service';
import { WhatsappService } from 'src/app/services/whatsapp.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-rifa',
  templateUrl: './rifa.component.html',
  styleUrls: ['./rifa.component.css']
})
export class RifaComponent implements OnInit {

  constructor(  private activatedRoute: ActivatedRoute,
                private rifasService: RifasService,
                private fb: FormBuilder,
                private rutasService: RutasService,
                private whatsappService: WhatsappService,
                private ticketsService: TicketsService
  ){

    activatedRoute.params.subscribe( ({id}) => { this.loadRifa(id) })

  }

  ngOnInit(): void {

    

    this.loadRuta();
  }

  /** ================================================================
   *  LOAD RUTA
  ==================================================================== */
  public ruta!: Ruta;
  loadRuta(){

    const regex = { $regex: 'web', $options: 'i' };
    let queryRuta: any = {
      desde: 0,
      hasta: 5
    };

    queryRuta.$or = [
      { name: regex }
    ];

    this.rutasService.loadRutas(queryRuta)
        .subscribe( ({rutas}) => {
          this.ruta = rutas[0];          
        }, (err) => {
          console.log(err);
          Swal.fire('Error', err.error.msg, 'error')          
        })

  }

  /** ================================================================
   *  LOAD RIFA
  ==================================================================== */
  public rifa!: Rifa;
  public portada: string = 'none';
  loadRifa(id: string){

    this.rifasService.loadRifaID(id)
        .subscribe( ({rifa}) => {
          this.rifa = rifa;
          if (rifa.img.length > 0) {
            this.portada = rifa.img[0].img;
          }

          this.selecMetodo(this.rifa.metodos[0].name)

          this.paidForm.setValue({
            metodo: this.rifa.metodos[0].name,
            referencia: '',
            amount: '',
            nombre: '',
            codigo: '58',
            telefono: '',
            cedula: '',
            direccion: '',
          })
          
          this.loadTickets();
          this.loadGanador();  
          
        }, (err) => {
          console.log(err);
          Swal.fire('Error', err.error.msg, 'error');          
        })

  }

  /**======================================================================
   * SWIPER
  ===================================================================== */
  public config = {
    "loop": true,
    "grabCursor": false,
    "centeredSlides": true,
    "autoplay": {
      "delay": 0,
      "disableOnInteraction": false
    },
    "freeMode": true,
    "speed": 38000,
    "freeModeMomentum": false,
    "breakpoints": {
    "0": {
        "slidesPerView": 2,
        "spaceBetween": 8
    },
    "500": {
        "spaceBetween": 16
    },
    "768": {
        "slidesPerView": 3,
        "spaceBetween": 24
    }
    }
};

  /** ======================================================================
   * LOAD TICKETS
  ====================================================================== */
  limpiar(){
    this.query = {
      desde: 0,
      hasta: 1000,
      estado: 'Disponible',
      disponible: true
    }

    this.loadTickets();

  }

  /** ======================================================================
   * LOAD TICKETS
  ====================================================================== */
  public ticketsD: Ticket[] = [];  
  public loadingTickets: boolean = false;
  public disponibles: number = 0;
  public apartados: number = 0;
  public pagados: number = 0;
  public query: any = {
    desde: 0,
    hasta: 1000,
    estado: 'Disponible',
    disponible: true,
    sort: {numero: 1}
  }

  loadTickets(){

    this.loadingTickets = true;

    this.query.rifa = this.rifa.rifid!;

    this.ticketsService.loadTickets(this.query)
        .subscribe( ({ tickets, disponibles, apartados, pagados }) => {

          this.loadingTickets = false;

          this.ticketsD = tickets;
          this.disponibles = disponibles;
          this.apartados = apartados;
          this.pagados = pagados;

        }, (err) => {
          console.log(err);
          Swal.fire('Error', err.error.msg, 'error');          
        })

  }

  /** ================================================================
   *   SEARCH TICKET FOR CLIENT
  ==================================================================== */
  public tickets: Ticket[] = [];
  search(busqueda: string){

    if (busqueda.length === 0) {
      return;
    }   

    this.ticketsService.searchTicket(busqueda, this.rifa.rifid!)
        .subscribe( ({tickets}) => {
          this.tickets = tickets;

          this.tickets.map( (tick) => {

            let total = 0;

            for (const pago of tick.pagos) {
              total += pago.monto;
            }

            tick.total = total;

          })          

        }, (err) => {
          console.log(err);
          Swal.fire('Error', err.error.msg, 'error');
          
        })

  }


  /** ======================================================================
   * LOAD TICKET GANADOR
  ====================================================================== */
  public ganador!: Ticket;
  loadGanador(){

    this.ticketsService.loadTickets({rifa: this.rifa.rifid, ganador: true})
        .subscribe( ({tickets}) => {

          this.ganador = tickets[0];

        }, (err) => {
          console.log(err);
          Swal.fire('Error', err.error.msg, 'error');          
        })

  }

  /** ================================================================
   *   SELECT VARIOS
  ==================================================================== */
  public listTicketsSelect: Ticket[] = [];
  addTicketList(ticket: Ticket){

    if (this.listTicketsSelect.length === 50) {
      Swal.fire({
        toast: true,
        icon: 'warning',
        position: "top-end",
        text: "El limite maximo de compra es de 50 tickets",
        showConfirmButton: false,
        timer: 1500
      });
      return;
    }

    ticket.seleccionado = true;

    const validarItem = this.listTicketsSelect.findIndex( (tic) =>{      
      if (tic.tid === ticket.tid ) {
        return true;
      }else {
        return false;
      }
    });

    if (validarItem === -1) {      
      this.listTicketsSelect.push(ticket);
    }    

  }

  /** ================================================================
   *   DELET TICKET LIST
  ==================================================================== */
  delTicketList(i: number, ticket: Ticket){
    ticket.seleccionado = false;
    this.listTicketsSelect.splice(i,1);
  }

  /** ================================================================
   *   CHANGE LIMITE
  ==================================================================== */
  limiteChange( cantidad: any ){
    this.query.hasta = Number(cantidad);    
    this.loadTickets();
  }

  /** ======================================================================
   * CAMBIAR DE PAGINA
  ====================================================================== */
  cambiarPagina(valor: number){
    this.query.desde += valor;
    
    if (this.query.desde < 0) {
      this.query.desde = 0;
    }
    
    this.loadTickets();
  }

  /** ======================================================================
   * SEARCH TICKET
  ====================================================================== */
  searchTicket(termino: string){

    if (termino.length === 0) {
      delete this.query['$or'];
    }else{
      const regex = { $regex: termino, $options: 'i' }; // Construir regex      
      this.query.$or = [
        { numero: regex }
      ];
    } 

    this.loadTickets();

  }
  /** ================================================================
   *  SELECCIONAR METODO DE PAGO
  ==================================================================== */
  public metodoSelected: _metodos | undefined;
  selecMetodo(name: string){

    if (name === '') {
      delete this.metodoSelected;
      return;
    }

    this.rifa.metodos.map( (met) => {

      if (met.name === name) {
        this.metodoSelected = met;
      }

    })
    

  }

  /** ================================================================
   *   ACTUALIZAR IMAGEN
  ==================================================================== */
  @ViewChild('fileImg') fileImg!: ElementRef;
  public imgTempP: any = null;
  public subirImagen!: any;
  public img: string = 'no-image';

  cambiarImage(file: any): any{    
    
    this.subirImagen = file.target.files[0];
    
    if (!this.subirImagen) { return this.imgTempP = null }    
    
    const reader = new FileReader();
    const url64 = reader.readAsDataURL(file.target.files[0]);
        
    reader.onloadend = () => {
      this.imgTempP = reader.result;      
    }

  }

  /** ================================================================
   *  REGISTRAR PAGO
  ==================================================================== */
  public ticketsRechazados: Ticket[] = [];
  public ticketsConfirmados: Ticket[] = [];
  public paidSubmitted: boolean = false;
  public btnPaid: boolean = false;
  public paidForm = this.fb.group({
    metodo: [''],
    referencia: ['', [Validators.required]],
    amount: ['', [Validators.required, Validators.min(1)]],
    nombre: ['', [Validators.required]],
    codigo: ['58'],
    telefono: ['', [Validators.required]],
    cedula: ['', [Validators.required]],
    direccion: ['', [Validators.required]]
  })

  registrarPago(){

    this.btnPaid = true;
    
    this.paidSubmitted = true;
    
    if (this.paidForm.invalid) {
      this.btnPaid = false;
      return;
    }

    this.aleatorios(this.cantt);
    
    let value: any = {
      tickets: this.listTicketsSelect,
      referencia: this.paidForm.value.referencia,
      nombre: this.paidForm.value.nombre,
      codigo: this.paidForm.value.codigo,
      telefono: this.paidForm.value.telefono,
      cedula: this.paidForm.value.cedula,
      direccion: this.paidForm.value.direccion,
      ruta: this.ruta.ruid,
      monto: this.paidForm.value.amount,
      metodo: this.metodoSelected,
      vendedor: this.rifa.admin._id,
      descripcion: `Compra online de ${this.listTicketsSelect.length} ${ (this.listTicketsSelect.length > 1)? 'tickets': 'ticket' }`
    }
    
    
    if (this.subirImagen) {      

      const formData = new FormData();
      
      // Agregamos la imagen al FormData
      formData.append('image', this.subirImagen);
      formData.append('datos',  JSON.stringify(value));


      
      this.ticketsService.registerPaid(formData)
      .subscribe( ({confirmados, rechazados}) => {
        
        this.btnPaid = false;
        
        this.paidSubmitted = false;
        this.ticketsConfirmados = confirmados;

        const numeros = this.listTicketsSelect.map(t => '*#' + t.numero + '*').join(', ');

        let mesg = {
          "number": "584124287708",
          "message": `Se ha registrado una compra en linea, ${ (this.listTicketsSelect.length > 1 )? 'de los siguientes numeros': 'del numero' } ${numeros}`
        }
    
        // ENVIAR NOTIFICACION AL WHATSAPP
        this.whatsappService.sendMessage('"685ed07963a390d8ed1d519c"', mesg, 'https://oficinawp.ganaconkingjesus.com')
            .subscribe( () => {}, (err) => {console.log(err)})
        
        
            if (rechazados.length === 0) {
              
              this.paidForm.reset({
                codigo: '58',
                metodo: this.rifa.metodos[0].name,
              });

              this.listTicketsSelect = [];
              
                  Swal.fire({
                    toast: true,
                    icon: 'success',
                    position: "top-end",
                    text: "Estupendo, se ha registrado el pago, sus tickets han sido apartados exitosamente!. Pronto estaremos en contacto contigo.",
                    showConfirmButton: false,
                    timer: 2500
                  });

            }else{
              this.ticketsRechazados = rechazados;
              Swal.fire({
                toast: true,
                icon: 'warning',
                position: "top-end",
                text: "Existen tickets que ya han sido apartados antes, porfavor contactanos para ayudarte con el proceso de compra. Gracias!",
                showConfirmButton: false,
                timer: 2500
              });          
              
            }
            
            this.imgTempP = ''; 
            this.fileImg.nativeElement.value = '';
                        
            this.loadTickets();

            


          }, (err) => {
            this.btnPaid = false;
            console.log(err);
            Swal.fire('Error', err.error.msg, 'error');
            
          })
          
    }
    
    
  }
  
  validatePaid(campo: string): boolean{  
    return (this.paidSubmitted && this.paidForm.get(campo)?.invalid)? true: false;
  }

  /** ================================================================
   *  CAMBIA VALOR
  ==================================================================== */
  @ViewChild ('cant') cant!:ElementRef;
  public cantt: number = 1; 
  cambiarValor(cant: number){

    this.cantt += cant;

    if (this.cantt <= 0) {
      this.cantt = 1;
      this.cant.nativeElement.value = this.cantt;
    }else if (this.cantt > 100){
      this.cantt = 100;
      this.cant.nativeElement.value = this.cantt;
    }
  }

  /** ================================================================
   *  CHANGE VALOR
  ==================================================================== */
  changeValor(cant: any){

    this.cantt = Number(cant);
    if (this.cantt <= 0) {
      this.cantt = 1;
      this.cant.nativeElement.value = this.cantt;
    }else if (this.cantt > 100){
      this.cantt = 100;
      this.cant.nativeElement.value = this.cantt;
    }

  }


  /** ================================================================
   *  TICKETS ALEATORIOS
  ==================================================================== */
  aleatorios(cant: any){

    cant = Number(cant);

    if (this.ticketsD.length < cant || Number(cant) >= 50) {
      Swal.fire('Error', (this.ticketsD.length > 50)? 'La cantidad maxima de tickets es de 50': `La cantidad maxima de tickets es de ${this.ticketsD.length}` );
      return;
    }
    const ticketsDisponibles = this.ticketsD.filter(ticket => 1 === 1);
    
    this.listTicketsSelect = [];
    for (let i = 0; i <  Number(cant); i++) {
      const randomIndex = Math.floor(Math.random() * ticketsDisponibles.length);
      ticketsDisponibles[randomIndex].seleccionado = true;
      this.listTicketsSelect.push(ticketsDisponibles[randomIndex]);
      ticketsDisponibles.splice(randomIndex, 1); // Eliminar el ticket seleccionado para no repetirlo
    }

  }
  
  /** ================================================================
   *  PAISES
  ==================================================================== */
  public codigoSeleccionado: any = '';
  public paises: any = [
    {
    "nameES": "Alemania",
    "nameEN": "Germany",
    "iso2": "DE",
    "iso3": "DEU",
    "phoneCode": "49"
    },    
    {
    "nameES": "Argentina",
    "nameEN": "Argentina",
    "iso2": "AR",
    "iso3": "ARG",
    "phoneCode": "54"
    },    
    {
    "nameES": "Aruba",
    "nameEN": "Aruba",
    "iso2": "AW",
    "iso3": "ABW",
    "phoneCode": "297"
    },    
    {
    "nameES": "Bolivia",
    "nameEN": "Bolivia",
    "iso2": "BO",
    "iso3": "BOL",
    "phoneCode": "591"
    },
    
    {
    "nameES": "Brasil",
    "nameEN": "Brazil",
    "iso2": "BR",
    "iso3": "BRA",
    "phoneCode": "55"
    },
    
    {
    "nameES": "Canadá",
    "nameEN": "Canada",
    "iso2": "CA",
    "iso3": "CAN",
    "phoneCode": "1"
    },
    
    {
    "nameES": "Chile",
    "nameEN": "Chile",
    "iso2": "CL",
    "iso3": "CHL",
    "phoneCode": "56"
    },
    
    {
    "nameES": "Colombia",
    "nameEN": "Colombia",
    "iso2": "CO",
    "iso3": "COL",
    "phoneCode": "57"
    },
    
    {
    "nameES": "Costa Rica",
    "nameEN": "Costa Rica",
    "iso2": "CR",
    "iso3": "CRI",
    "phoneCode": "506"
    },
    
    {
    "nameES": "Curazao",
    "nameEN": "Curaçao",
    "iso2": "CW",
    "iso3": "CWU",
    "phoneCode": "5999"
    },
    {
    "nameES": "Dinamarca",
    "nameEN": "Denmark",
    "iso2": "DK",
    "iso3": "DNK",
    "phoneCode": "45"
    },
    
    {
    "nameES": "Ecuador",
    "nameEN": "Ecuador",
    "iso2": "EC",
    "iso3": "ECU",
    "phoneCode": "593"
    },
    
    {
    "nameES": "El Salvador",
    "nameEN": "El Salvador",
    "iso2": "SV",
    "iso3": "SLV",
    "phoneCode": "503"
    },
    
    {
    "nameES": "España",
    "nameEN": "Spain",
    "iso2": "ES",
    "iso3": "ESP",
    "phoneCode": "34"
    },
    {
    "nameES": "Estados Unidos de América",
    "nameEN": "United States of America",
    "iso2": "US",
    "iso3": "USA",
    "phoneCode": "1"
    },
    
    {
    "nameES": "Francia",
    "nameEN": "France",
    "iso2": "FR",
    "iso3": "FRA",
    "phoneCode": "33"
    },
    
    {
    "nameES": "Guatemala",
    "nameEN": "Guatemala",
    "iso2": "GT",
    "iso3": "GTM",
    "phoneCode": "502"
    },
    {
    "nameES": "Guayana Francesa",
    "nameEN": "French Guiana",
    "iso2": "GF",
    "iso3": "GUF",
    "phoneCode": "594"
    },
    
    {
    "nameES": "Guyana",
    "nameEN": "Guyana",
    "iso2": "GY",
    "iso3": "GUY",
    "phoneCode": "592"
    },
    {
    "nameES": "Haití",
    "nameEN": "Haiti",
    "iso2": "HT",
    "iso3": "HTI",
    "phoneCode": "509"
    },
    {
    "nameES": "Honduras",
    "nameEN": "Honduras",
    "iso2": "HN",
    "iso3": "HND",
    "phoneCode": "504"
    },
    
    {
    "nameES": "Israel",
    "nameEN": "Israel",
    "iso2": "IL",
    "iso3": "ISR",
    "phoneCode": "972"
    },
    {
    "nameES": "Italia",
    "nameEN": "Italy",
    "iso2": "IT",
    "iso3": "ITA",
    "phoneCode": "39"
    },
    
    {
    "nameES": "México",
    "nameEN": "Mexico",
    "iso2": "MX",
    "iso3": "MEX",
    "phoneCode": "52"
    },
    
    {
    "nameES": "Nicaragua",
    "nameEN": "Nicaragua",
    "iso2": "NI",
    "iso3": "NIC",
    "phoneCode": "505"
    },
    
    {
    "nameES": "Panamá",
    "nameEN": "Panama",
    "iso2": "PA",
    "iso3": "PAN",
    "phoneCode": "507"
    },
    
    {
    "nameES": "Paraguay",
    "nameEN": "Paraguay",
    "iso2": "PY",
    "iso3": "PRY",
    "phoneCode": "595"
    },
    {
    "nameES": "Perú",
    "nameEN": "Peru",
    "iso2": "PE",
    "iso3": "PER",
    "phoneCode": "51"
    },
    
    {
    "nameES": "Portugal",
    "nameEN": "Portugal",
    "iso2": "PT",
    "iso3": "PRT",
    "phoneCode": "351"
    },
    {
    "nameES": "Puerto Rico",
    "nameEN": "Puerto Rico",
    "iso2": "PR",
    "iso3": "PRI",
    "phoneCode": "1"
    },
    
    {
    "nameES": "Reino Unido",
    "nameEN": "United Kingdom",
    "iso2": "GB",
    "iso3": "GBR",
    "phoneCode": "44"
    },
    
    {
    "nameES": "República Dominicana",
    "nameEN": "Dominican Republic",
    "iso2": "DO",
    "iso3": "DOM",
    "phoneCode": "1 809"
    },
    
    {
    "nameES": "Rusia",
    "nameEN": "Russia",
    "iso2": "RU",
    "iso3": "RUS",
    "phoneCode": "7"
    },
    
    {
    "nameES": "Trinidad y Tobago",
    "nameEN": "Trinidad and Tobago",
    "iso2": "TT",
    "iso3": "TTO",
    "phoneCode": "1 868"
    },
    
    {
    "nameES": "Uruguay",
    "nameEN": "Uruguay",
    "iso2": "UY",
    "iso3": "URY",
    "phoneCode": "598"
    },
    
    {
    "nameES": "Venezuela",
    "nameEN": "Venezuela",
    "iso2": "VE",
    "iso3": "VEN",
    "phoneCode": "58"
    }
  ]

}
