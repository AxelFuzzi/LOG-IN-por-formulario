import { faker } from '@faker-js/faker';
import fs from 'fs'

const regenerateProduct = ()=>{

    let products = []

    for (let i = 1; i <= 5; i++){

        const nombre = faker.commerce.productName()
        const precio = faker.datatype.number()
        const foto = faker.image.abstract()

        products.push({
            nombre: nombre,
            precio: precio,
            foto: foto
        })
    }
    return products
}

const generatedData = regenerateProduct();

//fs.writeFileSync('data.json', JSON.stringify(generatedData))
fs.writeFileSync('data.json', JSON.stringify(generatedData, null, '\t'))