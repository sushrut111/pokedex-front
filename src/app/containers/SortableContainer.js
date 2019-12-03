import React from 'react';
import {SortableContainer, SortableElement} from 'react-sortable-hoc';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const SortableItem = SortableElement(({value}) => (
    <article className="media">


    <figure className="media-left">
    <span className="icon">
    <i className="fas fa-bars"></i>
    </span>
    
    </figure>
    <figure className="media-left">
        <p className="image is-64x64">
            <img src={value.image}/>
        </p>
    </figure>
    <div className="media-content">
                <div className="level">
                    <div className='Pokemon-name'>{value.name}</div>
                </div>

            </div>
</article>
));


const SortableList = SortableContainer(({items}) => {
    return (
      <ul>
        
        {items.map((value, index) => (
          <SortableItem key={`item-${value.pokeid}`} index={index} value={value} />
        ))}
      </ul>
    );
  });
  
export default SortableList;