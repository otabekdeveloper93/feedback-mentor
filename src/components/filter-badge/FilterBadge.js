import {useContext} from 'react';
import { TodosContext } from "../contexts/todos";
import TypeBadge from "../type-badge/TypeBadge";

import './filterBadge.scss';

const filterArray =[
    {
        id: 1,
        name: 'All'
    },
    {
        id: 2,
        name: 'UI'
    },
    {
        id: 3,
        name: 'UX'
    },
    {
        id: 4,
        name: 'Enhancement'
    },
    {
        id: 5,
        name: 'Bug'
    },
    {
        id: 6,
        name: 'Feature'
    }
]

const FilterBadge = () =>{

    const {data, setFilterData} = useContext(TodosContext);

    const handlerFilterFeedback = (evt) => {
        const elValue = evt.target.nextElementSibling.textContent.toLowerCase();

        if(elValue === "all"){
            setFilterData([...data])
        }else{
            const filterFeedback = data.filter(item => item.category.toLowerCase() === elValue);
            setFilterData([...filterFeedback]);
        }


    }

    return (
        <form className="type-filter">
            {filterArray.map(item =>{
                return (
                    <label className="type-filter_label" key={item.id}>
                        <input onClick={handlerFilterFeedback} className="visually-hidden type-filter_input_radio" type="radio" name="type" />
                        <TypeBadge className="ActiveRadio">{item.name}</TypeBadge>
                    </label>
                )
            })}
        </form>
    )
}
export default FilterBadge;