const now = new Date().toLocaleDateString()

const format = now.split('/').reverse()

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
console.log(getMonth('jul'))

console.log(format)
console.log(now)