import { status } from "src/common/enum/status.enum";

const userSeeder = [
  {
    email: 'juan.perez@example.com',
    status: status.PARTIALACTIVE,
    password: 'JuanPerez123!',
    name: 'Juan Pérez',
    phone: 123456789,
    address: 'Calle Falsa 123, Ciudad'
  },
  {
    email: 'maria.lopez@example.com',
    status: status.PARTIALACTIVE,
    password: 'MariaLopez456!',
    name: 'Maria López',
    phone: 987654321,
    address: 'Avenida Siempre Viva 742, Ciudad'
  },
  {
    email: 'carlos.martinez@example.com',
    status: status.PARTIALACTIVE,
    password: 'CarlosM2023!',
    name: 'Carlos Martínez',
    phone: 112233445,
    address: 'Boulevard del Sol 100, Ciudad'
  },
  {
    email: 'ana.rodriguez@example.com',
    status: status.PARTIALACTIVE,
    password: 'AnaR_1234!',
    name: 'Ana Rodríguez',
    phone: 998877665,
    address: 'Plaza Mayor 50, Ciudad'
  },
  {
    email: 'lucia.gomez@example.com',
    status: status.PARTIALACTIVE,
    password: 'LuciaG0mez!',
    name: 'Lucia Gómez',
    phone: 556677889,
    address: 'Ruta 40 km 200, Provincia'
  },
  {
    email: 'diego.ramirez@example.com',
    status: status.PARTIALACTIVE,
    password: 'Diego_Ram987!',
    name: 'Diego Ramírez',
    phone: 665544332,
    address: 'Callejón sin Salida 9, Pueblo'
  },
  {
    email: 'laura.sanchez@example.com',
    status: status.PARTIALACTIVE,
    password: 'LauraSan_2024!',
    name: 'Laura Sánchez',
    phone: 123321123,
    address: 'Costanera Norte 2000, Ciudad'
  },
  {
    email: 'miguel.fernandez@example.com',
    status: status.PARTIALACTIVE,
    password: 'Miguel_F123!',
    name: 'Miguel Fernández',
    phone: 332211998,
    address: 'Paseo de los Álamos 120, Provincia'
  },
  {
    email: 'valentina.rios@example.com',
    status: status.PARTIALACTIVE,
    password: 'ValenR10s_!',
    name: 'Valentina Ríos',
    phone: 445566778,
    address: 'Parque Central 1, Ciudad'
  },
  {
    email: 'pablo.diaz@example.com',
    status: status.PARTIALACTIVE,
    password: 'PabloDiaz_789!',
    name: 'Pablo Díaz',
    phone: 774455667,
    address: 'Villa del Mar, Manzana 8, Ciudad'
  }
];

export default userSeeder;