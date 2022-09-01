import express, { Router } from "express";
import { promises as fs, write } from "fs";

const { readFile, writeFile } = fs;

const router = express.Router();

//Comparer Function Ascending    
function GetSortOrderAscending(prop) {
    return function (a, b) {
        if (a[prop] > b[prop]) {
            return 1;
        } else if (a[prop] < b[prop]) {
            return -1;
        }
        return 0;
    }
}
//Comparer Function Descending
function GetSortOrderDescending(prop) {
    return function (a, b) {
        if (a[prop] > b[prop]) {
            return -1;
        } else if (a[prop] < b[prop]) {
            return 1;
        }
        return 0;
    }
}

router.get("/", async (req, res, next) => {
    try {
        const data = JSON.parse(await readFile(global.fileName));

        let marcas = [];
        for (let index = 0; index < data.length; index++) {
            marcas.push(data[index].brand);
        }

        marcas.sort(GetSortOrderAscending("brand")); //Pass the attribute to be sorted on   

        res.send(marcas);
        logger.info("GET /marcas");
    } catch (err) {
        next(err);
    }
});

router.get("/maisModelos", async (req, res, next) => {
    try {
        const array = JSON.parse(await readFile(global.fileName));

        for (let index = 0; index < array.length; index++) {
            array[index].modelsQuantity = array[index].models.length
        }

        array.sort(GetSortOrderDescending("modelsQuantity"))

        let maisModelosList = [];
        maisModelosList.push(array[0].brand);

        for (let index = 1; index < array.length; index++) {
            if (array[index].modelsQuantity === array[0].modelsQuantity) {
                maisModelosList.push(array[index].brand);
            } else {
                break;
            }
        }

        res.send(maisModelosList);
        logger.info("GET /marcas/maisModelos");
    } catch (err) {
        next(err);
    }
});

router.get("/menosModelos", async (req, res, next) => {
    try {
        const array = JSON.parse(await readFile(global.fileName));

        for (let index = 0; index < array.length; index++) {
            array[index].modelsQuantity = array[index].models.length
        }

        array.sort(GetSortOrderAscending("modelsQuantity"))

        let menosModelosList = [];
        menosModelosList.push(array[0].brand);

        for (let index = 1; index < array.length; index++) {
            if (array[index].modelsQuantity === array[0].modelsQuantity) {
                menosModelosList.push(array[index].brand);
            } else {
                break;
            }
        }

        res.send(menosModelosList);
        logger.info("GET /marcas/menosModelos");
    } catch (err) {
        next(err);
    }
});

router.get("/maisModelos/:x", async (req, res, next) => {
    try {
        const array = JSON.parse(await readFile(global.fileName));

        for (let index = 0; index < array.length; index++) {
            array[index].modelsQuantity = array[index].models.length
        }

        array.sort(GetSortOrderDescending("modelsQuantity"))
        console.log(array);

        let maisModelosList = [];

        let index = 0;
        let qnt = parseInt(req.params.x)

        while (index < qnt) {
            console.log(index);
            console.log(req.params.x);
            maisModelosList.push(array[index].brand + " - " + array[index].modelsQuantity );
            index++;
        }

        res.send(maisModelosList);
        logger.info("GET /marcas/maisModelos/:x");
    } catch (err) {
        next(err);
    }
});

router.get("/menosModelos/:x", async (req, res, next) => {
    try {
        const array = JSON.parse(await readFile(global.fileName));

        for (let index = 0; index < array.length; index++) {
            array[index].modelsQuantity = array[index].models.length
        }

        array.sort(GetSortOrderAscending("modelsQuantity"))
        console.log(array);

        let menosModelosList = [];

        let index = 0;
        let qnt = parseInt(req.params.x)

        while (index < qnt) {
            console.log(index);
            console.log(req.params.x);
            menosModelosList.push(array[index].brand + " - " + array[index].modelsQuantity );
            index++;
        }

        res.send(menosModelosList);
        logger.info("GET /marcas/menosModelos/:x");
    } catch (err) {
        next(err);
    }
});

router.post("/listaModelos", async (req, res, next) => {
    try {
        let brand = req.body;

        if (brand == null) {
            throw new Error("Informar a Marca é obrigatório");
        }

        const array = JSON.parse(await readFile(global.fileName));

        let modelos = [];
        for (let index = 0; index < array.length; index++) {
            if(array[index].brand.toLowerCase() == brand.nomeMarca.toLowerCase()) {
                for (let index2 = 0; index2 < array[index].models.length; index2++) {
                    modelos.push(array[index].models[index2]);                
                }
                break;
            }
        }

        res.send(modelos);
        logger.info("GET /marcas/listaModelos");
    } catch (err) {
        next(err);
    }
});

router.use((err, req, res, next) => {
    logger.error(`${req.method} ${req.baseUrl} - ${err.message}`);
    res.status(400).send({ error: err.message });
});

export default router;
