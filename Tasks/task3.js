//№1 Яке останнє значення буде виведено на екран? Чому?

let i = 3
while (i) {
  alert( i-- );
} // 1

//№2 Яке значення виведе цикл "while"?

let i = 0
while (++i < 5) alert( i ) // 4

let i = 0
while (i++ < 5) alert( i ) // 5

//№3 Яке значення виведе цикл "for"?

for (let i = 0; i < 5; i++) alert( i ) // 0 - 4
for (let i = 0; i < 5; ++i) alert( i ) // 0 - 4

//№4 Виведіть парні числа від 2 до 10, використовуючи цикл for.

for (let i = 1; i <= 10; i++) 
    if (i % 2 === 0)
        console.log(i)

//№5 Замініть цикл "for" на "while"
let i = 0
while (++i < 3)
    alert(`число ${i}!`)

//№6 Повторяти цикл, доки ввід невірний
let a;
while (true) {
    a = prompt()
    if (a > 100 || a == '')
        break
}

// №7 Вивести прості числа

let n = prompt()
first: for (let i = 2; i <= n; i++) {
    for (let j = 2; j < i; j++) {
        if (i % j == 0)
            continue first
    }
    alert(i)
}