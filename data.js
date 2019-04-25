export class Data{
    constructor(){
    }
     
    async getData(){
        let reponse
        await fetch('http://hp-api.herokuapp.com/api/characters')
        .then(async function(response){
            reponse = await response.text()
        })
        return JSON.parse(reponse)
    }
}