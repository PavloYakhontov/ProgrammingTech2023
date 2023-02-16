//Task 1
let i = 3;

while (i) {
  alert(i--); //Остання цифра буде 1.
  //Тому, що коли в нас число 0 - нам повертається false, тому відпобувається вихід з циклу
}

//Task 2
let k = 0;
while (++k < 5) alert(i); // k === 1..4

let o = 0;
while (o++ < 5) alert(i); // o === 1..5

//Task 3
for (let i = 0; i < 5; i++) alert(i); // i === 0..4
for (let i = 0; i < 5; ++i) alert(i); // i === 0..4

//Task 4
for (let i = 1; i <= 10; i++) {
  if (i % 2 === 0) {
    alert(i);
  }
}

//Task 5
let p = 0;

while (p !== 3) {
  alert(`число ${p}`);
  i++;
}

//Task 6
let num;

do {
  num = prompt("Введене число, більше за 100?", 0);
} while (num <= 100 && num);

//Task 7
let am = 0;

for (let n = 2; n <= 10; n++) {
  for (let i = 1; i <= n; i++) {
    if ((n / i) % 1 == 0) {
      am++;
    }

    if (i === n && am === 2) {
      alert(n);
    }

    if (i === n) {
      am = 0;
    }
  }
}
