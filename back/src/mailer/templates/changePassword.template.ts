export const changePasswordTemplate = (param) => {
    return `<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Solicitud de Cambio de Contraseña</title>
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
            background-color: #007bff;
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
        <h1>Solicitud de Cambio de Contraseña</h1>
        <p>Hola <strong>${param.name}</strong>,</p>
        <p>Recibimos una solicitud para cambiar la contraseña de tu cuenta.</p>
        <p>Si no solicitaste este cambio, puedes ignorar este mensaje. De lo contrario, haz clic en el botón a continuación para cambiar tu contraseña:</p>
        <a href="http://localhost:3000/users/change-password/${param.email}/${param.token}/${'Mango123*'}" class="button">Cambiar Contraseña</a>
        <p>Si tienes alguna pregunta o necesitas asistencia, no dudes en contactarnos.</p>
        <div class="footer">
            <p>&copy; 2024 Movimiento Juvenil Peregrinos. Todos los derechos reservados.</p>
        </div>
    </div>
</body>
</html>
`
}