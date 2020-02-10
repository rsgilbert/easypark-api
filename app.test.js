const request = require('supertest')
const app = require('./app')
const mongoose = require('mongoose')
const mongodb_test_uri = 'mongodb://localhost:27017/test'
const FinanceUsers = require('./models/financeUser')
const FinanceContacts = require('./models/financeContact')
const OtherContacts = require('./models/otherContact')

const testActivationToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImZpbmFuY2VFbWFpbCI6ImdpbGJlcnQuc3NlbnlvbmpvQGdtYWlsLmNvbSIsImhhc2hlZFBhc3N3b3JkIjoiJDJhJDEwJHppR0VjcjBqdmltWmZpSmVCc1J6OU9iLzNsNFgyeEpHMVNpek4xajZ1N1lZYkYzTkFDY0x5In0sImlhdCI6MTU3NTg3MzkwNCwiZXhwIjoxNTc4NDY1OTA0fQ.gp_ZpLobaYd6SpnQia2ufpkZ8prKpmk5aDTAWctEHpc'
const testContact = {
    firstName: 'Gilbert',
    lastName: 'Ssenyonjo'
}       

const testNewUser = {
    financeEmail: 'gilbert.ssenyonjo@gmail.com',
    password: 'new-user'
}     
const genAuthorization = (token) => `Bearer ${token}`

const createUser = async () => {
    await request(app).get(`/activate/${testActivationToken}`)
}
const createUserToken = async () => {
    await createUser()
    const res = await request(app)
        .post('/login')
        .send(testNewUser)
    return res.body
}

describe('Router Specification', () => {
    beforeAll(async () => {
        mongoose.connect(mongodb_test_uri)
    })       
    beforeEach(async () => {
        await FinanceUsers.deleteMany({ financeEmail: testNewUser.financeEmail })
        await FinanceContacts.deleteMany(testContact)
        await OtherContacts.deleteMany(testContact)
        await FinanceContacts.create(testContact)
        await OtherContacts.create(testContact)
    })
    afterAll(async (done) => {
        mongoose.disconnect(done)
    })

    describe('Test', () => {
        test('/test should suceed', async () => {
            const res = await request(app).get('/test')
            expect(res.statusCode).toBe(200)
            expect(res.body).toBe("Test Successful")
        })
    })

    describe('Registration', () => {    
        test('/register should succeed', async () => {
            const res = await request(app)
                .post('/register')
                .send(testNewUser)
            expect(res.statusCode).toBe(200)       
        })
    })
    
    describe('Activation', () => {
        test('/activate should succeed', async () => {
            const res = await request(app)
                .get(`/activate/${testActivationToken}`)
            expect(res.statusCode).toBe(200)        
        })    
    })

    describe('Login', () => {
        test('/login should return token', async () => {
            await createUser()
            const res = await request(app)
                .post('/login')
                .send(testNewUser)
            expect(res.statusCode).toBe(200)
            expect(res.body.length).toBeGreaterThan(200)
        })
    })

    describe('Contacts', () => {
        test('/finances should return a finance contact', async () => {
            const token = await createUserToken()
            const res = await request(app)
                .get('/finances')
                .set('Authorization', genAuthorization(token))
            expect(res.statusCode).toBe(200)
            expect(Object.keys(res.body.docs).length).toBe(1)
        })
        test('/others should return an other contact', async () => {
            const token = await createUserToken()
            const res = await request(app)
                .get('/others')
                .set('Authorization', genAuthorization(token))
            expect(res.statusCode).toBe(200)
            console.log(res.body)
            expect(Object.keys(res.body.docs).length).toBe(1)
        })
    })
    

    

})