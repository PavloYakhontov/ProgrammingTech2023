import { startGame } from "./startGame.js";

export const createGameMenu = () => {
    const title = document.createElement('h2');
    const gameSection = document.querySelector('.gamesection_container');

    gameSection.innerHTML = '';
    title.textContent = 'Виберіть рівень складності';
    title.classList.add('gameMenu_title');
    document.querySelector('.winner').innerHTML = '';

    const createDifficultButton = (difficult) => {
        const button = document.createElement('button');

        button.classList.add('gameMenu_difficult-btn');
        button.textContent = `${difficult}`;

        button.addEventListener('click', () => startGame(difficult))

        return button;
    }

    gameSection.append(
        title,
        createDifficultButton('Початківець'),
        createDifficultButton('Знавець'),
        createDifficultButton('Майстер'),
        createDifficultButton('Експерт'),
        createDifficultButton('Random')
    )
}