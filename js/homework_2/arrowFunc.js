//Task 1

const ask = (question, yes, no) => {
  confirm(question) ? yes() : no();
};
ask(
  "Ви згодні?",
  function () {
    alert("Ви погодились.");
  },
  function () {
    alert("Ви скасували виконання.");
  }
);
