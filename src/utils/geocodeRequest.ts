require('dotenv').config();

const axios = require('axios');

export default async function geocodeRequest(string: string) {

    const geocodeAPI = await axios.get('https://maps.googleapis.com/maps/api/geocode/json', {
        params: {
            address: string,
            key: process.env.GOOGLE_API,
        }
    });

    return geocodeAPI.data.results[0].geometry.location;
}