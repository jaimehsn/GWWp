let chai = require("chai")
let chaiHttp = require("chai-http")
const e = require("express")

chai.should()

const url = "http://localhost:8080"


chai.use(chaiHttp)

describe("Auth TEST", () => {

    describe("POST /api/auth", () => {
        const body = {
            email: "jaimehsn@gmail.com",
            password: "123qweASD?",
        }
        const bodyUserNotFound = {
            email: "noexiste@nada.hola",
            password: "123qweASD?",
        }
        const incorretUserPassword = {
            email: "jaimehsn@gmail.com",
            password: "aqawefweww?",
        }
        
        it("Loging test SUCCESS", (done) => {
            chai.request(url)
                .post("/api/auth")
                .send(body)
                .end((err, response) => {
                    if (err) console.log(err)
                    response.should.have.status(200)
                    response.body.should.have.property('token')

                    done()
                })
        })

        it("Loging test USER NOT FOUND", (done) => {
            chai.request(url)
                .post("/api/auth")
                .send(bodyUserNotFound)
                .end((err, response) => {
                    if (err) console.log(err)
                    response.should.have.status(404)
                    response.body.should.include({message: "User not found"})
                    done()
                })
        })

        it("Loging test INCORRET USER PASS", (done) => {
            chai.request(url)
                .post("/api/auth")
                .send(incorretUserPassword)
                .end((err, response) => {
                    if (err) console.log(err)
                    response.should.have.status(403)
                    response.body.should.include({message: "Incorrect password"})
                    done()
                })
        })


    })

})