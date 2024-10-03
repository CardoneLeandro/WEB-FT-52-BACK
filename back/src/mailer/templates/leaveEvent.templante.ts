export const leaveEventTemplate = (param) => {
    return `<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Confirmación de Salida del Evento</title>
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
            background-color: #dc3545;
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
        <h1>Has salido del evento</h1>
        <p>Hola <strong>${param.name}</strong>,</p>
        <p>Te confirmamos que has salido del evento <strong>${param.title}</strong>, que se iba a llevar a cabo el día <strong>${param.eventDate.toLocaleDateString()}</strong>.</p>
        <p>Entendemos que los planes pueden cambiar, pero esperamos poder verte en alguno de nuestros futuros eventos. Si en algún momento deseas unirte nuevamente al evento, siempre serás bienvenido.</p>
        <p>A continuación te dejamos los detalles del evento del cual te has retirado:</p>
        <ul>
            <li><strong>Fecha:</strong> ${param.eventDate.toLocaleDateString()}</li>
            <li><strong>Hora:</strong> ${param.eventDate.toLocaleTimeString()}</li>
            <li><strong>Lugar:</strong> ${param.eventLocation}</li>
        </ul>
        <p>Si cambias de opinión o tienes alguna pregunta, no dudes en contactarnos.</p>
        <a href="[ENLACE_DEL_EVENTO]" class="button">Unirme nuevamente</a>
        <p>Gracias por tu interés en nuestros eventos.</p>
        <div class="footer">
            <p>&copy; 2024 Movimiento Juvenil Peregrinos. Todos los derechos reservados.</p>
        </div>
    </div>
</body>
</html>`
}