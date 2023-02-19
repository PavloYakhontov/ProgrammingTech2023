'use strict';

let value0 = prompt('Яка "офіційна" назва JavaScript?', '');

if (value0 == 'ECMAScript') {
    alert('Правильно!');
} else {
    alert('Ви не знаєте? ECMAScript!');
}

let value1 = prompt('Введіть число', 0);

if (value1 > 0) {
    alert(1);
} else if (value1 < 0) {
    alert(-1);
} else {
    alert(0);
}

let result = (a + b < 4) ? 'Нижче' : 'Вище';

let message = (login == 'Працівник') ? 'Привіт' :
    (login == 'Директор') ? 'Вітаю' :
        (login == '') ? 'Немає логіну' :
            '';