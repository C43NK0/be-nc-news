const request = require('supertest')
const app = require("../app")
const db = require("../db/connection")
const seed = require("../db/seeds/seed")
const data = require("../db/data/test-data/index")

beforeEach(() => {
    return seed(data)
})

afterAll(() => {
    return db.end()
})

describe("GET /api/topics", () => {
    test("200: This endpoint should respond with an array of topic objects.", () => {
        return request(app)
        .get("/api/topics")
        .expect(200)
        .then(({body}) => {
            expect(body.message).toBe("all ok")
            expect(body.topics).toHaveLength(3)
            expect(body.topics).toBeInstanceOf(Array)
                body.topics.forEach((item) => {
                expect(item).toMatchObject({
                    slug: expect.any(String),
                    description: expect.any(String),
                })
            })
        })
    })
describe("Get /api/", () => {
    test("404: Should respond with the error message 'not found' for a non-existent endpoint", () => {
        return request(app)
        .get("/api/snotpics")
        .expect(404)
        .then(({ body }) => {
            expect(body.message).toBe("Not found");
            })
        })
    })
})