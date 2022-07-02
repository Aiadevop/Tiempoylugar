import { inquirerMenu, inquirerPausa, leerInput, listarLugares } from "./helpers/inquirer.js";
import { Busquedas } from "./models/busquedas.js";
import 'dotenv/config';

//variables de entorno actuales.En process, estarían todas
//console.log(process.env.MAPBOX_KEY);

const main = async() => {

    let opt = '';
    const busquedas = new Busquedas();

    do {

        opt = await inquirerMenu();

        switch (opt) {
            case 1:
                console.log('Escriba la ciudad: ');
                const termino = await leerInput('Introduzca la ciudad a buscar: ');
                const lugares = await busquedas.ciudad(termino);
                const id = await listarLugares(lugares);
                const lugarSeleccionado = lugares.find(l => l.id === id);
                console.log({ lugarSeleccionado });
                //Buscar los lugares
                //Selecciona el lugar
                //Datos del clima.
                //Mostrar resultados
                console.log('\nInformación de la ciudad\n'.green);
                console.log('Ciudad: ', lugarSeleccionado.nombre);
                console.log('Latitud: ', lugarSeleccionado.lat);
                console.log('Longitud: ', lugarSeleccionado.lng);
                console.log('Temperatura: ', );
                console.log('T mínima: ', );
                console.log('T máxima: ', );
                break;
            case 2:
                console.log('Historial');
                break;
            case 0:

                break;
        }

        await inquirerPausa();

    } while (opt !== 0);

}

main();