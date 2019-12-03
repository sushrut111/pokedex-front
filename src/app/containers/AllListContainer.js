import React, { useState, useEffect } from 'react';
import 'bulma/css/bulma.css'
import '../../App.css'
import PokeRow from '../components/PokeRow'
import SortableRow from '../components/SortableRows'
import PokePaginator from '../components/PokePaginator'
import * as api from '../api/Api'
import {toast} from "bulma-toast";


export default function PokeContainer(props){
    const {pokeData, handleChecked} = props;
    const [start, setStart] = useState(0);

    const number_items = pokeData.length;
    const per_page = 100;
    const pages = number_items/per_page;
    const handlePageChange = (e) => {
        const requested_page = parseInt(e.target.text);
        console.log(requested_page);
        setStart((requested_page-1)*100+1);
    }
    return (
        <div>
            <PokePaginator pages={pages} handlePageChange={handlePageChange}/>
            {pokeData?pokeData.slice(start,start+100).map((pokemon)=>{
            return (
                    <PokeRow key={pokemon.id} data={pokemon} checkChecked={handleChecked}/>
                )
                }):null

            }
        </div>
    )

    }

