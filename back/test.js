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
