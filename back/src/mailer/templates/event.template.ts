export const eventTemplate = (param) => {
  return `<html lang="es">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>!Te has unido a un evento!</title>
        <style>
            body {
                font-family: Arial, sans-serif;
                background-color: #f4f4f4;
                margin: 0;
                padding: 0;
            }
            .container {
                max-width: 600px;
                margin: 0 auto;
                background-color: #ffffff;
                padding: 20px;
                border-radius: 8px;
                box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
            }
            h1 {
                color: #333333;
            }
            p {
                font-size: 16px;
                color: #555555;
                line-height: 1.5;
            }
            .button {
                display: inline-block;
                padding: 10px 20px;
                background-color: #007BFF;
                color: white;
                text-decoration: none;
                border-radius: 5px;
                font-size: 16px;
                margin-top: 20px;
            }
            .footer {
                margin-top: 30px;
                text-align: center;
                font-size: 12px;
                color: #999999;
            }
        </style>
    </head>
    <body>
        <div class="container">
            <h1>¡Gracias por unirte a nuestro evento!</h1>
            <p>Hola <strong>${param.name}</strong>,</p>
            <p>Te confirmamos que has marcado asistencia al evento <strong>${param.title}</strong>, que se llevará a cabo el día <strong>${param.eventDate.toLocaleDateString()}</strong>.</p>
            <p>Estamos muy emocionados de contar con tu presencia. A continuación, te compartimos algunos detalles adicionales del evento:</p>
            <ul>
                <li><strong>Fecha:</strong> ${param.eventDate.toLocaleDateString()}</li>
                <li><strong>Hora:</strong> ${param.eventDate.toLocaleTimeString()}</li>
                <li><strong>Lugar:</strong> ${param.eventLocation}</li>
            </ul>
            <p>Si necesitas más información o deseas modificar tu asistencia, no dudes en contactarnos o visitar nuestra página web.</p>
            <a href="[ENLACE_DEL_EVENTO]" class="button">Ver detalles del evento</a>
            <p>¡Nos vemos pronto!</p>
            <div class="footer">
                <p>&copy; 2024 Movimiento Juvenil Peregrinos. Todos los derechos reservados.</p>
            </div>
        </div>
    </body>
    </html>`;
};
