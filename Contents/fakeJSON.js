const faker = require('faker/locale/es')
const fs = require("fs")
const options = require(`../options/mysql.config`)
const knex = require(`knex`)

const database = knex(options)

    let productos = []

    for(let id=0; id<5; id++){
        const id= faker.datatype.number()
        const price= faker.datatype.number()
        const image= faker.random.image()

        productos.push({
            id,
            price,
            image
        })
    }

fs.writeFileSync("dataRandom_json", JSON.stringify(productos, null, 2))

class ContenedorRandom {
    Save = () => {
        try{
            database.schema.createTable(`productsRandom`, table => {
                table.increments(`id`);
                table.integer(`price`);
                table.string(`image`, 20);
            })
                .then(() => console.log(`create table`))
                .catch((err) => console.log(err))
                .finally(() => database.destroy())

            database(`productsRandom`).insert(productos)
                .then(response => console.log(response))
                .catch((err) => console.log(err))
                .finally(() => database.destroy())
        }catch(err){
            return {status: "error", message: err.message}
        }
    }
    getAll = async() =>{
            const select = await database.from(`productsRandom`).select(`*`)
            return select
    }
    getById = async(number) => {
            const select = await database.from(`productsRandom`).select(`*`).where(`id`, `=`, number)
            return select
    }
}


module.exports = ContenedorRandom