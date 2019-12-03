import React, { useState, useEffect } from 'react';
import 'bulma/css/bulma.css'
import '../../App.css'
export default function PokeRow(props){
    const {data, checkChecked} = props;
    const [checked, setChecked] = useState(false);
    const handleCheck = (e) => {
        setChecked(!checked);
    }
    useEffect(()=>{
        checkChecked(data.id, checked);
    },[checked])
    return(
        <article className="media">
            <div className="media-left">
                <div className="level-item">
                        <input type="checkbox" checked={checked} onChange={handleCheck}/>
                </div>
            </div>
            <figure className="media-left">
                <p className="image is-64x64">
                    <img src={data.ThumbnailImage}/>
                </p>
            </figure>
            <div className="media-content">
                <div className="level">
                    <div className='Pokemon-name'>{data.name}</div>
                </div>
                <div className="level">
                    <div>
                        {data.type?data.type.map((oneType, i)=>{
                        return (<span key={i} className="tag is-light is-rounded">{oneType}</span>)
                        }):null}
                    </div>
                    
                </div>
                <div className="level">
                    <div className="columns">
                        <div className="column is-half">
                            <div className="level prop-title">Abilities</div>
                            <div className="level">{data.abilities?data.abilities.map((ability, i)=>{return (<span key={i} >{ability}, </span>)}):null}</div>
                        </div>
                        <div className="column is-half">
                            <div className="level prop-title">Weakness</div>
                            <div className="level">{data.weakness?data.weakness.map((oneWeakness, i)=>{return (<span key={i}>{oneWeakness}, </span>)}):null}</div>
                        </div>
                    </div>
                </div>


            </div>
        </article>

        )
    }



/*

ThumbnailAltText: "Slowbro"
ThumbnailImage: "https://assets.pokemon.com/assets/cms2/img/pokedex/detail/080.png"
abilities: ["Shell Armor"]
collectibles_slug: "slowbro"
featured: "true"
height: 79
id: 80
name: "Slowbro"
number: "080"
slug: "slowbro"
type: (2) ["water", "psychic"]
weakness: (5) ["Ghost", "Dark", "Grass", "Electric", "Bug"]
weight: 264.6
*/
    
    