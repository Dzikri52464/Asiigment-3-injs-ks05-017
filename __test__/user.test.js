const request = require('supertest');
const app = require('../app');

let token;
const PhotoData = {
  title: "test",
  caption: "test",
  image_url: "test.com",
}

describe('Router', () => {
    beforeAll(async () => {
        // Perform any setup tasks before all tests
        const res = await request(app)
                    .post('/users/register')
                    .send({
                      username: "user2",
                      email: "user2@mail.com",
                      password: "12345"
                    });
      });

      describe('login test', ()=>{
        it('login user status code 201', async()=>{
          const login = await request(app)
          .post('/users/login')
          .send({email:"user@mail.com", password:"12345"})
          expect(login.statusCode).toEqual(201)
          token = login.body
          console.log(token)
        });
      });

      describe('create photo', () => {
        it('Photo create if status code 201', async()=>{
                const res = await request(app)
                .post('/photos/create')
                .set( token)
                .send(PhotoData);
                expect(res.statusCode).toEqual(201);
                expect(typeof res.body).toEqual("object");
                expect(res.body).toHaveProperty("id");
                expect(res.body).toHaveProperty("title");
                expect(res.body).toHaveProperty("caption");
                expect(res.body).toHaveProperty("image_url");
                expect(res.body).toHaveProperty("UserId");
                expect(res.body).toHaveProperty("createdAt");
                expect(res.body).toHaveProperty("updatedAt");
            });
        it('should return an error if no authentication token is provided', async () => {
        const res = await request(app)
                    .post('/photos/create')
                    .send(PhotoData)
        expect(res.statusCode).toEqual(401);
        expect(res.body).toHaveProperty('error');
         });
      });
      
      describe('get all photos', () => {
        it('should return all the data photos if there is authentication', async () => {
            let res = await request(app)
                      .get('/photos')
                      .set( token);
        
            expect(res.statusCode).toEqual(200);
            expect(Array.isArray(res.body)).toBeTruthy();
        
            const x = res.body[0];
            expect(x).toHaveProperty('id');
            expect(x).toHaveProperty('title');
            expect(x).toHaveProperty('caption');
            expect(x).toHaveProperty('image_url');
            expect(x).toHaveProperty('UserId');
            expect(x).toHaveProperty('createdAt');
            expect(x).toHaveProperty('updatedAt');
            expect(x).toHaveProperty('User');
          });
        
          it('should return an error if no authentication token is provided', async () => {
            const res = await request(app)
                        .get('/photos');
        
            expect(res.statusCode).toEqual(401);
            expect(res.body).toHaveProperty('error');
          });
      });
      
      describe('get photo by id', () => {
        it('should return a photo if the ID exists', async () => {
            const photoId = 3; // Replace with the ID of the photo you want to retrieve
            const res = await request(app)
                        .get(`/photos/${photoId}`)
                        .set( token);
        
            expect(res.statusCode).toEqual(200);
            expect(res.body).toHaveProperty('id', photoId);
            expect(res.body).toHaveProperty('title');
            expect(res.body).toHaveProperty('caption');
            expect(res.body).toHaveProperty('image_url');
            expect(res.body).toHaveProperty('UserId');
            expect(res.body).toHaveProperty('createdAt');
            expect(res.body).toHaveProperty('updatedAt');
            // expect(res.body).toHaveProperty('User');
          });
        
          it('should return an error if the ID does not exist', async () => {
            const photoId = 999; // Replace with an ID that does not exist in the database
            const res = await request(app)
                        .get(`/photos/${photoId}`)
                        .set( token);
        
            expect(res.statusCode).toEqual(404);
            expect(res.body).toHaveProperty('error');
          });
        });
      
        afterAll(async () => {
          // destroy data users
          try {
            await User.destroy({ where: {} });
            await Photos.destroy({where: {}});
          } catch (error) {
            console.log(error);
          }
        });

    });
