const lenghtSlider=document.querySelector(".con-largo input");
const opciones=document.querySelectorAll(".opcion input");
const copyIcon=document.querySelector(".input-box span");
const conInput=document.querySelector(".input-box input");
const conIndicador=document.querySelector(".con-indicador");
const generate=document.querySelector(".generate-button");

const caracteres={
    lowercase: "abcdefghijklmnopqrstuvwxyz",
    uppercase: "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
    numbers: "0123456789",
    symbols: "!#$%&()*+,-./:;<=>¿?[]@{}~"
}

const generateCon = () =>{
    let staticCon = "", randomCon = "", exclude = false, conLargo = lenghtSlider.value;

    opciones.forEach(opcion => {
        if(opcion.checked){
            if(opcion.id !== "exclude"){
                staticCon += caracteres[opcion.id];
            }else{
                exclude=true;
            }
        }
    });

    for(let i=0; i<conLargo; i++){
        let randomCarac = staticCon[Math.floor(Math.random() * staticCon.length)];
        if(exclude){
            !randomCon.includes(randomCarac) || randomCarac == " " ? randomCon += randomCarac : i--;
        }else{
            randomCon += randomCarac;
        }
    }
    conInput.value = randomCon;
    
}

const updateIn = () =>{
    conIndicador.id = lenghtSlider.value <= 8 ? "weak" : lenghtSlider.value<= 24 ? "medium" : "strong"; 
}

const updateSl = () =>{
    document.querySelector(".con-largo span").innerText = lenghtSlider.value;
    generateCon()
    updateIn();
}
updateSl();

const copyCon = () =>{
    navigator.clipboard.writeText(conInput.value);
    copyIcon.innerText = "check";
    copyIcon.style.color = "#4285f4";
    setTimeout(()=>{
        copyIcon.innerText ="copy_all";
        copyIcon.style.color="#707070";
    }, 1500);
}

copyIcon.addEventListener("click", copyCon);
lenghtSlider.addEventListener("input", updateSl);
generate.addEventListener("click", generateCon);