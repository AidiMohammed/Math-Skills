const fileInput = document.getElementById("fileInput");
const btnRead = document.getElementById("readFile");
const alertDiv = document.getElementById("alert");
const result = document.getElementById("result");
const bntCA = document.getElementById("btn-close-alert");

const valAVG = document.getElementById("value-AVG")
const valMED = document.getElementById("value-MED")
const valVAR = document.getElementById("value-VAR")
const valSTD = document.getElementById("value-STD")

const modeALL = document.getElementById("mode-all")
const modeAVG = document.getElementById("mode-AVG")
const modeMED = document.getElementById("mode-MED")
const modeVAR = document.getElementById("mode-VAR")
const modeSTD = document.getElementById("mode-STD")

const toast = document.getElementById("toast")
const closeToast = document.getElementById("btn-close")
const messageToast = document.getElementById("message-toast")

const modeCalcul = document.getElementById("modeCalcul")

var idTimeOut = 0

closeToast.addEventListener('click', () => {
    hiddenToast()
})

modeALL.addEventListener('click', () => 
{
    Array.from(result.children).forEach((element,index) => {
        element.style.display = "block"
    })
    toast.style.display = "block"
    messageToast.textContent = "ALL"

    if (idTimeOut != 0)
        clearTimeout(idTimeOut)

    idTimeOut = setTimeout(() => {
        hiddenToast()
        idTimeOut = 0
    },3000)
})

modeAVG.addEventListener('click', () => 
{
    Array.from(result.children).forEach((element,index) => {
        if(index == 0)
            element.style.display = "block"
        else
            element.style.display = "none"
    })
    toast.style.display = "block"
    messageToast.textContent = "Average"

    if (idTimeOut != 0)
        clearTimeout(idTimeOut)

    idTimeOut = setTimeout(() => {
        hiddenToast()
        idTimeOut = 0
    },3000)
})

modeMED.addEventListener('click', () => 
{
    Array.from(result.children).forEach((element,index) => {
        if(index == 1)
            element.style.display = "block"
        else
            element.style.display = "none"
    })
    toast.style.display = "block"
    messageToast.textContent = "Median"

    if (idTimeOut != 0)
        clearTimeout(idTimeOut)

    idTimeOut = setTimeout(() => {
        hiddenToast()
        idTimeOut = 0
    },3000)
})

modeVAR.addEventListener('click', () => 
{
    Array.from(result.children).forEach((element,index) => {
        if(index == 2)
            element.style.display = "block"
        else
            element.style.display = "none"
    })
    toast.style.display = "block"
    messageToast.textContent = "Variance"

    if (idTimeOut != 0)
        clearTimeout(idTimeOut)

    idTimeOut = setTimeout(() => {
        hiddenToast()
        idTimeOut = O
    },3000)
})

modeSTD.addEventListener('click', () => 
{
    Array.from(result.children).forEach((element,index) => {
        if(index == 3)
            element.style.display = "block"
        else
            element.style.display = "none"
    })
    toast.style.display = "block"
    messageToast.textContent = "Standard Deviation"

    if (idTimeOut != 0)
        clearTimeout(idTimeOut)
    

    idTimeOut = setTimeout(() => {
        hiddenToast()
        idTimeOut = 0
    },3000)
})

btnRead.addEventListener('click',() => 
{
    const myFile = fileInput.files[0]

    if (myFile)
    {
        const readerFile = new FileReader();
        var AVG = null;
        var median = 0;
        var variance = 0;

        readerFile.onload = (e) => 
        {
            const elements = e.target.result.split('\n')
            AVG = Math.round(calculAVG(elements))
            median = Math.round(calculMedian(elements))
            variance = Math.round(calculVAR(elements,Math.round(AVG)))
            
            //console.log("VARIACE : ",variance)
            //console.log("STD : ",Math.sqrt(variance))

            valAVG.textContent = AVG
            valMED.textContent = median
            valVAR.textContent = variance
            valVAR.textContent = variance
            valSTD.textContent = Math.round(Math.sqrt(variance))

            result.style.display = "block"
            modeCalcul.style.display = "block"
        }
        readerFile.readAsText(myFile)
    }
})

fileInput.addEventListener('change',() => 
{
    const myFile = fileInput.files[0];
    const fileName = myFile.name;
    const extension = fileName.split('.').pop();

    if (extension === "txt") 
    {
        fileInput.classList.remove('is-invalid')
        fileInput.classList.add('is-valid')
        btnRead.disabled = false
    } 
    else 
    {
        fileInput.classList.remove('is-valid')
        fileInput.classList.add('is-invalid')
        result.style.display = "none"
        modeCalcul.style.display = "none"
        btnRead.disabled = true
    }
})

function calculAVG(elements) 
{
    let sum = 0;
    elements.forEach(element => 
    {
        if (isNaN(parseInt(element)))
        {
            alertDiv.style.display = "block"
            btnRead.disabled = true
            result.style.display = "none"
            throw new Error("Le tableau contient des éléments non numériques");
        }
        sum += parseInt(element)
    });
    return sum / elements.length
}

function calculMedian(elements)
{
    elements.sort((a,b) => a-b)
    console.log(elements)
    if(elements.length % 2 == 1)
    {
        console.log("== 1")
        return elements[Math.round((elements.length/2)-1)]
    }
    else if (elements.length % 2 == 0)
    {
        var sum = parseInt(elements[elements.length/2])+parseInt(elements[(elements.length/2)-1])

        return sum/2
    }
}

function calculVAR(elements,AVG){
    var sum = 0

    elements.forEach(element => {
        sum += Math.pow(parseInt(element)-AVG,2)
    })
    return sum/elements.length
    
}

toast.addEventListener('mouseenter',(e) => {
    if (idTimeOut != 0)
        clearTimeout(idTimeOut)
    
})

toast.addEventListener('mouseleave', (e) => {
    setTimeout(() => {
        hiddenToast()
    },3000)
})

function hiddenToast(){
   toast.classList.add("toast-move-left")
   setTimeout(() =>{
    toast.style.display ="none"
    toast.classList.remove("hidden-toast")
    toast.classList.remove("toast-move-left")
   },1800)
}