const request = require('supertest');
const app = require('../../src/app');
const connection = require ('../../src/database/connection');

describe('ONG', () =>{
    beforeEach(async () =>{
        await connection.migrate.rollback();
        await connection.migrate.latest();
    });

    afterAll( async() =>{
        await connection.destroy();
    } );

    it ('should be able to create a new ONG', async () =>{
        const response = await request(app)
        .post('/ongs')
        // .set('Authorization' ,'umIdValido')  //caso precisse passar um header
        .send({
            name: "APAE",
            email: "contato@gmail.com",
            whatsapp: "4733664745",
            city: "Balneario Camboriu",
            uf: "SC"
        });

        expect(response.body).toHaveProperty('id');
        expect(response.body.id).toHaveLength(8);
    })


})