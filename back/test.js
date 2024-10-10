const now = new Date().toLocaleDateString();
const date = new Date();
const format = now.split('/').reverse();

function getMonth(month) {
  let monthLetter = '';

  switch (month) {
    case 'jun':
      monthLetter = 1;
      break;
    case 'fed':
      monthLetter = 2;
      break;
    case 'mar':
      monthLetter = 3;
      break;
    case 'apr':
      monthLetter = 4;
      break;
    case 'may':
      monthLetter = 5;
      break;
    case 'jun':
      monthLetter = 6;
      break;
    case 'jul':
      monthLetter = 7;
      break;
    case 'aug':
      monthLetter = 8;
      break;
    case 'sep':
      monthLetter = 9;
      break;
    case 'oct':
      monthLetter = 10;
      break;
    case 'nov':
      monthLetter = 11;
      break;
    case 'dic':
      monthLetter = 12;
      break;
    default:
      monthLetter = 'Mes inválido';
      break;
  }

  return monthLetter;
}
console.log(getMonth('jul'));

console.log(format);
console.log(now);

export const CreationDate = () => {
  const currentDate = new Date();
  const day = String(currentDate.getDate()).padStart(2, '0');
  const month = String(currentDate.getMonth() + 1).padStart(2, '0');
  const year = currentDate.getFullYear();

  return `${day}/${month}/${year}`;
};
console.log(CreationDate());

console.log(date);
const formatDate = (date) => {
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const year = date.getFullYear();
  return `${day}/${month}/${year}`;
};
console.log(formatDate(date));

const OneVOne = (number) => {
  let Match = [];
  let scorePlayer1 = 0;
  let scorePlayer2 = 0;

  for (let i = 0; i < number; i++) {
    let player1 = Math.random();
    let player2 = Math.random();
    let winner;

    if (player1 > player2) {
      winner = 'player1';
      scorePlayer1++;
    } else if (player1 < player2) {
      winner = 'player2';
      scorePlayer2++;
    } else {
      winner = 'Draw';
    }

    Match.push({
      Round: i + 1,
      Winner: winner,
    });
  }

  let finalWinner;
  if (scorePlayer1 > scorePlayer2) {
    finalWinner = 'player1';
  } else if (scorePlayer1 < scorePlayer2) {
    finalWinner = 'player2';
  } else {
    finalWinner = 'Draw';
  }

  return {
    Matches: Match,
    Scores: {
      player1: scorePlayer1,
      player2: scorePlayer2,
    },
    FinalWinner: finalWinner,
  };
};

console.log(OneVOne(1));



// implementar el control de stock. + - cupos disponibles.
// para ello crear una funcionalidad que detecte el cupo, si el cupo es 0 no hay stock.
// si el cupo es mayor que 0, que clone el valor del stock en una columna aparte y haga las operaciones sobre la columna secundaria que es el stock en tiempo real.

// si da tiempo, implementar en TODAS LAS FUNCIONES DEL USUARIO UNA RESPUESTA DE "SI EL USUARIO ESTA BANEADO"
// QUE RETORNE UNA RESPUESTA ESPECIFICA PARA QUE LE CIERRE LA SESION DE MANERA AUTOMATICA
// Y LE RETORNE UN AVISO DE SUSPENCION.

//IMPLEMENTAR RESTRICCIONES A TODAS LAS VISAS Y FUNCIONES PROPIAS DE UN USUARIO LOGUEADO Y ADMINISTRADOR.
// BASADAS EN TOKEN Y ROLE

// IMPLEMENTAR LA RECUPERACION DE CONTRASEÑA

// BOTON A FORMULARIO.
// ENVIAR CORREO ELECTRONICO.
// RESPONDER CON UN MAIL QUE REDIRECCIONE A UNA VISTA CONCRETA
// ESA VISTA CONCRETA DEBE TENER 2 CAMPOS PARA INGRESAR CONTRASEÑA Y CONFIRMAR CONTRASEÑA Y UN BOTON ENVIAR
// MODIFICAR EN BASE DE DATOS LA INFORMACION PROPORCIONADA Y RETORNAR AL FORMULARIO DE LOGIN


// MOSTRAR LAS DONACIONES QUE FUERON RECHAZADAS MANUALMENTE.

// REPASAR TODAS LAS RUTAS DEL BACK Y PONER LA SEGURIDAD POR TOKEN A AQUELLAS QUE REQUIERAN PERMISOS DE USUARIO





/* 

=> STOCK = 40 <= STOCK ENVIADO POR EL CLIENTE

=> VACANTS = 40 (+/-)

=> VACANTS => 0 => VACANCY FALSE

=================================

(PARAMS)
FIND (PARAMS)

COSNT {STOCK, VACANTS} = EVENT
CONST REST = PARAMS.STOCK - STOCK
CONST UPDATEDVACANS =  VACANTS + REST
CONST {STOCK, ...PARSEDPARAMS} = PARAMS
CONST UPDATEDPARAMS = {STOCK: UPDATEDSTOCK, VACANTS: UPDATEDVACANTS, ...PARSEDPARAMS}
THIS.UPDATE(UPDATEDPARAMS)




VACANTS = 17
=> STOCK 0

=> VACANST -1

VACANSY = TRUE



*/