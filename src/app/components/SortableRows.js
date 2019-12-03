import React, { useState, useEffect } from 'react';
import arrayMove from 'array-move';
import 'bulma/css/bulma.css'
import SortableList from '../containers/SortableContainer'

const SortableComponent = (props) => {
  const {data, deleteCategory, active, saveNewRankings} = props;
  const [items, setItems] = useState([]);
  const [ischanged, setIschanged] = useState(false);
  const onSortEnd = ({oldIndex, newIndex}) => {
    if(oldIndex == newIndex){
      return;
    }
    setIschanged(true);
    let temp_array = arrayMove(items, oldIndex, newIndex);
    setItems(temp_array);
};
const restorePrevious = () => {
  
  const temp_array = [...items];
  temp_array.sort((a,b)=>{
    return a.old_rank - b.old_rank;
  });
  setIschanged(true);
  setItems(temp_array);

}
const saveNewOrder = () => {
  const temp_array = items;
  temp_array.forEach((el,i) => {
      el.old_rank = el.current_rank;
      el.current_rank = i;      
  }); 
  saveNewRankings(temp_array);
}
useEffect(()=>{
    setIschanged(false);
    data.sort((a,b)=>{
      return a.current_rank - b.current_rank;
    });
    setItems(data);
},[data]);

useEffect(()=>{
    console.log(items);
},[items]);

  return(
    <div>
        <div className="columns">
          <div className="column">
            <a onClick={restorePrevious}>Restore previous order</a>
          </div>
          <div className="column">
            <a onClick={()=>deleteCategory()}>Delete this category</a>
          </div>
        </div>
        <SortableList items={items} onSortEnd={onSortEnd} />
        {ischanged?<button className="button is-info is-rounded Category-button" onClick={saveNewOrder}>Save New Rankings</button>:null}
    </div>
  ); 

  
}

export default SortableComponent;