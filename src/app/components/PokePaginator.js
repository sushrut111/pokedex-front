import React, { useState, useEffect } from 'react';
import 'bulma/css/bulma.css'
import '../../App.css'
import PokeRow from '../components/PokeRow'
import SortableRow from '../components/SortableRows'
import * as api from '../api/Api'
import {toast} from "bulma-toast";


export default function PokePaginator(props){
    let i = 0;
    const {pages, handlePageChange} = props;
    const paginator = [];
    for(i=0;i<pages;i++){
        paginator.push(
        <div className="column"><a onClick={handlePageChange}>{i+1}</a></div>
        )
    }
    return <div className="columns"><div className="column">Pages</div>{paginator}</div>
}
