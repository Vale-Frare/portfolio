function sumar(var1, var2, resultInput) {
  var result = parseInt(var1.value) + parseInt(var2.value);
  resultInput.value = result;
}

function ordenar(ord1, ord2, ord3, ord4) {
  let numeros = [parseInt(ord1.value), parseInt(ord2.value), parseInt(ord3.value), parseInt(ord4.value)];
  numeros.sort(
    function(a, b) {
      return a - b;
    }
  );
  ord1.value = numeros[0];
  ord2.value = numeros[1];
  ord3.value = numeros[2];
  ord4.value = numeros[3];
}
