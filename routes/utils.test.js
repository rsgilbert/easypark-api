const { hashPassword, signedToken, secret, tokenPayload, financeContactMatch } = require('./utils')

test('Generates hashed Password', async () => {
    const hash = await hashPassword('mypass')
    expect(hash).toBeTruthy()
    expect(hash.length).toBeGreaterThan(10)
})

test('Returns a signed token', () => {
    const token = signedToken({name: "Gil"})
    expect(token).toBeTruthy()
    expect(token.length).toBeGreaterThan(20)
})

test('Returns a long string as the secret', () => {
    const sec = secret()
    expect(sec).toBeTruthy()
    expect(sec.length).toBeGreaterThan(100)
})

test('Verifies token', async () => {
    const payload = await tokenPayload(signedToken({firstName:"Sidney"}))
    expect(payload.user).toEqual({firstName:"Sidney"})
})

test('Finds matching contact', () => {
    const email = "busulwa.ronald@finance.go.ug"
    const contacts = [{
        firstName: "Ronald",
        lastName: "Busulwa",
        middleName: null
    }, {
        firstName: "Ron",
        lastName: "Kenny",
        middleName: "Geof"
    }]
    const match = financeContactMatch(email, contacts)
    expect(match).toEqual({
        firstName: "Ronald",
        lastName: "Busulwa",
        middleName: null
    })
})