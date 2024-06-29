import {React, useRef,useEffect,useState} from "react";
import { useGeolocated } from "react-geolocated";

function GetGeoLocation(){
    
    const { coords, isGeolocationAvailable, isGeolocationEnabled } =
        useGeolocated({
            positionOptions: {
                enableHighAccuracy: false,
            },
            userDecisionTimeout: 5000,
        });
        if(!isGeolocationAvailable) {
            console.log("Your browser does not support Geolocation")
        }
        else if (!isGeolocationEnabled){
            console.log( "Geolocation is not enabled")
        }
}

export default GetGeoLocation;