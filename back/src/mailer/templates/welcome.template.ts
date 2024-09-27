export const welcomeTemplate = (userName: string) => {
  return `<html lang="es">
        <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Bienvenido</title>
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
            background-color: #4CAF50;
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
            <h1>¡Bienvenido al Movimiento Juvenil Peregrinos!</h1>
            <p>Hola <strong>${userName}</strong>,</p>
            <p>Gracias por registrarte en nuestra pagina. Nos alegra mucho tenerte con nosotros. Estamos comprometidos en ofrecerte la mejor experiencia posible.</p>
            <p>Puedes empezar a explorar nuestros servicios y disfrutar de todas las ventajas que ofrecemos.</p>
            <a href="[ENLACE_PAGINA]" class="button">Ir a la página</a>
            <div class="footer">
                <p>&copy; 2024 Movimiento Juvenil Peregrinos. Todos los derechos reservados.</p>
            </div>
        </div>
    </body>
    </html>`;
};
