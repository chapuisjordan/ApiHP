async function getData(){
    let reponse
    await fetch('http://hp-api.herokuapp.com/api/characters')
    .then(async function(response){
        reponse = await response.text()
    })
    return JSON.parse(reponse)
}

async function categorie(){
    let categorieEye = []
    let categorieAlive = [true, false]
    let categorieGender = []
    let categorieHair = []
    let categoriePatronus = []
    let categorieHouse = []
    let character = await getData()
    for (let i = 0; i < character.length; i++) {
        const element = character[i];
        if(element.eyeColour != '' && categorieEye.includes(element.eyeColour) == false){
            categorieEye.push(element.eyeColour)
        }
        if(element.gender != '' && categorieGender.includes(element.gender) == false){
            categorieGender.push(element.gender)
        }
        if(element.hair != '' && categorieHair.includes(element.hairColour) == false){
            categorieHair.push(element.hairColour)
        }
        if(element.patronus != '' && categoriePatronus.includes(element.patronus) == false){
            categoriePatronus.push(element.patronus)
        }
        if(element.house != '' && categorieHouse.includes(element.house) == false){
            categorieHouse.push(element.house)
        }

    }
    return [categorieEye, categorieAlive, categorieGender, categorieHair, categoriePatronus, categorieHouse]
}

async function sendCategorie(){
    const categories = await categorie()
    // console.log(categories)
    let selectHair = document.getElementById("hair-select");
    for (let i = 0; i < categories[3].length; i++) {
        selectHair.options[selectHair.options.length] = new Option(categories[3][i], categories[3][i])            
    }

    let selectLive = document.getElementById('live-select')
    for (let a = 0; a < categories[1].length; a++) {
        selectLive.options[selectLive.options.length] = new Option(categories[1][a], categories[1][a])
        
    }

    let selectEye = document.getElementById('eye-select')
    for (let u = 0; u < categories[0].length; u++) {
        selectEye.options[selectEye.options.length] = new Option(categories[0][u], categories[0][u])            
    }
    let selectGender = document.getElementById('sexe-select')
    for (let z = 0; z < categories[2].length; z++) {
        selectGender.options[selectGender.options.length] = new Option(categories[2][z], categories[2][z])                        
    }
    let selectPatronus = document.getElementById('patronus-select')
    for (let t = 0; t < categories[4].length; t++) {
        selectPatronus.options[selectPatronus.options.length] = new Option(categories[4][t], categories[4][t])            
    }
    let selectHouse = document.getElementById('house-select')
    for (let o = 0; o < categories[5].length; o++) {
        selectHouse.options[selectHouse.options.length] = new Option(categories[5][o], categories[5][o])
        
    }
}
sendCategorie()



async function split(){
    let data = []
    console.log(localStorage.getItem)
    if(!localStorage.getItem("newDataStorage")){
        let result = await getData()
        result.forEach(element => {
            data.push(element)
        });
    }else{
       data = JSON.parse(localStorage.getItem("newDataStorage"))
    }
    console.log(data)
    return data
}

async function displayImage(){
    let data = await split()

    data.forEach(element => {
        var img = document.createElement("img");
        img.className = "img-responsive";
        img.src = element.image;
        document.getElementById('container-image').appendChild(img);
    });
    
    
}
displayImage()

