module.exports = [
 
  'strapi::errors',
  'strapi::security',
  {
    name: 'strapi::cors',
    config: {
      origin: '*', // Allow all origins. For security, specify your domains here.
      headers: '*', // Allow all headers. Specify the necessary headers.
      methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS', 'HEAD'], // Specify allowed methods
    },
  },
 
  'strapi::errors',
  'strapi::security',
  'strapi::cors',
  'strapi::poweredBy',
  'strapi::logger',
  'strapi::query',
  'strapi::body',
  'strapi::session',
  'strapi::favicon',
  'strapi::public',
];