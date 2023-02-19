const ask = (question, yes, no) => {
    confirm(question) ? yes() : no();
};
ask(
    "Ви згодні?",
    () => alert("Ви погодились."),
    () => alert("Ви скасували виконання.")
);