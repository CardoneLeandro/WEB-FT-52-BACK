import { DocumentBuilder } from "@nestjs/swagger";

export const swaggerConfig = new DocumentBuilder()
.setTitle('PF FT-52 CONGREGACIÓN JUVENIL PEREGRINOS BACKEND')
.setDescription('Proyecto final del grupo 5 de la cohorte FT-52. <br><br>Página hecha para la Congregación Juvenil Peregrinos que servirá para dar información sobre próximos eventos y recibir donaciones de los usuarios. Para poder acceder a las funcionalidades de la aplicación primero es necesario registrarse e iniciar sesión. Una vez la sesión esté iniciada se deberá tener en cuenta que para crear eventos se requiere, aparte de tener el rol de administrador, el "creatorId" que se obtiene al hacer Log-In.<br><br> Para iniciar sesión hay 2 formas de hacerlo: Una es a través de los servicios de google y la otra con el formulario de la aplicación. Si deseas iniciar sesión con google debes ir a la ruta "/auth/auth0/signup" y elegir la cuenta con la que deseas ingresar. Si es la primera vez que inicias sesión con la cuenta seleccionada deberás completar un formularion con información adicional necesaria para finalizar el registro en nuestro sitio web. Si deseas registrarte con el formulario de la aplicación entonces ve a la ruta "auth/signup". Una vez esté hecho el registro por cualquiera de las dos rutas, ir a la ruta "auth/login" para iniciar sesión. <br><br> Una vez el Log-In haya sido un éxito, tomar el Token del usuario que se devuelve e ingresarlo en el "Authorize" de la aplicación. Esto permitirá que si un usuario logueado con rol de Administrador pueda acceder a las rutas protegidas.')
.setVersion('1.0')
.addBearerAuth() 
.build();

