import { faker } from '@faker-js/faker';

    const generateProduct = ()=>{
        const product = {
            nombre: faker.commerce.productName(),
            precio: faker.datatype.number(),
            foto: faker.image.abstract()
        }
        return product // acá devuelvo ese producto de faker 
    }


const arrayProducts = ()=>{
    const products = [] //declaro el array vacío
        let cinco = 5
        for(let i = 0; i < cinco; i++){
            products.push(generateProduct()); // pusheo a mi array cada producto que se genere 
        }
    return products // devuelvo el array 
}

export default arrayProducts







    
