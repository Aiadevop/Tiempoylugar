import { inquirerMenu, inquirerPausa } from "./helpers/inquirer.js";

const main = async() => {

    let opt = '';

    do {

        opt = await inquirerMenu();

        switch (opt) {
            case 1:
                console.log('Buscar ciudad');
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