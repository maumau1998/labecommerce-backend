console.log("Aplicativo iniciado !")

const argumentos = process.argv[2]
console.log(argumentos)

function getRndInteger(min, max) {
    return Math.floor(Math.random() * (max - min + 1) ) + min;
  }
  
  const numeroAleatorioEntreZeroeDez = getRndInteger(0, 10)
  console.log(numeroAleatorioEntreZeroeDez)

  if(argumentos%2===0){
    if(numeroAleatorioEntreZeroeDez%2===0){
        console.log(`Você escolheu par e o computador escolheu impar. O resultado foi ${numeroAleatorioEntreZeroeDez}. Você ganhou!`)
    }else{
        console.log(`Você escolheu par e o computador escolheu impar. O resultado foi ${numeroAleatorioEntreZeroeDez}. Você perdeu!`)
    }
  }else if(argumentos%2===1){
    if(numeroAleatorioEntreZeroeDez%2===1){
        console.log(`Você escolheu impar e o computador escolheu par. O resultado foi ${numeroAleatorioEntreZeroeDez}. Você ganhou!`)
    }else{
        console.log(`Você escolheu impar e o computador escolheu par. O resultado foi ${numeroAleatorioEntreZeroeDez}. Você perdeu!`)
    }
  }