//№1
function ask(question, yes, no) {
    if (confirm(question)) yes()
    else no()
}
ask("Ви згодні?",() => alert("Ви погодились."),() => alert("Ви скасували виконання.")
);
//