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

function repetir(val, rep, out) {
  out.innerHTML = "";
  for (var i = 0; i < parseInt(rep.value); i++) {
    out.innerHTML = (out.innerHTML + `<p>${val.value}</p><br>`);
  }
}

function convertCelToCent(cel, cent, clear=false) {
  if (clear==true) {cel.value = 0; cent.value = 0;}
  cel.value = cent.value
  cent.value = cel.value
}

function convertCelToFahr(cel, fahr, type) {
  switch (type) {
    case 0:fahr.value = (parseFloat(cel.value) * (9/5)) + 32;break;
    case 1:cel.value = (parseFloat(fahr.value) - 32) * 5/9;break;
    default:cel.value = 0; fahr.value = 0;
  }
}

function contar(pal, letr) {
  const a = [...pal.value];
  var conteo = 0;
  for (var i = 0; i < a.length; i++) {
    if (a[i] != ' '
    && a[i]!=0
    && a[i]!=1
    && a[i]!=2
    && a[i]!=3
    && a[i]!=4
    && a[i]!=5
    && a[i]!=6
    && a[i]!=7
    && a[i]!=8
    && a[i]!=9) {conteo++;}
  }
  letr.value = conteo;
}

function parOInpar(num, par) {
  if ((num.value % 2) == 0) {
    par.innerText = "es Par";
  }else {
    par.innerText = "es Inpar";
  }
}

function multiplosTres(rang1, rang2, multiplos) {
  var numbers = [];
  var count = 0;
  for (var i = 0; i < parseInt(rang2.value); i = i+3) {
    if (i > parseInt(rang1.value) && i < parseInt(rang2.value)) {
      numbers[count] = i;
      count++;
    }
  }
  multiplos.value = numbers;
}

function primos(rang, primosI) {
  var numbers = [];
  var count = 0;
  for (var i = 0; i < parseInt(rang.value); i++) {
    if (primo(i) && i!=0) {
      numbers[count] = i;
      count++;
    }
  }
  console.log(primosI);
  primosI.value = numbers;
}

function primo(numero) {
  for (var i = 2; i < numero; i++) {
    if (numero % i === 0) {
      return false;
    }
  }
  return numero !== 1;
}

function generarTexto(nombre, apellido, edad, ciudad, texto) {
  var text = "<p>Falto algo.</p>"
  if (nombre.value!="" && apellido.value!="" && edad.value!="" && ciudad.value!="") {
    text = `<p>Mi nombre es ${nombre.value} ${apellido.value}, tengo ${edad.value} años. Nací en la ciudad de ${ciudad.value}.</p>`;
  }
  texto.innerHTML = text;
}

function hasta(rang11, rang21, numerosrang) {
  var numeros = []
  var conteo = 0;
  if(parseInt(rang11.value) > parseInt(rang21.value)) {
    for (var i = parseInt(rang11.value) - 1; i > parseInt(rang21.value); i--) {
      numeros[conteo] = i;
      conteo++;
    }
  }else if(parseInt(rang11.value) < parseInt(rang21.value)) {
    for (var i = parseInt(rang11.value) + 1; i < parseInt(rang21.value); i++) {
      numeros[conteo] = i;
      conteo++;
    }
  }else if(parseInt(rang11.value) == parseInt(rang21.value)) {
    numeros[0] = "S/N";
  }
  numerosrang.value = numeros;
}
