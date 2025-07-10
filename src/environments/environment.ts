// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

// DOMAINS
/**

  base_url: 'http://localhost:3000/api',
  local_url: 'http://localhost:4200',

  base_url: 'https://admin.ganaconkingjesus.com/api',
  local_url: 'https://ganaconkingjesus.com',

*/

export const environment = {
  production: false,
  base_url: 'https://admin.ganaconkingjesus.com/api',
  local_url: 'https://ganaconkingjesus.com',
  empresa: {
    name:'ganaconkingjesus.com',
    address:'San Carlos - Cojedes - Venezuela',
    nit:'000000000',
    email: 'ganaconelkingjesus1987@gmail.com',
    phone: '+584124287708',
    facebook: 'https://www.facebook.com/ganaconelkingjesus',
    instagram: 'https://www.instagram.com/ganaconelkingjesus',
    tiktok: 'none',
    whatsapp: 'whatsapp://send?text=hola,+me+interesa+comprar+un+numero&phone=+584124287708',
    logo: 'logo-gold.webp',
    logob: 'logo-gold.webp',
    ico: 'logo.webp',
    sizeico: '120'
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
