import axios from "axios";
import fs from 'fs';

class Busquedas {

    historial = ['Tegucigalpa', 'Madrid', 'San Pepito'];
    dbPath = './db/database.json';

    constructor() {
        //TO DO: leer DB si existe
        this.leerDB();
    }

    //se extraen los parametros de MapBox del método ciudad para que
    //quede más limpio.
    get paramsMaxBox() {
        return {
            'access-token': process.env.MAPBOX_KEY,
            //se cambió por el token, pq el token se introdujo como variable de entorno
            //con el archivo .env
            //EL TOKEN NO FUNCIONA PQ HAY QUE PAGAR
            'limit': 5,
            'language': 'es'
        }
    }

    get paramsOpenWeather() {
        return {
            appid: process.env.OPENWEATHER_KEY,
            units: 'metric',
            lang: 'es'
        }
    }

    get historialbienPresentado() {
        return this.historial; //.map(lugar => {

        //     let palabras = lugar.split(','); //por donde corto
        //     palabras = palabras.map(p => p[0].toUpperCase() + p.substring(1));

        //     return palabras.join(' ')

        //})
    }

    async ciudad(lugar = '') {

        try {
            // Petición http
            const intance = axios.create({
                baseURL: `https://api.mapbox.com/geocoding/v5/mapbox.places/${ lugar }.json`,
                params: this.paramsMapbox
            });

            const resp = await intance.get();
            return resp.data.features.map(lugar => ({
                id: lugar.id,
                nombre: lugar.place_name,
                lng: lugar.center[0],
                lat: lugar.center[1],
            }));

        } catch (error) {
            return [];
        }
    }

    async climaLugar(lat, lon) {

        try {

            const instance = axios.create({
                baseURL: `https://api.openweathermap.org/data/2.5/weather`,
                params: {...this.paramsOpenWeather, lat, lon }
            })

            const resp = await instance.get();
            const { name, weather, main } = resp.data;

            return {
                name: name, //No se pq no carga el nombre.
                desc: weather[0].description,
                min: main.temp_min,
                max: main.temp_max,
                temp: main.temp
            }

        } catch (error) {
            console.log("No se encontraron los datos del clima");
        }

    }

    agregarHistorial(lugar = '') {
        //TO DO: No volver a guardar repetidos.
        //unshift añade el nombre al inicio del array, sería push si lo quisieramos al revés.
        if (this.historial.includes(lugar)) {
            return 'Ya existe'; //Como ya existe el lugar solo retorna.
        }
        this.historial.unshift(lugar);

        //Grabar en un archivo de texto.
        this.guardarDB();

    }

    guardarDB() {

        const payload = {
            historial: this.historial
        };

        fs.writeFileSync(this.dbPath, JSON.stringify(this.historial));

    }

    leerDB() {

        if (!fs.existsSync(this.dbPath)) return;

        // const info = fs.readFileSync(this.dbPath, { encoding: 'utf-8' });
        // const data = JSON.parse(info);

        // this.historial = data.historial;

        const info = fs.readFileSync(this.dbPath, { encoding: 'utf-8' });
        const data = JSON.parse(info);
        console.log(data);



    }

}

export { Busquedas };