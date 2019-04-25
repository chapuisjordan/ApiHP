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
    let arraySelect = ["eye-select", "live-select", "sexe-select", "hair-select", "patronus-select", "house-select"]
    
    let po = 0
    categories.forEach(element => {
        let varSelect = document.getElementById(arraySelect[po])
        for (let i = 0; i < element.length; i++) {
            varSelect.options[varSelect.options.length] = new Option(element[i], element[i])
        }
        po++
    });

}
sendCategorie()

async function split(){
    let data = []
    if(!localStorage.getItem("dataStorage")){
        let result = await getData()
        result.forEach(element => {
            data.push(element)
        });
        // await randomCharacter(result)
    }else{
       data = JSON.parse(localStorage.getItem("dataStorage"))
    }
    return data
}

async function randomCharacter(){
    let allCharacter = await split()
    if(allCharacter.length == 25){
        let number =  Math.floor(Math.random() * Math.floor(24))
        let randomCharacter = allCharacter[number]
        localStorage.setItem("randomCharacter", JSON.stringify(randomCharacter));
    }else{
        console.log('Déjà choisi')
    }
}
randomCharacter()

async function displayImage(){
    let data = await split()
    if(data.length == 1){
        let img = document.createElement("img");
        img.className = "img-responsive";
        img.src = data[0].image;
        document.getElementById('container-image').appendChild(img);

        document.getElementById('text-win').innerHTML = 'You win, the answer was : ' + data[0].name
        // document.getElementById("demo").innerHTML = "Hello JavaScript";
    }else{
        data.forEach(element => {
            let img = document.createElement("img");
            img.className = "img-responsive";
            img.src = element.image;
            document.getElementById('container-image').appendChild(img);
        });
    }
    
}
displayImage()


async function getPoints(){
    let points
    if(!localStorage.getItem("points")){
        points = 0
    }else{
        points = localStorage.getItem("points")
    }
    document.getElementById('points').innerHTML = points
    return points
}

$(document).ready(async function(){

    async function getRandomCharacter(){
            await split()
            return localStorage.getItem("randomCharacter")
        }
        getRandomCharacter()
    
        $('#restart').click(function(){
            localStorage.clear()
            document.location.reload(true);
        })

     async function firstVerification(){
        let randomCharacter = JSON.parse(await getRandomCharacter())
        let points = await getPoints()
        points ++
        localStorage.setItem("points", points);

            $('#hair-btn').click(function(){
                if($("#hair-select").val() == randomCharacter.hairColour){
                    alert("Le personnage a bien les cheveux " + $("#hair-select").val())
                    verification('#hair-select', 'hairColour')
                }else{
                    alert("Le personnage n'a pas les cheveux " + $("#hair-select").val())
                    verificationFalse("#hair-select","hairColour")
                } 
            })
   
            $('#live-btn').click(function() {
                if($("#live-select").val() == JSON.stringify(randomCharacter.alive)){
                    alert("Le personnage est en vie ? " + $("#live-select").val())
                    verificationAlive('#live-select', 'alive')
                 }else{
                    alert("Le personnage est mort ? " + $("#live-select").val())
                    verificationAliveFalse("#live-select","alive")
                }
            });
   
            $('#eye-btn').click(function() {
                if($("#eye-select").val() == randomCharacter.eyeColour){
                    alert("Le personnage a bien les yeux " + $("#eye-select").val())
                    verification('#eye-select', 'eyeColour')
                }else{
                    alert("Le personnage n'a pas les yeux " + $("#eye-select").val())
                    verificationFalse("#eye-select","eyeColour")
                }
            });
            $('#sexe-btn').click(function() {
                if($("#sexe-select").val() == randomCharacter.gender){
                    alert("Le personnage est bien un/e " + $("#sexe-select").val())
                    verification('#sexe-select', 'gender')
                 }else{
                    alert("Le personnage n'est pas un/e " + $("#sexe-select").val())
                    verificationFalse("#sexe-select","gender")
                }
           });
            $('#patronus-btn').click(function() {
                if($("#patronus-select").val() == randomCharacter.patronus){
                    alert("Le personnage a comme patronus un/e " + $("#patronus-select").val())
                    verification('#patronus-select', 'patronus')
                 }else{
                    alert("Le personnage n'a pas comme patronus un/e " + $("#patronus-select").val())
                    verificationFalse("#patronus-select","patronus")
                }
           });
            $('#house-btn').click(function() {
                if($("#house-select").val() == randomCharacter.house){
                    alert("Le personnage fait partie de la maison " + $("#house-select").val())
                    verification('#house-select', 'house')
                 }else{
                    alert("Le personnage ne fait pas partie de la maison " + $("#house-select").val())
                    verificationFalse("#house-select","house")
                }
            });

    }
    firstVerification()
    
    /*********** Si la valeur de Alive est vraie **********/
    async function verificationAlive(varOne, varTwo){
        let dataStorage = await split()
        let testArray = []
        await dataStorage.forEach(async (element) => {            
            if($(varOne).val() != JSON.stringify(element[varTwo])){
                testArray.push(element)
            }
        })
        await newArray(dataStorage, testArray) // Regarder le await
        document.location.reload(true);   
    }

    /******** Si la valeur de Alive est fausse *******/
    async function verificationAliveFalse(varOne, varTwo){
        let dataStorage = await split()
        let testArray = []
        await dataStorage.forEach(async (element) => {
            if($(varOne).val() == JSON.stringify(element[varTwo])){
                testArray.push(element)
            }
        })
        await newArray(dataStorage, testArray)
        document.location.reload(true);
    }
  
    /************ Si la valeur entrée est la bonne ***********/
    async function verification(varOne, varTwo){
        if(varTwo == "alive"){

        }
        let dataStorage = await split()
        let testArray = []
        await dataStorage.forEach(async (element) => {
            console.log($(varOne).val())
            console.log(JSON.stringify(element[varTwo]))
            if($(varOne).val() != element[varTwo]){
                testArray.push(element)
            }
        })
        await newArray(dataStorage, testArray) // Regarder le await
        document.location.reload(true);
    }


    /******** Si la valeur entrée n'est pas la bonne *****************/
    async function verificationFalse(varOne, varTwo){       
        let dataStorage = await split()
        let testArray = []
        await dataStorage.forEach(async (element) => {
            console.log($(varOne).val())
            console.log(JSON.stringify(element[varTwo]))
            if($(varOne).val() == element[varTwo]){
                testArray.push(element)
            }
        })

        await newArray(dataStorage, testArray)
        document.location.reload(true);
    }
    
    /************** On créé un nouvel array ********************/
    async function newArray(dataStorage, testArray){
        testArray.forEach(element => {
            let index = dataStorage.indexOf(element)
            if (index > -1) {
                dataStorage.splice(index, 1);
            }
        });
        localStorage.setItem("dataStorage", JSON.stringify(dataStorage));
    }
})
