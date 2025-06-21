let IS_PROD = true;
const server = IS_PROD ?
    "https://nexusbackend-ocic.onrender.com" :

    "http://localhost:8000"


export default server;