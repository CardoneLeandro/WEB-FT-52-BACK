const eventSeeder = [
  {
    title: 'Concierto de Navidad',
    description:
      'Un evento musical para celebrar la Navidad con villancicos tradicionales.',
    eventDate: '2024-12-24',
    eventAddress: 'Teatro Central',
    eventLocation:
      'https://www.google.com.ar/maps/place/Cdad.+de+Tampa+1980,+X5008+Córdoba/@-31.3877345,-64.2074597,17z/data=!3m1!4b1!4m6!3m5!1s0x943298f1ad4c1d37:0x652a02761aca6e0d!8m2!3d-31.3877345!4d-64.2048794!16s%2Fg%2F11kp8qzwmp?entry=ttu&g_ep=EgoyMDI0MTAwMi4xIKXMDSoASAFQAw%3D%3D',
    price: 1500,
    stock: 0,
    images: [
      'https://img.freepik.com/foto-gratis/gente-tiro-medio-cantando-juntos_23-2149535685.jpg?t=st=1728479320~exp=1728482920~hmac=90d7b0509ba17fbe806ccccb9ea9ba4bbb329d00e116cddd20fe1b8634c99dbf&w=1380',
    ],
  },
  {
    title: 'Taller de Oración',
    description:
      'Una jornada de reflexión y oración dirigida por el padre Juan.',
    eventDate: '2024-12-15',
    eventAddress: 'Parroquia San Pablo',
    eventLocation:
      'https://www.google.com.ar/maps/place/Cdad.+de+Tampa+1980,+X5008+Córdoba/@-31.3877345,-64.2074597,17z/data=!3m1!4b1!4m6!3m5!1s0x943298f1ad4c1d37:0x652a02761aca6e0d!8m2!3d-31.3877345!4d-64.2048794!16s%2Fg%2F11kp8qzwmp?entry=ttu&g_ep=EgoyMDI0MTAwMi4xIKXMDSoASAFQAw%3D%3D',
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
    eventDate: '2024-12-10',
    eventAddress: 'Casa de Retiros Los Pinos',
    eventLocation:
      'https://www.google.com.ar/maps/place/Cdad.+de+Tampa+1980,+X5008+Córdoba/@-31.3877345,-64.2074597,17z/data=!3m1!4b1!4m6!3m5!1s0x943298f1ad4c1d37:0x652a02761aca6e0d!8m2!3d-31.3877345!4d-64.2048794!16s%2Fg%2F11kp8qzwmp?entry=ttu&g_ep=EgoyMDI0MTAwMi4xIKXMDSoASAFQAw%3D%3D',
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
    eventAddress: 'Catedral Metropolitana',
    eventLocation:
      'https://www.google.com.ar/maps/place/Cdad.+de+Tampa+1980,+X5008+Córdoba/@-31.3877345,-64.2074597,17z/data=!3m1!4b1!4m6!3m5!1s0x943298f1ad4c1d37:0x652a02761aca6e0d!8m2!3d-31.3877345!4d-64.2048794!16s%2Fg%2F11kp8qzwmp?entry=ttu&g_ep=EgoyMDI0MTAwMi4xIKXMDSoASAFQAw%3D%3D',
    price: 0,
    stock: 100,
    images: [
      'https://img.freepik.com/foto-gratis/concepto-comunion-comida_23-2149337573.jpg?t=st=1728573168~exp=1728576768~hmac=106549599bc454a845b9c8aaaba9c12571634e0034602187bd2f1df7ce318d40&w=740',
    ],
  },
  {
    title: 'Seminario de Fe y Familia',
    description:
      'Un seminario dedicado a fortalecer los lazos familiares a través de la fe.',
    eventDate: '2025-06-20',
    eventAddress: 'Auditorio Juan XXIII',
    eventLocation:
      'https://www.google.com.ar/maps/place/Cdad.+de+Tampa+1980,+X5008+Córdoba/@-31.3877345,-64.2074597,17z/data=!3m1!4b1!4m6!3m5!1s0x943298f1ad4c1d37:0x652a02761aca6e0d!8m2!3d-31.3877345!4d-64.2048794!16s%2Fg%2F11kp8qzwmp?entry=ttu&g_ep=EgoyMDI0MTAwMi4xIKXMDSoASAFQAw%3D%3D',
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
    eventDate: '2025-07-15',
    eventAddress: 'Santiago de Compostela',
    eventLocation:
      'https://www.google.com.ar/maps/place/Cdad.+de+Tampa+1980,+X5008+Córdoba/@-31.3877345,-64.2074597,17z/data=!3m1!4b1!4m6!3m5!1s0x943298f1ad4c1d37:0x652a02761aca6e0d!8m2!3d-31.3877345!4d-64.2048794!16s%2Fg%2F11kp8qzwmp?entry=ttu&g_ep=EgoyMDI0MTAwMi4xIKXMDSoASAFQAw%3D%3D',
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
    eventAddress: 'Salón de la Parroquia',
    eventLocation:
      'https://www.google.com.ar/maps/place/Cdad.+de+Tampa+1980,+X5008+Córdoba/@-31.3877345,-64.2074597,17z/data=!3m1!4b1!4m6!3m5!1s0x943298f1ad4c1d37:0x652a02761aca6e0d!8m2!3d-31.3877345!4d-64.2048794!16s%2Fg%2F11kp8qzwmp?entry=ttu&g_ep=EgoyMDI0MTAwMi4xIKXMDSoASAFQAw%3D%3D',
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
    eventAddress: 'Universidad Católica',
    eventLocation:
      'https://www.google.com.ar/maps/place/Cdad.+de+Tampa+1980,+X5008+Córdoba/@-31.3877345,-64.2074597,17z/data=!3m1!4b1!4m6!3m5!1s0x943298f1ad4c1d37:0x652a02761aca6e0d!8m2!3d-31.3877345!4d-64.2048794!16s%2Fg%2F11kp8qzwmp?entry=ttu&g_ep=EgoyMDI0MTAwMi4xIKXMDSoASAFQAw%3D%3D',
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
    eventAddress: 'Plaza Mayor',
    eventLocation:
      'https://www.google.com.ar/maps/place/Cdad.+de+Tampa+1980,+X5008+Córdoba/@-31.3877345,-64.2074597,17z/data=!3m1!4b1!4m6!3m5!1s0x943298f1ad4c1d37:0x652a02761aca6e0d!8m2!3d-31.3877345!4d-64.2048794!16s%2Fg%2F11kp8qzwmp?entry=ttu&g_ep=EgoyMDI0MTAwMi4xIKXMDSoASAFQAw%3D%3D',
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
    eventDate: '2024-10-25',
    eventAddress: 'Centro de Pastoral',
    eventLocation:
      'https://www.google.com.ar/maps/place/Cdad.+de+Tampa+1980,+X5008+Córdoba/@-31.3877345,-64.2074597,17z/data=!3m1!4b1!4m6!3m5!1s0x943298f1ad4c1d37:0x652a02761aca6e0d!8m2!3d-31.3877345!4d-64.2048794!16s%2Fg%2F11kp8qzwmp?entry=ttu&g_ep=EgoyMDI0MTAwMi4xIKXMDSoASAFQAw%3D%3D',
    price: 800,
    stock: 50,
    images: [
      'https://colbifficartagena.edu.co/es/wp-content/uploads/2022/04/3-scaled.jpg',
    ],
  },
  {
    title: 'Encuentro de Coros Parroquiales',
    description:
      'Una reunión para compartir y disfrutar de los coros de las parroquias locales.',
    eventDate: '2024-05-12',
    eventAddress: 'Capilla San José',
    eventLocation:
      'https://www.google.com.ar/maps/place/Cdad.+de+Tampa+1980,+X5008+Córdoba/@-31.3877345,-64.2074597,17z/data=!3m1!4b1!4m6!3m5!1s0x943298f1ad4c1d37:0x652a02761aca6e0d!8m2!3d-31.3877345!4d-64.2048794!16s%2Fg%2F11kp8qzwmp?entry=ttu&g_ep=EgoyMDI0MTAwMi4xIKXMDSoASAFQAw%3D%3D',
    price: 300,
    stock: 45,
    images: [
      'https://unam.edu.ar/images/2023/septiembre/encuentros_corales.png',
    ],
    status: 'inactive',
    highlight: true,
  },
  {
    title: 'Torneo de Fútbol Parroquial',
    description:
      'Competencia de fútbol entre las comunidades parroquiales de la región.',
    eventDate: '2024-04-10',
    eventAddress: 'Estadio Municipal',
    eventLocation:
      'https://www.google.com.ar/maps/place/Cdad.+de+Tampa+1980,+X5008+Córdoba/@-31.3877345,-64.2074597,17z/data=!3m1!4b1!4m6!3m5!1s0x943298f1ad4c1d37:0x652a02761aca6e0d!8m2!3d-31.3877345!4d-64.2048794!16s%2Fg%2F11kp8qzwmp?entry=ttu&g_ep=EgoyMDI0MTAwMi4xIKXMDSoASAFQAw%3D%3D',
    price: 0,
    stock: 200,
    images: [
      'https://fmella.com.ar/wp-content/uploads/2023/10/campeones-tapa.jpg',
    ],
    status: 'inactive',
    highlight: true,
  },
  {
    title: 'Taller de Iconografía',
    description:
      'Aprende sobre el arte de los íconos religiosos y su significado espiritual.',
    eventDate: '2023-09-07',
    eventAddress: 'Salón Cultural',
    eventLocation:
      'https://www.google.com.ar/maps/place/Cdad.+de+Tampa+1980,+X5008+Córdoba/@-31.3877345,-64.2074597,17z/data=!3m1!4b1!4m6!3m5!1s0x943298f1ad4c1d37:0x652a02761aca6e0d!8m2!3d-31.3877345!4d-64.2048794!16s%2Fg%2F11kp8qzwmp?entry=ttu&g_ep=EgoyMDI0MTAwMi4xIKXMDSoASAFQAw%3D%3D',
    price: 1500,
    stock: 20,
    images: [
      'https://www.religionenlibertad.com/images/carpeta_gestor/archivos/2021/04/23/ICONOS_INTERIOR_1200_675.jpg?r=9',
    ],
    status: 'inactive',
    highlight: true,
  },
  {
    title: 'Retiro Familiar',
    description:
      'Un día para la familia en el que se fortalecerán los lazos y la fe.',
    eventDate: '2024-05-15',
    eventAddress: 'Centro de Retiros Nazaret',
    eventLocation:
      'https://www.google.com.ar/maps/place/Cdad.+de+Tampa+1980,+X5008+Córdoba/@-31.3877345,-64.2074597,17z/data=!3m1!4b1!4m6!3m5!1s0x943298f1ad4c1d37:0x652a02761aca6e0d!8m2!3d-31.3877345!4d-64.2048794!16s%2Fg%2F11kp8qzwmp?entry=ttu&g_ep=EgoyMDI0MTAwMi4xIKXMDSoASAFQAw%3D%3D',
    price: 1200,
    stock: 60,
    images: [
      'https://www.aciprensa.com/imagespp/Cruz-por-que-ir-a-un-retiro-Shutterstock-21032023.jpg',
    ],
    status: 'inactive',
    highlight: true,
  },
  {
    title: 'Charla sobre Ecología y Fe',
    description:
      'Reflexión sobre la responsabilidad ambiental desde una perspectiva religiosa.',
    eventDate: '2023-08-19',
    eventAddress: 'Auditorio San Francisco',
    eventLocation:
      'https://www.google.com.ar/maps/place/Cdad.+de+Tampa+1980,+X5008+Córdoba/@-31.3877345,-64.2074597,17z/data=!3m1!4b1!4m6!3m5!1s0x943298f1ad4c1d37:0x652a02761aca6e0d!8m2!3d-31.3877345!4d-64.2048794!16s%2Fg%2F11kp8qzwmp?entry=ttu&g_ep=EgoyMDI0MTAwMi4xIKXMDSoASAFQAw%3D%3D',
    price: 500,
    stock: 80,
    images: [
      'https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEh0wezSj4eW5NUKQIfIZUpOBVNgFJKpG8PPgCY3jO0ZC28nwhrIJy2PnttDVHBk8L8h5JqgV3JRZf7ilW2wJXqIjaBAVSZwn57y9mloHSVsbDDSRFARVJQsz5p1muz_U5NOk24anR4HA-0z/s600/dibu-14-septiembre-08-color.jpg',
    ],
    status: 'inactive',
    highlight: true,
  },
  {
    title: 'Encuentro Interparroquial de Jóvenes',
    description:
      'Un espacio para compartir experiencias de fe y crecimiento personal entre jóvenes de distintas parroquias.',
    eventDate: '2025-02-11',
    eventAddress: 'Centro Deportivo La Esperanza',
    eventLocation:
      'https://www.google.com.ar/maps/place/Cdad.+de+Tampa+1980,+X5008+Córdoba/@-31.3877345,-64.2074597,17z/data=!3m1!4b1!4m6!3m5!1s0x943298f1ad4c1d37:0x652a02761aca6e0d!8m2!3d-31.3877345!4d-64.2048794!16s%2Fg%2F11kp8qzwmp?entry=ttu&g_ep=EgoyMDI0MTAwMi4xIKXMDSoASAFQAw%3D%3D',
    price: 900,
    stock: 150,
    images: [
      'https://www.diocesismalaga.es/cms/media/articulos/articulos-232283.jpg',
    ],
    status: 'active',
    highlight: true,
  },
  {
    title: 'Concierto de Alabanza',
    description:
      'Una noche de música y oración para alabar a Dios a través de canciones.',
    eventDate: '2025-07-30',
    eventAddress: 'Parque de la Ciudad',
    eventLocation:
      'https://www.google.com.ar/maps/place/Cdad.+de+Tampa+1980,+X5008+Córdoba/@-31.3877345,-64.2074597,17z/data=!3m1!4b1!4m6!3m5!1s0x943298f1ad4c1d37:0x652a02761aca6e0d!8m2!3d-31.3877345!4d-64.2048794!16s%2Fg%2F11kp8qzwmp?entry=ttu&g_ep=EgoyMDI0MTAwMi4xIKXMDSoASAFQAw%3D%3D',
    price: 1000,
    stock: 300,
    images: [
      'https://st4.depositphotos.com/18365422/20615/i/450/depositphotos_206151796-stock-photo-church-worship-concept-christians-raising.jpg',
    ],
    status: 'active',
    highlight: true,
  },
];

export default eventSeeder;
