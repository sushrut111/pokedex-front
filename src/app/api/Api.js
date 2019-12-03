import Config from './Config'
import Pokemons from './Pokemons'
export const getPokedata = () => {
    return Pokemons;
}
  
export const getCategories = async() => {
    try{
        const response = await fetch(Config.backend_url+'categories/',{
            method: 'GET', 
            });
        if(response.status === 200){
          const data = await response.json();
        //   console.log(data);
          return data;
    
        }
        else{
            console.log(response.status)
        }
        return false;
      }
      catch(e){
        console.log(e);
        return false;
      }
    
}

export const addOrCreateCategory = async(data) => {
    let cid = data.cid?data.cid:null;

    if(data.newcat){
        cid = await createNewCategory(data.name);
        if(!cid){
            return false;
        }
    }
    // console.log("here");
    const allAsyncResults = []

    for (const item of data.pokemons) {
        const resp = await addPokemonToCategory(cid, item)
        allAsyncResults.push(resp)
    }
    const resp = {};
    if(allAsyncResults.indexOf(409)!=-1){
        resp['status'] = true;
        resp['msg'] = "One or more pokemons are already in the category. Skipped!"
    }else if(allAsyncResults.indexOf(201)!=-1){
        resp['status'] = true;
    }
    else{
        resp['status'] = false;

    }
    return resp;
}

export const saveNewRankings = async(data) => {
    try{
        const response = await fetch(Config.backend_url+"pokemon/",{
            method: "PUT",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
  
        });
        if(response.status === 202){
            return true;
        }
        else{
            console.log(response.status);
            return false;
        }
    }
    catch(e){
        console.log(e);
        return false;
    }
}

export const deleteCategory = async(cid) => {
    try{
        const response = await fetch(Config.backend_url+'categories/'+cid+'/',{
            method: "DELETE",
        });
        if(response.status===204){
            return true;
        }
        else{
            console.log(response);
            return false;
        }
    }
    catch(e){
        console.log(e);
        return false;

    }
}

export const createNewCategory = async(name) => {
    try{
        const response = await fetch(Config.backend_url+'categories/',{
            method: "POST",
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              name: name,
            })
    
            });
        if(response.status === 201){
          const data = await response.json();
          return data.cid;
    
        }
        else{
            console.log(response.status)
        }
        return false;

    }
    catch(e){
        console.log(e);
        return false;
    }
}

export const addPokemonToCategory = async(cid, pid) =>{
    try{
        const response = await fetch(Config.backend_url+'pokemon/',{
            method: "POST",
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                pokeid: pid, 
                category: cid, 
                current_rank: 0, 
                old_rank: 0
            })
    
            });
        if(response.status === 201){
            
            return 201;
    
        }
        else if(response.status === 409){
            return 409;
        }
        else{
            return 0;
        } 
        
        

    }
    catch(e){
        console.log(e);
        return false;
    }
    
}