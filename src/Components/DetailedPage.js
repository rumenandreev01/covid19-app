import React, {useState,useEffect} from 'react';
import Moment from 'react-moment';
import History from './History';


export default function DetailedPage({match}) {   
   
    useEffect(()=>{
        const fetchItem = async () => {      
           
            let yesterday = new Date()
            yesterday.setDate(yesterday.getDate()-1)
            let yesterdayToISO = yesterday.toISOString();
            let dateForQuery = yesterdayToISO.substring(0, yesterdayToISO.length-14)+"T00:00:00Z";  
            
            const fetchItemVar = await fetch(`https://api.covid19api.com/live/country/${match.params.country}/status/confirmed/date/${dateForQuery}`);
            const item = await fetchItemVar.json();
            
            setCountry(item)
        }
        fetchItem();
    },[match.params.country])

    const [country,setCountry] = useState([])
    const [showHistory,setShowHistory] = useState(false);
    const [historyButtonText,setHistoryButtonText] = useState("Show History");

    const toggleViewHistory = () => {
        setShowHistory(!showHistory);
        if (historyButtonText === "Show History")
        {
            setHistoryButtonText("Hide History");
        } else {
            setHistoryButtonText("Show History");
        }
    }

    return (
        <div className="detailed-page">
            <h4>Detailed Information</h4>
            {country.map((day,index)=><div className="detailed-info-section" key={day.index}><p>Day: <Moment format="DD.MM.YYYY">{day.Date}</Moment></p> <p>Confirmed cases: {day.Confirmed}</p> <p>Active cases: {day.Active}</p><p> Deaths: {day.Deaths}</p> <p>Recovered people: {day.Recovered}</p></div>)}
            <button className="button" onClick={toggleViewHistory}>{historyButtonText}</button>
            {showHistory && <History country={match.params.country}></History>}
        </div>
    )
}
