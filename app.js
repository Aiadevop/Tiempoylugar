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

                //const lugarSeleccionado = lugares.find(l => l.id === id);

                //Datos del clima.
                //const clima = await busquedas.climaLugar(lugarSeleccionado.lat, lugarSeleccionado.lon);
                const lat = -8.710090;
                const lon = 42.2857400;
                const name = 'Moaña'

                const lat2 = -9.93333;
                const lon2 = -84.08333;
                const name2 = 'San José'

                busquedas.agregarHistorial(name2);
                // Clima
                const clima = await busquedas.climaLugar(lat2, lon2);
                console.log(clima);
                //Mostrar resultados
                // console.log('\nInformación de la ciudad\n'.green);
                console.log('Ciudad: ', /*lugarSeleccionado.nombre*/ name2);
                console.log('Latitud: ', /*lugarSeleccionado.lat*/ lat2);
                console.log('Longitud: ', /*lugarSeleccionado.log*/ lon2);
                console.log('Temperatura:', clima.temp);
                console.log('Mínima:', clima.min);
                console.log('Máxima:', clima.max);
                // console.log('¿Cómo está el clima:', busquedas.climaLugar, '?');
                break;
            case 2:

                //busquedas.historialbienPresentado.forEach( (lugar, i) => {
                //     const idx = `${ i + 1 }.`.green;
                //     console.log(`${ idx } ${ lugar } `);
                //})

                const busqueda = new Busquedas();
                console.log(busqueda);

                busquedas.leerDB();

            case 0:

                break;
        }

        await inquirerPausa();

    } while (opt !== 0);

}

main();