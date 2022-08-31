import express, { Router } from "express";
import { promises as fs, write } from "fs";

const { readFile, writeFile } = fs;

const router = express.Router();

//Comparer Function Ascending    
function GetSortOrderAscending(prop) {    
    return function(a, b) {    
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
    return function(a, b) {    
        if (a[prop] > b[prop]) {    
            return 1;    
        } else if (a[prop] < b[prop]) {    
            return -1;    
        }    
        return 0;    
    }    
}   

router.get("/", async (req, res, next) => {
    try {
        const data = JSON.parse(await readFile(global.fileName));

        let marcas = [];
        for(let index = 0 ; index < data.length ; index++){
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
        const data = JSON.parse(await readFile(global.fileName));

        for(let index = 0 ; index < array.length ; index++){
            array[index].modelsQuantity = array[index].models.length
        }

        array.sort(GetSortOrderAscending("modelsQuantity"))

        maisModelosList = [];
        maisModelosList.push(array[0]) ;

        for(let index = 1 ; index < array.length ; index++){
            if(array[index].modelsQuantity === array[0].modelsQuantity) {
                maisModelosList.push(array[index]) ;
            } else {
                break;
            }
        }

        res.send(data);
        logger.info("GET /marcas/maisModelos");
    } catch (err) {
        next(err);
    }
});

router.get("/menosModelos", async (req, res, next) => {
    try {
        const data = JSON.parse(await readFile(global.fileName));

        for(let index = 0 ; index < array.length ; index++){
            array[index].modelsQuantity = array[index].models.length
        }

        array.sort(GetSortOrderDescending("modelsQuantity"))

        menosModelosList = [];
        menosModelosList.push(array[0]) ;

        for(let index = 1 ; index < array.length ; index++){
            if(array[index].modelsQuantity === array[0].modelsQuantity) {
                menosModelosList.push(array[0]) ;
            } else {
                break;
            }
        }

        res.send(data);
        logger.info("GET /marcas/menosModelos");
    } catch (err) {
        next(err);
    }
});

router.get("/maisModelos/:id", async (req, res, next) => {
    try {
        const data = JSON.parse(await readFile(global.fileName));
        res.send(data);
        logger.info("GET /marcas/maisModelos/:id");
    } catch (err) {
        next(err);
    }
});

router.get("/menosModelos/:id", async (req, res, next) => {
    try {
        const data = JSON.parse(await readFile(global.fileName));
        res.send(data);
        logger.info("GET /marcas/menosModelos/:id");
    } catch (err) {
        next(err);
    }
});

router.get("/listaModelos", async (req, res, next) => {
    try {
        const data = JSON.parse(await readFile(global.fileName));
        res.send(data);
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
