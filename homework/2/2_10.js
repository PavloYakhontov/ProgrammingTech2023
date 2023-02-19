//Task 1
if ("0") {
    alert("Привіт"); // Так відбудеться вивід
}

//Task 2
let question = prompt("Яка офіційна назва JS?");

if (question == 'ECMAScript') {
    alert('Правильно!');
} else {
    alert('Ви не знаєте? ECMAScript!');
}

//Task 3
let inputNum = +prompt("Введіть число");

if (inputNum > 0) {
    alert(1);
} else if (inputNum === 0) {
    alert(0);
} else {
    alert(-1);
}

//Task 4
let result;

return a + b < 4 ? (result = "Нижче") : (result = "Вище");

//Task 5
const login = "Працівник";
let message =
    login == "Працівник" ? "Привіт" :
        login == "Директор" ? "Вітаю" :
            login == "" ? "Немає логіну" :
                "";
alert(message);