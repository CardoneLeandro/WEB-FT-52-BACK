const eventSeeder = [
  {
    title: 'Concierto de Navidad',
    description:
      'Un evento musical para celebrar la Navidad con villancicos tradicionales.',
    eventDate: '2024-12-24',
    eventLocation: 'Teatro Central',
    price: 1500,
    stock: 0,
    images: [
      'https://img.freepik.com/foto-gratis/gente-tiro-medio-cantando-juntos_23-2149535685.jpg?t=st=1727361921~exp=1727365521~hmac=63e2f1c5913d923ed75f503c4a3b99d96658e748a882a1ce0e9763fbad7402c3&w=1380',
    ],
  },
  {
    title: 'Taller de Oración',
    description:
      'Una jornada de reflexión y oración dirigida por el padre Juan.',
    eventDate: '2024-02-15',
    eventLocation: 'Parroquia San Pablo',
    price: 500,
    stock: 20,
    images: [
      'https://img.freepik.com/foto-gratis/ninos-alto-angulo-tomados-mano_23-2149548011.jpg?t=st=1727361951~exp=1727365551~hmac=054a4f061076fb2aeb66dbdee0336fc668beaea48e045020428dd21b22d9b7a9&w=740',
    ],
  },
  {
    title: 'Retiro Espiritual',
    description:
      'Tres días de retiro espiritual en las montañas para reconectar con la fe.',
    eventDate: '2024-03-10',
    eventLocation: 'Casa de Retiros Los Pinos',
    price: 3000,
    stock: 15,
    images: [
      'https://img.freepik.com/foto-gratis/vista-frontal-mujer-rezando-al-aire-libre_23-2150870082.jpg?t=st=1727361866~exp=1727365466~hmac=7fe88fcdfc8c60d6861e85424494fba15da5942441a5f12fe1a6768935821525&w=740',
    ],
  },
  {
    title: 'Misa de Acción de Gracias',
    description:
      'Misa para agradecer por las bendiciones recibidas durante el año.',
    eventDate: '2025-12-31',
    eventLocation: 'Catedral Metropolitana',
    price: 0,
    stock: 100,
    images: [
      'https://img.freepik.com/foto-gratis/concepto-comunion-comida_23-2149337571.jpg?t=st=1727361828~exp=1727365428~hmac=229b78307ec928068a0bc187d0f7269811f0fe0d8a0f017eccfacfd5ab108b79&w=740',
    ],
  },
  {
    title: 'Seminario de Fe y Familia',
    description:
      'Un seminario dedicado a fortalecer los lazos familiares a través de la fe.',
    eventDate: '2024-06-20',
    eventLocation: 'Auditorio Juan XXIII',
    price: 2000,
    stock: 30,
    images: [
      'https://img.freepik.com/foto-gratis/estilo-vida-personas-que-participan-terapia-psicologica_52683-151587.jpg?t=st=1727361767~exp=1727365367~hmac=49928f47e07e3c99a067d66d36bf8b06a26650187a022d06294e1026d78ed9de&w=1380',
    ],
  },
  {
    title: 'Peregrinación a Santiago',
    description:
      'Peregrinación por el Camino de Santiago con la comunidad parroquial.',
    eventDate: '2024-07-15',
    eventLocation: 'Santiago de Compostela',
    price: 5000,
    stock: 25,
    images: [
      'https://img.freepik.com/foto-gratis/celebracion-evento-miercoles-ceniza_23-2151424046.jpg?t=st=1727361701~exp=1727365301~hmac=2c87e588706185b3dbc69103459d72a153bd59a557384ad5d6b66702f0758124&w=1380',
    ],
  },
  {
    title: 'Cena Benéfica',
    description:
      'Cena para recaudar fondos para la renovación del templo parroquial.',
    eventDate: '2025-09-10',
    eventLocation: 'Salón de la Parroquia',
    price: 2500,
    stock: 100,
    images: [
      'https://img.freepik.com/fotos-premium/ultima-cena-jesucristo-12-apostoles-icon-historia-religiosa-biblia-fe-evangelia-seguidores-discipulos-hijo-dios-amor-cristiano-iglesia-sacramento-jueves-santo_930683-2978.jpg',
    ],
  },
  {
    title: 'Conferencia sobre Teología',
    description:
      'Conferencia impartida por teólogos internacionales sobre los desafíos actuales de la Iglesia.',
    eventDate: '2024-11-20',
    eventLocation: 'Universidad Católica',
    price: 1000,
    stock: 40,
    images: [
      'https://live.staticflickr.com/65535/53268680439_62c43180a4_z.jpg',
    ],
  },
  {
    title: 'Festival de la Fe',
    description:
      'Un festival para celebrar la fe con actividades para toda la familia.',
    eventDate: '2025-05-05',
    eventLocation: 'Plaza Mayor',
    price: 1200,
    stock: 200,
    images: [
      'https://wallpapers.com/images/featured/estetica-de-jesus-obydv9rxpqmyz9a6.jpg',
    ],
  },
  {
    title: 'Convivencia Juvenil',
    description:
      'Encuentro juvenil de un día lleno de actividades para reflexionar sobre la fe.',
    eventDate: '2024-08-25',
    eventLocation: 'Centro de Pastoral',
    price: 800,
    stock: 50,
    images: [
      'https://colbifficartagena.edu.co/es/wp-content/uploads/2022/04/3-scaled.jpg',
    ],
  },
  {
    title: 'Encuentro de Coros Parroquiales',
    description: 'Una reunión para compartir y disfrutar de los coros de las parroquias locales.',
    eventDate: '2023-05-12',
    eventLocation: 'Capilla San José',
    price: 300,
    stock: 45,
    images: [
      'https://unam.edu.ar/images/2023/septiembre/encuentros_corales.png',
    ],
    status: 'inactive',
    highlight: true
  },
  {
    title: 'Torneo de Fútbol Parroquial',
    description: 'Competencia de fútbol entre las comunidades parroquiales de la región.',
    eventDate: '2024-04-10',
    eventLocation: 'Estadio Municipal',
    price: 0,
    stock: 200,
    images: [
      'https://fmella.com.ar/wp-content/uploads/2023/10/campeones-tapa.jpg',
    ],
    status: 'inactive',
    highlight: true
  },
  {
    title: 'Taller de Iconografía',
    description: 'Aprende sobre el arte de los íconos religiosos y su significado espiritual.',
    eventDate: '2023-09-07',
    eventLocation: 'Salón Cultural',
    price: 1500,
    stock: 20,
    images: [
      'https://www.religionenlibertad.com/images/carpeta_gestor/archivos/2021/04/23/ICONOS_INTERIOR_1200_675.jpg?r=9',
    ],
    status: 'inactive',
    highlight: true
  },
  {
    title: 'Retiro Familiar',
    description: 'Un día para la familia en el que se fortalecerán los lazos y la fe.',
    eventDate: '2024-05-15',
    eventLocation: 'Centro de Retiros Nazaret',
    price: 1200,
    stock: 60,
    images: [
      'https://www.aciprensa.com/imagespp/Cruz-por-que-ir-a-un-retiro-Shutterstock-21032023.jpg',
    ],
    status: 'inactive',
    highlight: true
  },
  {
    title: 'Charla sobre Ecología y Fe',
    description: 'Reflexión sobre la responsabilidad ambiental desde una perspectiva religiosa.',
    eventDate: '2023-08-19',
    eventLocation: 'Auditorio San Francisco',
    price: 500,
    stock: 80,
    images: [
      'https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEh0wezSj4eW5NUKQIfIZUpOBVNgFJKpG8PPgCY3jO0ZC28nwhrIJy2PnttDVHBk8L8h5JqgV3JRZf7ilW2wJXqIjaBAVSZwn57y9mloHSVsbDDSRFARVJQsz5p1muz_U5NOk24anR4HA-0z/s600/dibu-14-septiembre-08-color.jpg',
    ],
    status: 'inactive',
    highlight: true
  },
  {
    title: 'Encuentro Interparroquial de Jóvenes',
    description: 'Un espacio para compartir experiencias de fe y crecimiento personal entre jóvenes de distintas parroquias.',
    eventDate: '2025-02-11',
    eventLocation: 'Centro Deportivo La Esperanza',
    price: 900,
    stock: 150,
    images: [
      'https://www.diocesismalaga.es/cms/media/articulos/articulos-232283.jpg',
    ],
    status: 'active',
    highlight: true
  },
  {
    title: 'Concierto de Alabanza',
    description: 'Una noche de música y oración para alabar a Dios a través de canciones.',
    eventDate: '2025-07-30',
    eventLocation: 'Parque de la Ciudad',
    price: 1000,
    stock: 300,
    images: [
      'https://st4.depositphotos.com/18365422/20615/i/450/depositphotos_206151796-stock-photo-church-worship-concept-christians-raising.jpg',
    ],
    status: 'active',
    highlight: true
  }
];

export default eventSeeder;
