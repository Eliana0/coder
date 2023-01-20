const options = require(`../options/mysql.config`)
const knex = require("knex")

const database = knex(options)

let products = [
    {
    name: "Tacoss",
    foto: "https://th.bing.com/th/id/R.b9e921aeea76c1f79e4633e40543e0ee?rik=6rz2nNSRd7t3Ew&pid=ImgRaw&r=0",
    price: 2500,
    stock: 4
    },
]

class Contenedor {
    Save = () => {
        try{
            database.schema.createTable(`products`, table => {
                table.increments(`id`);
                table.string(`name`, 20);
                table.integer(`price`);
                table.integer(`stock`);
                table.string(`foto`, 20);
            })
                .then(() => console.log(`create table`))
                .catch((err) => console.log(err))
                .finally(() => database.destroy())

            database(`products`).insert(products)
                .then(response => console.log(response))
                .catch((err) => console.log(err))
                .finally(() => database.destroy())
        }catch(err){
            return {status: "error", message: err.message}
        }
    }
    getAll = async() =>{
            const select = await database.from(`products`).select(`*`)
            return select
    }
    getById = async(number) => {
            const select = await database.from(`products`).select(`*`).where(`id`, `=`, number)
            return select
    }
    updateById = async(number, body) => {
        try {
            const { name, foto, price, stock } = body;
            await database(`products`).where("id", number).update({
              name: `nombre`,
              foto: `url`,
              price: 500,
              stock: 5,
              });
            const select = this.getById(number);
            return select;
          } catch (error) {
            return error.message;
          }
    }
    deleteById = async(number) => {
            await database.from(`products`).where(`id`, `=`, number).del()
            return {message: `producto ${number} eliminado`}
    }
}

module.exports = Contenedor