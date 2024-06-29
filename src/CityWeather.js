import {React, useRef,useEffect,useState} from "react";
import { useGeolocated } from "react-geolocated";

function CityWeather(){

    const { coords, isGeolocationAvailable, isGeolocationEnabled } = useGeolocated({
                                                                    positionOptions: {
                                                                        enableHighAccuracy: false,
                                                                    },
                                                                    userDecisionTimeout: 5000,
                                                                });
        
    const [weatherData, setWeatherData] = useState()
    const [city,setCity] = useState("");
    const [message,setMessage] = useState("");
    const [loading, setLoading] = useState(false)
    const apiKey = process.env.REACT_APP_WEATHER_API_KEY;

    const currentLocation = useRef({
        lat:"",
        lng:""
    });

    useEffect(()=>{
        const msg = !isGeolocationAvailable ? "Your browser does not support Geolocation to show current location weather"
                                            : !isGeolocationEnabled ? "Geolocation is not enabled to show current location weather":"";
        if( msg ===""){
            currentLocation.current = {
                lat: coords?.latitude,
                lng: coords?.longitude,
            }
            if(currentLocation.current.lat && currentLocation.current.lng){
                getWeather(undefined);
            }
        }
        else {
            setMessage(msg)
        }
    },[coords]);

    console.log(coords)

    //Get the weather from api
    async function getWeather(e){
        e?.preventDefault();
        if(!city  && !currentLocation.current.lng){
            alert("Please enter city");
            return;
        } 
        const q = !city? currentLocation.current.lat !=="" && currentLocation.current.lng !==""? `${currentLocation.current.lat},${currentLocation.current.lng}`:alert("Enter location") :city
        setLoading(true)
        debugger
        const response = await fetch(`http://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${q}`)
        const data = await response.json()
        if(data.error){
            alert("Error in getting weather info. Please try again latter");
            return;
        }
         
        setWeatherData(data);
    }
    function handleCity(city){
        setCity(city);
    }
    return(
        <div className="card shadow-sm border-0 px-3 rounded-2 mb-3 py-4 mx-auto mt-5 bg-light">
            <div className="card-header bg-transparent border-0 text-center text-uppercase mb-8">                
                <h3>City weather</h3>
                {(message !=="" && !weatherData) && <p>{message}</p> }
                {weatherData && (<div className="mt-4">
                <h5>{weatherData.location.name}, {weatherData.location.country}</h5>
                <img src={weatherData.current.condition.icon} alt="weather icon" />
                <p>Temperature: {weatherData.current.temp_c} °C</p>
                <p>Condition: {weatherData.current.condition.text}</p> </div>)}
            </div>
            <div className="card-body">    
                <form className="mt-4 mb-1" onSubmit={(e)=> getWeather(e)}>
                    <div className="form-group mb-3">
                        <input className="form-control" placeholder="Enter city name" type="text" value={city} onChange={(e)=> handleCity(e.target.value)}            />
                    </div>
                    <p className="text-center mb-0">
                        <button onClick={(e)=> getWeather(e)} className="btn btn-primary btn-lg w-100 text-uppercase" value="Submit"> Get Weather </button>
                    </p> 
                </form>
            </div>
        </div>
    )
}

export default CityWeather;