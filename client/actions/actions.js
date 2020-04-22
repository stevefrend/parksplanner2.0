import * as types from '../constants/actionTypes';
import axios from 'axios';
import Geocode from "react-geocode";







export const toggle = () => ({
    type: types.TOGGLE,
})

// Marker for markers rendering on Google Maps -----------------
export const setMarker = (markerData) => ({
    type: types.MARKER,
    payload: markerData
});

// Fetch Request for "marker" ^
// https://blog.logrocket.com/data-fetching-in-redux-apps-a-100-correct-approach-4d26e21750fc/

export const fetchMarkers = () => {
    return (dispatch) => {
        return axios.get('/getparks')
            .then((markerData) => {
                dispatch(setMarker(markerData.data));
            })
    }
}
// ---------------------------------------------------------------


// Render specific park information on park component ------------
export const parkInfo = (parkData) => ({
    type: types.PARKINFO,
    payload: parkData
});
// Fetch request for specific park information
export const fetchParkInfo = parkCode => {
    return (dispatch) => {
        return axios.get('/getparks/park', parkCode)
            .then((parkData) => {
                // console.log('actions/actions.js/39 - parkData:', parkData.data) // Checking the data type
                dispatch(parkInfo(parkData.data))
            })
    }
}
// ---------------------------------------------------------------

// Actions for sign-up/log-in:
export const signUp = signUpInfo => {
    return (dispatch) => {
        return axios.post('/signup', signUpInfo)
            .then(res => {
                // console.log('Sign-up successful.', 'res.data in actions.js:', res.data[0])
                dispatch(LOGGED_IN_USER(res.data[0]))
            })
    }
}

export const LOGGED_IN_USER = loggedInUserData => ({
    type: types.LOGGED_IN_USER,
    payload: loggedInUserData,
});

export const logIn = logInInfo => {
    return (dispatch) => {
        // console.log("logInInfo in actions.js:", logInInfo);
        return axios.get('/login', { params: { info: logInInfo } })
            .then(res => {
                // console.log('log-in res in actions.js:', res.data.username);
                dispatch(LOGGED_IN_USER(res.data.username));
            })
    }
}

// ---------------------------------------------------------------
// Two below update location
export const SET_LOCATION = (location) => ({
    type: types.SET_LOCATION,
    payload: location
});

export const setLocation = location => {
    Geocode.setApiKey("AIzaSyCMa2NoaFNvhZB_5f7-37JVulI-Ej-AwzM");
    
    return (dispatch) => {
        return Geocode.fromAddress(location).then(
            response => {
                const { lat, lng } = response.results[0].geometry.location;
                console.log(lat, lng);
                dispatch(SET_LOCATION([lat,lng]))
                
            },
            error => {
                console.error(error);
            }
        );
    }
};


