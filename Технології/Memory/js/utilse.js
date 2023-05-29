export const shuffle = (array) => {
    let currentIndex = array.length, randomIndex;
  
    while (currentIndex != 0) {
  
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;
  
      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex], array[currentIndex]];
    }
  
    return array;
  }
export const duplicateArray = (array) => array.reduce((res, current) => res.concat([current, current]), []);

export const createIconsArray =(initialCount)=>{
    const cardIcons =[
        'compass',
        'cloud',
        'play',
        'bolt',
        'stop',
        'cogs',
        'atom',
        'basketball-ball'

    ];
    
    const numbers = [2, 4,5, 6, 7,8];
    const randomIndex = Math.floor(Math.random() * numbers.length);
    const randomChoice = numbers[randomIndex];

    switch (initialCount) {
        case 'Початківець':
            return cardIcons.slice(0, 4);
        case 'Знавець':
            return cardIcons.slice(0, 6);
        case 'Майстер':
            return cardIcons.slice(0, 7);
        case 'Експерт':
            return cardIcons;
        case 'Random':
            return cardIcons.slice(0,randomChoice);
        default:
            break;
    }
}
function updateClock() {
    const now = new Date();
    const hours = now.getHours();
    const minutes = now.getMinutes();
    const seconds = now.getSeconds();

    document.getElementById('clock').textContent = 
        `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
}

updateClock();
setInterval(updateClock, 1000);

