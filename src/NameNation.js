import { React,useEffect, useRef, useState } from "react";
import NameForm from "./NameForm";
function NameNation(){
    const [name, setName] = useState("")
    const [data, setData] = useState()
    const [country, setCountry] = useState()
    const [confidence,setConfidence] = useState()
    const apiKey = process.env.REACT_APP_NATIONALIZE_API_KEY;

    async function getNationality(e) {
        let response = await fetch(`https://api.nationalize.io?name=${name}`); //&apikey=${apiKey}
        let data = await response.json();
        if(data.count >0){            
            setData(data)
            setConfidence(data.country[0].probability *100)
            let ctryId = data.country[0].country_id
            let ctryResolve = await fetch(`https://api.worldbank.org/v2/country/${ctryId}?format=json`)
            let countryData = await ctryResolve.json();
            setCountry(countryData[1][0]);   
        }     
        else{
            alert("Name not found")
        }
        debugger
        console.log(data)
    }
    function handleNameChange(name){
        setName(name)
    }
    return (
        <div className="card shadow-sm border-0 px-3 rounded-2 mb-3 py-4 mx-auto mt-5 bg-light">
            <div className="card-header bg-transparent border-0 text-center text-uppercase mb-8">                
                 <h3>Predict nationality of a name</h3>
                 {data && <div className="mt-4">Confidence <h5 className="text text-primary">{Math.round(confidence)}%</h5> </div>}
              
            </div>
            {data && <span className="text text-success">{data.name} is from <span className="text text-warning">{country?.name}</span></span>}
            <div className="card-body">                
                    <NameForm name={name} getNationality= {getNationality} handleNameChange={handleNameChange}/>
            </div>
        </div>
    )
}

export default NameNation;