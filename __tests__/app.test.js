const request = require('supertest')
const app = require("../app")
const db = require("../db/connection")
const seed = require("../db/seeds/seed")
const data = require("../db/data/test-data/index")
const endpointsData = require("../endpoints.json")

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

describe("Get /api", () => {
    test("200: Should return a JSON object with all available endpoints", () => {
        return request(app)
        .get("/api")
        .expect(200)
        .then(({ body }) => {
            expect(body.endpoints).toEqual(endpointsData)
                      
        
        })
    })
})

describe("Get /api/articles/:article_id", () => {
    test("200: responds with the first article with the relevant properties when passed an article_id of 1", () => {
        return request(app)
        .get("/api/articles/1")
        .expect(200)
        .then(({ body }) => {
            expect(body.article).toBeInstanceOf(Object)
            expect(body.article).toHaveProperty("author")
            expect(body.article).toHaveProperty("title")
            expect(body.article).toHaveProperty("topic")
            expect(body.article).toHaveProperty("article_id")
            expect(body.article).toHaveProperty("created_at")
            expect(body.article).toHaveProperty("votes")
            expect(body.article).toHaveProperty("article_img_url")
            expect(body.article).toMatchObject
            ({
                title: "Living in the shadow of a great man"
            })
        })
    })
    test("200: responds with the third article when passed an article_id of 3", () => {
        return request(app)
        .get("/api/articles/3")
        .expect(200)
        .then(({ body }) => {
            expect(body.article).toMatchObject
            ({
                title: "Eight pug gifs that remind me of mitch"
            })
        })
    })
})
describe("Get /api/articles/:article_id", () => {
    test("400: should respond with an error when article_id is an invalid type", () => {
        return request(app)
        .get("/api/articles/!!!FIVE!!!")
        .expect(400)
        .then(({ body }) => {
            expect(body.message).toBe("Bad request");
        })
    })
    test("404: should respond with appropriate error when article_id is valid but does not exist", () => {
        return request(app)
        .get("/api/articles/100")
        .expect(404)
        .then(({ body }) => {
            expect(body.message).toBe("Not found");
        })
    })

})
