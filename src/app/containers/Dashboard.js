import React, { useState, useEffect } from 'react';
import 'bulma/css/bulma.css'
import '../../App.css'
import PokeRow from '../components/PokeRow'
import PokeContainer from './AllListContainer'
import SortableRow from '../components/SortableRows'
import * as api from '../api/Api'
import {toast} from "bulma-toast";

function Dashboard() {

    const [categories, setCategories] = useState(['All']);
    const [allData, setAllData] = useState([]);
    const [active, setAcive] = useState('All')
    const [pokeData, setPokeData] = useState([]);
    const [currentTabData, setCurrentTabData] = useState([]);
    const [checkPokemons, updateCheckedPokemons] = useState([]);
    const [modalopen, setModalopen] = useState(false);
    const [selectcat, setSelectcat] = useState(null);
    const [newcat, setNewcat] = useState(false);
    const [newcatname, setNewcatname] = useState('');
    useEffect(()=>{
        loadPokeData();
    },[]);

    const showToast = (msg) => {
        toast({
            message: msg,
            duration: 2000,
            position: "top-right",
            closeOnClick: true,
            opacity: 1
          });
    }
    const handleSelectCat = (e) => {
        setSelectcat(e.target.value);
    }
    const handleNewCatName = (e) => {
        setNewcatname(e.target.value);
    }
   const handleTabChange = (e) => {
        setAcive(e.target.text);
        updateCheckedPokemons([]);
   }
   const handleRadioChange = (e) => {
       setNewcat(!newcat);
   }
   const toggleModal = () => {
    setNewcatname('');
    setModalopen(!modalopen);
    }

   const handleChecked = (id, checked) => {
        if(checked){
            updateCheckedPokemons(
                checkPokemons.filter(item => item != id).concat(id)
            );
        }
        else{
            updateCheckedPokemons(
                checkPokemons.filter(item => item != id)
            );
        }
   }

   const handleSubmit = async() => {
        let data = {};
        if(newcat){
            data = {
                newcat: newcat,
                name: newcatname,
                pokemons: checkPokemons
            }
        }
        else{
            data = {
                newcat: newcat,
                cid: selectcat,
                pokemons: checkPokemons
            }
        }
        const resp = await api.addOrCreateCategory(data);
        if(resp.status){
            if(resp.msg) showToast(resp.msg);
            else showToast("Pokemons added to category!");
            updateCheckedPokemons([]);
            loadPokeData();
            setModalopen(false);
        }
        else{
            showToast("Unable to process request!");
        }
        

   }
   const saveNewRankings = async(data) => {
        const resp = await api.saveNewRankings(data);
        if(resp){
            showToast("Updated the rankings!");
            loadPokeData();
        }
        else{
            showToast("Unable to update rankings!");
        }
   }

   const loadPokeData = async() => {
        const data = api.getPokedata();
        setPokeData(data);
        const categoriesData = await api.getCategories();
        setAllData(categoriesData);

   }

   useEffect(()=>{
       console.log("newcat = "+newcat);
       if(!newcat){
            setNewcatname('');
       }
   },[newcat]);
   useEffect(()=>{
        if(active=='All'){
            setCurrentTabData([]);
        }
        else{
            const temp_array = [];
            const cat_index = categories.indexOf(active) - 1;
            const curr_tab = allData[cat_index];
            curr_tab.pokemon.forEach(element => {
                temp_array.push(
                    {
                        pokeid: pokeData[element.pokeid-1].id,
                        image: pokeData[element.pokeid-1].ThumbnailImage,
                        name: pokeData[element.pokeid-1].name,
                        current_rank: element.current_rank,
                        old_rank: element.old_rank,
                        category: element.category,
                        cid: element.cid
                    }
                );
            });
            setCurrentTabData(temp_array);
        }
   },[active]);

   useEffect(()=>{
        const categories_array = ['All'];
        allData.forEach(element => {
            categories_array.push(element.name);
        });
        setCategories(categories_array);
   },[allData]);
   
   const deleteCategory = async() => {
        const cid = categories.indexOf(active) - 1;
        const resp = await api.deleteCategory(allData[cid].cid);
        if(resp){
            setAllData(allData.filter((_,i)=> i != cid));
            showToast("Deleted category "+active);
            setAcive(categories[cid]);
        }
        else{
            showToast("Unable to delete category "+active);
        }
   }
   return (
    <div className="Dashboard">
      <header className="App-header">
        <img src={require('../images/pokedox.jpg')} alt="logo" />
      </header>
        <div className="container">
            <div className='box'>
                <div className="tabs">
                    <ul>
                        {categories.map((category, i)=>{
                            return (<li key={i} className={category==active?'is-active':null}><a onClick={handleTabChange}>{category}</a></li>)
                        })}
                    </ul>
                </div>
                <div>
                    
                    {active=='All'?
                    <PokeContainer pokeData={pokeData} handleChecked={handleChecked}/>
                    :
                    <div>
                    
                    <SortableRow data={currentTabData} deleteCategory={deleteCategory} active={active} saveNewRankings={saveNewRankings} />

                    </div>
                    }

                </div>

            </div>
  
        </div>
        {checkPokemons.length>1&&active==='All'?<button className="button is-info is-rounded Category-button" onClick={toggleModal}>Add to category</button>:null}
        
        <div className={"modal "+(modalopen?"is-active":null)}>
            <div className="modal-background"></div>
            <div className="modal-content">
                <div className="modal-card">
                    
                    <section className="modal-card-body">
                                <div className="level">
                                    <input type="radio" name="answer" onChange={handleRadioChange} checked={!newcat}/>
                                    <div>Select an existing category</div>
                                    <div>
                                        <div className="select">
                                        <select onChange={handleSelectCat} disabled={newcat}>
                                            <option value={-1}>Select category</option>
                                            {allData.map((onerow, i)=>{
                                                return (<option key={i} value={onerow.cid}>{onerow.name}</option>)
                                            })}
                                            
                                        </select>
                                        </div>
                                    </div>
                                </div>
                                <div className="level">
                                    <input type="radio" name="answer" onChange={handleRadioChange} checked={newcat}/>
                                    <div>Create a new category</div>
                                    <div><input className="input is-primary" type="text" placeholder="Category name" onChange={handleNewCatName} value={newcatname} disabled={!newcat}/></div>

                                </div>
                    </section>
                    <footer className="modal-card-foot">
                        <button className="button is-success" onClick={handleSubmit}>Save changes</button>
                        <button className="button" onClick={toggleModal}>Cancel</button>
                    </footer>
                </div>
            </div>
            
        </div>      

    </div>
  );
}

export default Dashboard;
