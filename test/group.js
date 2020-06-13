let chai = require("chai")
let chaiHttp = require("chai-http")


chai.should()

const url = "http://localhost:8080"
const tokenRe = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJqYWltZWhzbkBnbWFpbC5jb20iLCJpYXQiOjE1OTE5OTcyODcsImV4cCI6MTU5MzIwNjg4N30.ncxMONR-CNBUCQLZdNXfwmSI5KmOyhf4Jp24FqlRwTM"
const aleatorio = Math.floor(Math.random() * 1000) + 1

chai.use(chaiHttp)

describe("Group TEST", () => {
    describe("GET /api/groups", () => {
        let body = {
            name: 'test',
        }
        let bodyPete = {
            name: 'test',
            peta: "peta"
        }

        it("Create group test SUCCESS", (done) => {
            chai.request(url)
                .get("/api/groups")
                .set({ 'authorization': tokenRe })
                .send(body)
                .end((err, response) => {
                    if (err) console.log(err)
                    response.should.have.status(200)
                    response.body.should.to.be.an('array')

                    done()
                })
        })

        it("Create group test BAD REQUEST", (done) => {
            chai.request(url)
                .get("/api/groups")
                .set({ 'authorization': tokenRe })
                .send(bodyPete)
                .end((err, response) => {
                    if (err) console.log(err)
                    response.should.have.status(400)
                    response.body.should.include({ message: "Bad request." })

                    done()
                })
        })
    })

    describe("POST /api/groups", () => {
        let body = {
            grpName: aleatorio,
        }

        let bodyEx = {
            grpName: 'test',
        }

        it("Create group test SUCCESS", (done) => {
            chai.request(url)
                .post("/api/groups")
                .set({ 'authorization': tokenRe })
                .send(body)
                .end((err, response) => {
                    if (err) console.log(err)
                    response.should.have.status(200)
                    response.body.should.include({ message: "Added user." })

                    done()
                })
        })

        it("Create group test BAD REQUEST", (done) => {
            chai.request(url)
                .post("/api/groups")
                .set({ 'authorization': tokenRe })
                .send(bodyEx)
                .end((err, response) => {
                    if (err) console.log(err)
                    response.should.have.status(400)
                    response.body.should.include({ message: "Bad Request." })

                    done()
                })
        })
    })

    describe("PUT /api/groups", () => {

        let body = {
            oldName: "test",
            newName: "test",
        }
        let bodyRan = {
            oldName: "ñalskjdfña",
            newName: "test",
        }

        let bodyPeta = {
            oldName: "ñalskjdfña",
            newName: "test",
            peta:"peta"
        }

        it("Update group test SUCCESS", (done) => {
            chai.request(url)
                .put("/api/groups")
                .set({ 'authorization': tokenRe })
                .send(body)
                .end((err, response) => {
                    if (err) console.log(err)
                    response.should.have.status(200)
                    response.body.should.include({ message: "Group update successful." })

                    done()
                })
        })

        it("Update group test NOT FOUND", (done) => {
            chai.request(url)
                .put("/api/groups")
                .set({ 'authorization': tokenRe })
                .send(bodyRan)
                .end((err, response) => {
                    if (err) console.log(err)
                    response.should.have.status(404)
                    response.body.should.include({ message: "Not found Group with Name." })

                    done()
                })
        })

        it("Update group test BAD REQUEST", (done) => {
            chai.request(url)
                .put("/api/groups")
                .set({ 'authorization': tokenRe })
                .send(bodyPeta)
                .end((err, response) => {
                    if (err) console.log(err)
                    response.should.have.status(400)
                    response.body.should.include({ message: "Bad request." })

                    done()
                })
        })
    })

    describe("DELETE /api/groups", () => {
        let body = {
            grpName: `${aleatorio}`,
            
        }
        let bodyNot = {
            grpName: `${aleatorio}ASDFAS`,
            
        }

        it("Delete group test SUCCESS", (done) => {
            chai.request(url)
                .delete("/api/groups")
                .set({ 'authorization': tokenRe })
                .send(body)
                .end((err, response) => {
                    if (err) console.log(err)
                    response.should.have.status(200)
                    response.body.should.include({ message: "Group delete successful." })

                    done()
                })
        })

    })


})