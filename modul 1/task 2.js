//№1 Яке останнє значення буде виведено на екран? Чому?
let ij = 3;

while (ij) {
    alert( ij-- );
}
// 1, бо цикл закінчиться при i = 0

//№2 
let ik = 0;
while (++ik < 5) alert( ik ); // від 1 до 4

let il = 0;
while (il++ < 5) alert( il ); // від 1 до 5
// 

//№3
for (let i = 0; i < 5; ++i) alert( i ); // обидва цикли від 0 до 4
// 

//№4
for (let i = 2; i < 11; i++) {
    if (i % 2 == 0) {
    alert( i );
    }
}
//

//№5
let i = 0;
while (i <= 2) {
    alert( `число ${i}!` );
    i++;
}
//

//№6
let number;

do {
    number = prompt("Введене число, більше за 100?", 0);
} while (number <= 100 && number);
//

//№7
let n = promt();

next: for (let i = 2; i <= n; i++) {
    for (let j = 2; j < i; j++) {
        if (i % j == 0) {
        continue next;
    }
    }
    alert( i );
}
//