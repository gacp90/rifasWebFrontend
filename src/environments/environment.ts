// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

// DOMAINS
/**
  base_url: 'https://admin.rifaselmocho.com/api',
  local_url: 'https://rifaselmocho.com',

  base_url: 'http://localhost:3000/api',
  local_url: 'http://localhost:4200',

  // RIFAS EL MOCHO
  empresa: {
    name:'rifaselmocho.com',
    address:'San Cristóbal - Táchira - Venezuela',
    nit:'000000000',
    email: 'rifaselmocho@gmail.com',
    phone: '+584121672617',
    facebook: 'https://www.facebook.com/rifaselmocho',
    instagram: 'https://www.instagram.com/rifaselmocho',
    tiktok: 'none',
    whatsapp: 'whatsapp://send?text=hola,+me+interesa+comprar+un+numero&phone=+584121672617',
    logo: 'logo-shopy.webp',
    logob: 'logo-shopy-blanco.webp',
    ico: 'logo-shopy.webp',
    sizeico: '150'
  }

*/

export const environment = {
  production: false,
  base_url: 'http://localhost:3000/api',
  local_url: 'http://localhost:4200',
  empresa: {
    name:'rifaselmocho.com',
    address:'San Cristóbal - Táchira - Venezuela',
    nit:'000000000',
    email: 'rifaselmocho@gmail.com',
    phone: '+584121672617',
    facebook: 'https://www.facebook.com/rifaselmocho',
    instagram: 'https://www.instagram.com/rifaselmocho',
    tiktok: 'none',
    whatsapp: 'whatsapp://send?text=hola,+me+interesa+comprar+un+numero&phone=+584121672617',
    logo: 'logo-shopy.webp',
    logob: 'logo-shopy-blanco.webp',
    ico: 'logo-shopy.webp',
    sizeico: '150'
  }
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
