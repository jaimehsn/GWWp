let chai = require("chai")
let chaiHttp = require("chai-http")


chai.should()

const url = "http://localhost:8080"
const tokenRe = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJqYWltZWhzbkBnbWFpbC5jb20iLCJpYXQiOjE1OTE5OTcyODcsImV4cCI6MTU5MzIwNjg4N30.ncxMONR-CNBUCQLZdNXfwmSI5KmOyhf4Jp24FqlRwTM"
const otroTio = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJvdHJvdGlvQG90cm8uY29tIiwiaWF0IjoxNTkxOTk3Mjg3LCJleHAiOjE1OTMyMDY4ODd9.0RvtcX_8H1WdZRFMaEC2IHluJDV9vXcmNSWFwxdA85k"

chai.use(chaiHttp)

describe("User_group TEST", () => {
    describe("POST /api/add", () => {
        let body = {
            grpName: 'test',

        }

        it("Add to a group test ALREADY EXIST", (done) => {
            chai.request(url)
                .post("/api/add")
                .set({ 'authorization': tokenRe })
                .send(body)
                .end((err, response) => {
                    if (err) console.log(err)
                    response.should.have.status(400)
                    response.body.should.include({ message: "That User already be on this group." })
                    done()
                })
        })

        it("Add to a group test NOT FOUND", (done) => {
            chai.request(url)
                .post("/api/add")
                .set({ 'authorization': otroTio })
                .send(body)
                .end((err, response) => {
                    if (err) console.log(err)
                    response.should.have.status(401)
                    response.body.should.include({ message: "Invalid token." })
                    done()
                })
        })
    })

    describe("GET /api/listUsers", () => {
        it("List users of a group test SUCCESS", (done) => {
            chai.request(url)
                .get("/api/listUsers?grpName=test")
                .set({ 'authorization': tokenRe })
                .send()
                .end((err, response) => {
                    if (err) console.log(err)
                    response.should.have.status(200)
                    response.body.should.to.be.an('array')
                    done()
                })
        })
    })

    describe("GET /api/listGroups", () => {
        it("List groups of a user test SUCCESS", (done) => {
            chai.request(url)
                .get("/api/listGroups")
                .set({ 'authorization': tokenRe })
                .send()
                .end((err, response) => {
                    if (err) console.log(err)
                    response.should.have.status(200)
                    response.body.should.to.be.an('array')
                    done()
                })
        })
    })


})