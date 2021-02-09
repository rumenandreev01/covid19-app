import React,{useState} from 'react';
import {Link} from 'react-router-dom';

 function CountryList() {

  const COUNTRIES_URL = `https://api.covid19api.com/summary`;

  const [countriesData, setCountriesData] = useState([]);

  const fetchData  = async () => {
    const fetchedData = await fetch(COUNTRIES_URL);
    const countriesData = await fetchedData.json();
    setCountriesData(countriesData);
  }

  const topFunction = () => {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
  }

    return (
       <div className="country-list">  
            <div>
                <button className="button" onClick={fetchData}>Load latest data</button>
            </div>
            {countriesData.Countries && countriesData.Countries.map((item, index)=>
                <h5 key={index}><Link onClick={topFunction} className="app-link" to={`${item.Slug}`}>{item.Country} {item.NewConfirmed}</Link></h5>)
            }
       </div>
    )
}

export default CountryList;