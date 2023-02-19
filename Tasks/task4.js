// Перепишіть з використанням стрілкових функцій.

function ask(question, yes, no) {

    if (confirm(question)) {
        yes();
    }

    else {
        no();
    }
    
}

ask(
    "Ви згодні?",
    () => alert("Ви погодилися."),
    () => alert("Ви скасували виконання.")
);
