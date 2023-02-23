for (let i = 2; i <= 10; i++) {
    if (i % 2 == 0) {
        alert(i);
    }
}

let i = 0;
while (i < 3) {
    alert(число ${i}!);
    i++;
}

let num;
do {
    num = prompt("Введене число, більше за 100?", 0);
} while (num <= 100 && num);

let n = 10;

nextPrime:
for (let i = 2; i <= n; i++) { // для кожного i...

    for (let j = 2; j < i; j++) { // шукаємо дільник..
        if (i % j == 0) continue nextPrime; // не просте, беремо наступне i
    }

    alert(i); // просте число
}