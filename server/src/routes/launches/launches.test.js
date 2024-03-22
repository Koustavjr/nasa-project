const request=require('supertest');
const app =require('../../app');
const {mongoConnect,mongoDisconnect}=require('../../services/mongo')
const{loadplanetsData}=require('../../models/planets.model')
describe('Launches API',()=>{

    beforeAll(async ()=>{
        await mongoConnect();
        await loadplanetsData();
    })

    afterAll(async ()=>{
        await mongoDisconnect();
    })
    describe("test GET /launched",()=>{
        test("It should respond with 200 success",async()=>{
            const response=await request(app).
            get('/v1/launches')
            .expect('Content-Type',/json/)
            .expect(200);
          //  expect(response).toBe(200);
        });
    });
    
    describe("test POST /launch",()=>{
        const completeLaunchData={
            mission:"ZTM",
            rocket:"NCC 155",
            launchDate:"January 4,2028",
            target:"Kepler-62 f"
        }
        const launchDataWithoutDate={
            mission:"ZTM",
            rocket:"NCC 155",
            target:"Kepler-62 f"
        }
        const launchDataWithInvalidDate={
            mission:"ZTM",
            rocket:"NCC 155",
            target:"Kepler-62 f",
            launchDate:"zoot",
            
        }
        test("It should respond with 201 created",async()=>{
        
            const response= await request(app)
            .post('/v1/launches')
            .send(completeLaunchData)
            .expect('Content-type',/json/)
            .expect(201);
            const responseDate=new Date(response.launchDate).valueOf();
            const requestDate=new Date(completeLaunchData).valueOf();
            expect(requestDate).toBe(responseDate);
            expect(response.body).toMatchObject(launchDataWithoutDate);
    
        });
    
        test("It should catch missing required properties",async()=>{
            const response = await request(app)
            .post('/v1/launches')
            .send(launchDataWithoutDate)
            .expect('Content-type',/json/)
            .expect(400);
    
            expect(response.body).toStrictEqual({
                error:"Missing required launch property"
            })
        });
        test("It should catch invalid date",async()=>{
            const response=await request(app).
            post('/v1/launches')
            .send(launchDataWithInvalidDate)
            .expect('Content-type',/json/)
            .expect(400);
    
            expect(response.body).toStrictEqual({
                error:'Invalid Launch Date',
            })
    
        });
    })
});


