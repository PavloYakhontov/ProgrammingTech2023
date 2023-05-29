import { createGameCard } from "./Card.js";
import { createGameMenu } from "./menu.js";
import { createIconsArray, duplicateArray, shuffle } from "./utilse.js";
import { confetti } from "./winner.js";

export const startGame = (difficult) => {
    let firstCard = null;
    let secondCard = null;
    let clickable = true;
    let score = 0;

    const gameSection = document.querySelector('.gamesection_container')
    const gameTable = document.createElement('div');
    const cardsIcons = createIconsArray(difficult);
    const duplicateCardsIcons = duplicateArray(cardsIcons);
    const restartBtn = document.createElement('button');
    const scoreElement = document.getElementById('score');

    gameSection.innerHTML = '';
    restartBtn.textContent = 'Перезавантаження';
    gameTable.classList.add('game-table');
    restartBtn.classList.add('restart-btn');

    shuffle(duplicateCardsIcons);

    duplicateCardsIcons.forEach(icon => gameTable.append(createGameCard('question-circle', icon)))

    gameSection.append(gameTable, restartBtn);

    const cards = document.querySelectorAll('.game-card');

    restartBtn.addEventListener('click', () => {
        createGameMenu();
        score = 0;
        scoreElement.textContent = '';
    });

    cards.forEach((card, index) => card.addEventListener('click', () => {
        if (clickable == true && !card.classList.contains('successfully')) {
            card.classList.add('flip');

            if (firstCard == null) {
                firstCard = index;
            } else {
                if (index != firstCard) {
                    secondCard = index;
                    clickable = false;
                }
            }

            if (firstCard != null && secondCard != null && firstCard != secondCard) {
                if (
                    cards[firstCard].firstElementChild.className ===
                    cards[secondCard].firstElementChild.className
                ) {
                    setTimeout(() => {
                        cards[firstCard].classList.add('successfully');
                        cards[secondCard].classList.add('successfully');
                        score += 100;

                        firstCard = null;
                        secondCard = null;
                        clickable = true;

                        scoreElement.textContent = "Рахунок: " + score;
                        
                        setTimeout(() => {
                            if (Array.from(cards).every(card => card.classList.contains('successfully'))) {
                                score += 100;
                                document.querySelector('.winner').innerHTML = confetti;
                                scoreElement.textContent = "Рахунок: " + score;
                            }
                        }, 100);
                        
                    }, 800);
                } else {
                    setTimeout(() => {
                        cards[firstCard].classList.remove('flip');
                        cards[secondCard].classList.remove('flip');

                        firstCard = null;
                        secondCard = null;
                        clickable = true;
                    }, 800);
                }
            }
        }
    }));

    scoreElement.textContent = "Рахунок: " + score;
}
