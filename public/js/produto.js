const v = document.querySelector("#preco");
v.addEventListener("focus", (e) => {
  if (v.value == "") v.value += "R$ ";
});
v.addEventListener("keyup", (e) => {
  let p = e.target.value;
  if (isNaN(p[p.length - 1])) {
    v.value = p.substring(0, v.value.length - 1);
  }
  if (v.value[6] == "," || ".") {
    v.maxLength = "9";
    if (p.length == 6) v.value += ",";
  }
});
