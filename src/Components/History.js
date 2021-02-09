import React,{useState,useEffect} from 'react';
import Moment from 'react-moment';


function History(props) {

    const [countryHistory,setCountryHistory] = useState([])
    const [refreshCount, setRefreshCount] = useState(0);


    useEffect(()=>{
        const fetchItem = async () => {      
            const fetchItemVar = await fetch(`https://api.covid19api.com/country/${props.country}/status/confirmed`)
            const item = await fetchItemVar.json();
            setCountryHistory(item.reverse());
        }
        fetchItem();
        
    },[props.country])

    const refresh = () => setRefreshCount(refreshCount + 1);

  
   
    function renderList(data){
       return data.map((day,index)=>
            <p key={index}>Day: <Moment format="DD.MM.YYYY">{day.Date}</Moment> Confirmed cases: {day.Cases}</p>
        )
    }

    function sortAscending() {
        const tempArray = countryHistory;
        tempArray.sort((a, b)=>(a.Cases > b.Cases) ? 1:-1);
        setCountryHistory(tempArray)
        refresh()
    }

    function sortDescending() {
        const tempArray = countryHistory;
        tempArray.sort((a, b)=>(a.Cases > b.Cases) ? -1:1);
        setCountryHistory(tempArray)
        refresh()       
    }

    return (
        <div className="history-list">
            <h4>History of Covid-19 in the country</h4>
            <button className="button" onClick={sortAscending}>Order by number of infected people (Ascending)</button>
            <button className="button" onClick={sortDescending}>Order by number of infected people (Descending)</button>
            {renderList(countryHistory)}          
        </div>
    )
}

export default History;