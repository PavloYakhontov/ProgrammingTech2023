//Постфіксна та префіксна форми

let a = 1, b = 1;

let c = ++a; // 2
let d = b++; // 1

//Оператори порівняння

5 > 4 //true
"ананас" > "яблуко" //false
"2" > "12" //true
undefined == null //true
undefined === null //false
null == "\n0\n" //false
null === +"\n0\n" //false

//Назва JavaScript
let value = prompt('Яка "офіційна" назва JavaScript?', '');

if (value == 'ECMAScript') {
    alert('Правильно!');
} else {
    alert('Ви не знаєте? ECMAScript!');
}

//Перепишіть 'if..else' на '?'
let message = (login == 'Працівник') ? 'Привіт' :
              (login == 'Директор') ? 'Вітаю' :
              (login == '') ? 'Немає логіну' :'';


//  Перевірте логін             
let userName = prompt('Хто там?', '');

if (userName === 'Admin') {

  let pass = prompt('Пароль?', '');

  if (pass === 'Господар') {
    alert( 'Ласкаво просимо!' );
  } else if (pass === '' || pass === null) {
    alert( 'Скасовано' );
  } else {
    alert( 'Неправильний пароль' );
  }

} else if (userName === '' || userName === null) {
  alert( 'Скасовано' );
} else {
  alert( 'Я вас не знаю' );
}
