import axios from "axios";

class Busquedas {

    historial = ['Tegucigalpa', 'Madrid', 'San José'];

    constructor() {
        //TO DO: leer DB si existe
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
            'language': es
        }
    };

    async ciudad(lugar = '') {

        try {
            //petición http
            const instance = axios.create({
                baseURL: `https://api.mapbox.com/geocoding/v5/mapbox.places/${ lugar }.json`,
                params: this.paramsMaxBox()
            });
            const resp = await instance.get();
            return respuesta.data.features.map(lugar => ({ //de aquí se extraen los datos
                id: lugar.id,
                nombre: lugar.place_name,
                lng: lugar.center[0],
                lat: lugar.center[1],
            })); //se retorna un objeto
            // devolver todas las ciudades de esta ciudad.

        } catch (error) {
            return [];
        }

    }

}

export { Busquedas };