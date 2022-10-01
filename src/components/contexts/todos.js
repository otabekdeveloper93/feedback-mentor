import {createContext,useState, useEffect} from 'react';
import array from '../../array';

export const TodosContext = createContext();

const TodosProvider = ({children}) => {

    const [data, setData] = useState(array);
    const [upvote, setUpvote]= useState(0);
    const [filterData, setFilterData] = useState(data);

    useEffect(() => {
        setFilterData(data)
    }, [data]);

    return (
        <TodosContext.Provider value={{data,setData,upvote,setUpvote,filterData,setFilterData}}>
            {children}
        </TodosContext.Provider>
    );
};


export default TodosProvider;