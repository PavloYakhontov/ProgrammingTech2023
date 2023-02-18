//№1 Чи буде показано alert?
if ("0") {
    alert( "Привіт" );
  }
//Так

//№2
let answer = prompt("Яка офіційна назва JavaScript?", "");

    if (answer == "ECMAScript") {
      alert("Правильно");
    } else {
      alert("Ви не знаєте? ECMAScript");
    }
//

//№3
let answer2 = prompt("Введіть число", 0);

if (answer2 > 0)
{
  alert( 1 );
} else if (answer2 < 0)
{
  alert( -1 );
} else
{
  alert( 0 );
}
//

//№4
let result = (a + b < 4) ? "Нижче" : "Вище";
//

//№4
let message = (login == "Працівник") ? "Привіт" :
  (login == "Директор") ? "Вітаю" :
  (login == '') ? "Немає логіну" :
  "";
//