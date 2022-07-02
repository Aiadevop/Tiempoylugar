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
                // Buscar los lugares
                // Selecciona el lugar
                console.log('Escriba la ciudad: ');
                const termino = await leerInput('Introduzca la ciudad a buscar: ');
                const lugares = await busquedas.ciudad(termino);
                const id = await listarLugares(lugares);
                //if (id === '0') continue; //No hace nada solo continua.
                //Guardar en DB

                //busquedas.agregarHistorial(lugarSeleccionado.nombre);                

                const lugarSeleccionado = lugares.find(l => l.id === id);

                //Datos del clima.
                //const clima = await busquedas.climaLugar(lugarSeleccionado.lat, lugarSeleccionado.lon);
                const lat = -8.710090;
                const lon = 42.2857400;
                const name = 'Moaña'

                const lat2 = -9.93333;
                const lon2 = -84.08333;
                const name2 = 'San José'

                busquedas.agregarHistorial(name);
                // Clima
                const clima = await busquedas.climaLugar(lat, lon);
                console.log(clima);
                //Mostrar resultados
                // console.log('\nInformación de la ciudad\n'.green);
                console.log('Ciudad: ', /*lugarSeleccionado.nombre*/ name);
                console.log('Latitud: ', /*lugarSeleccionado.lat*/ lat);
                console.log('Longitud: ', /*lugarSeleccionado.log*/ lon);
                console.log('Temperatura:', clima.temp);
                console.log('Mínima:', clima.min);
                console.log('Máxima:', clima.max);
                // console.log('¿Cómo está el clima:', busquedas.climaLugar, '?');
                break;
            case 2:
                busquedas.historial.forEach((lugar, i) => {
                    const idx = `${ i + 1 }.`.green;
                    console.log(`${ idx } ${ lugar } `);
                })

                break;
            case 0:

                break;
        }

        await inquirerPausa();

    } while (opt !== 0);

}

main();