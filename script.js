let counter = document.createElement('div');
document.body.appendChild(counter);
counter.classList.add('counter');
let score = 0;
counter.innerHTML = `
    ${score}
`;

let field = document.createElement('div');
document.body.appendChild(field);
field.classList.add('field');

for (let i = 1; i < 101; i++) {
    let cell = document.createElement('div');
    field.appendChild(cell);
    cell.classList.add('cell');
}

let count = document.querySelectorAll('.cell');
let x = 1,
    y = 10;

for (let i = 0; i < 100; i++) {
    if (x > 10) {
        x = 1,
            y--;
    }
    count[i].setAttribute('positionX', x);
    count[i].setAttribute('positionY', y);
    x++;
}

const createSnake = function() {
    let positionX = Math.round(Math.random() * (10 - 2) + 2),
        positionY = Math.round(Math.random() * (10 - 1) + 1);
    return [positionX, positionY];
}
let start = createSnake();
let snakeBus = [document.querySelector('[positionx="' + start[0] + '"][positiony="' + start[1] + '"]'), document.querySelector('[positionx="' + (start[0] - 1) + '"][positiony="' + start[1] + '"]')];

for (let i = 0; i < snakeBus.length; i++) {
    snakeBus[i].classList.add('snake');
}

let foodBus;
const createFoodBus = function() {
    function appearFoodBus() {
        let positionX = Math.round(Math.random() * (10 - 1) + 1);
        let positionY = Math.round(Math.random() * (10 - 1) + 1);
        return [positionX, positionY];
    }
    let foodBusStart = appearFoodBus();
    foodBus = document.querySelector('[positionX="' + foodBusStart[0] + '"][positionY="' + foodBusStart[1] + '"]');
    foodBus.classList.add('foodBus');

    while (foodBus === snakeBus) {
        let foodBusStart = appearFoodBus();
        foodBus = document.querySelector('[positionX="' + foodBusStart[0] + '"][positionY="' + foodBusStart[1] + '"]');
    }
}

createFoodBus();

let controls = 'right';

const move = function() {
    let posXY = [snakeBus[0].getAttribute('positionx'), snakeBus[0].getAttribute('positiony')];
    snakeBus[snakeBus.length - 1].classList.remove('snake');
    snakeBus.pop();

    if (controls == 'right') {
        if (posXY[0] < 10) {
            snakeBus.unshift(document.querySelector('[positionX="' + (+posXY[0] + 1) + '"][positionY="' + posXY[1] + '"]'));
        } else {
            snakeBus.unshift(document.querySelector('[positionX="1"][positionY="' + posXY[1] + '"]'));
        }
    }

    if (controls == 'left') {
        if (posXY[0] > 1) {
            snakeBus.unshift(document.querySelector('[positionX="' + (+posXY[0] - 1) + '"][positionY="' + posXY[1] + '"]'));
        } else {
            snakeBus.unshift(document.querySelector('[positionX="10"][positionY="' + posXY[1] + '"]'));
        }

    }

    if (controls == 'up') {
        if (posXY[1] < 10) {
            snakeBus.unshift(document.querySelector('[positionX="' + posXY[0] + '"][positionY="' + (+posXY[1] + 1) + '"]'));
        } else {
            snakeBus.unshift(document.querySelector('[positionX="' + posXY[0] + '"][positionY="1"]'));
        }
    }

    if (controls == 'down') {
        if (posXY[1] > 1) {
            snakeBus.unshift(document.querySelector('[positionX="' + posXY[0] + '"][positionY="' + (+posXY[1] - 1) + '"]'));
        } else {
            snakeBus.unshift(document.querySelector('[positionX="' + posXY[0] + '"][positionY="10"]'));
        }
    }

    if (snakeBus[0].getAttribute('positionX') == foodBus.getAttribute('positionX') && snakeBus[0].getAttribute('positionY') == foodBus.getAttribute('positionY')) {
        foodBus.classList.remove('foodBus');
        score++;

        counter.innerHTML = `
        ${score}
        `;

        let lastPositionX = snakeBus[snakeBus.length - 1].getAttribute('positionx');
        let lastPositionY = snakeBus[snakeBus.length - 1].getAttribute('positiony');
        snakeBus.push(document.querySelector('[positionX = "' + lastPositionX + '"][positionY = "' + lastPositionY + '"]'));
        createFoodBus();
    }

    if (snakeBus[0].classList.contains('snake')) {
        alert('Game Over. Your score is ' + score);
        clearInterval(go);
    }

    for (let i = 0; i < snakeBus.length; i++) {
        snakeBus[i].classList.add('snake');
    }
};

let go = setInterval(move, 500);

window.addEventListener('keydown', event => {

    if (event.key == 'ArrowDown' && controls != 'up')
        controls = 'down';
    else if (event.key == 'ArrowUp' && controls != 'down')
        controls = 'up';
    else if (event.key == 'ArrowLeft' && controls != 'right')
        controls = 'left';
    else if (event.key == 'ArrowRight' && controls != 'left')
        controls = 'right';

});