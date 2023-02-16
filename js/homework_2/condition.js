//Task 1
if ("0") {
  alert("Привіт"); // Виведе alert, тому що середина умови конвертується в true
}

//Task 2
let question = prompt("Яка офіційна назва JS?");

return question === "ECMAScript"
  ? alert("Правильно")
  : alert("Не знаєте? ECMAScript!");

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
let message;

return login == "Працівник"
  ? (message = "Привіт")
  : login == "Директор"
  ? (message = "Вітаю")
  : login == ""
  ? (message = "Немає логіну")
  : (message = "");
