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
            expect(body.article).toHaveProperty("created_at")
            expect(body.article.article_id).toBe(1)
            expect(body.article).toMatchObject
            ({
                title: "Living in the shadow of a great man",
                topic: "mitch",
                author: "butter_bridge",
                body: "I find this existence challenging",
                votes: 100,
                article_img_url: "https://images.pexels.com/photos/158651/news-newsletter-newspaper-information-158651.jpeg?w=700&h=700",
            })
        })
    })
    test("200: responds with the third article when passed an article_id of 3", () => {
        return request(app)
        .get("/api/articles/3")
        .expect(200)
        .then(({ body }) => {
            expect(body.article.article_id).toBe(3)
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
        .get("/api/articles/100000")
        .expect(404)
        .then(({ body }) => {
            expect(body.message).toBe("Not found");
        })
    })

})

describe("Get /api/articles", () => {
    test("200: responds with an articles array of article objects with the relevant properties, sorted by date in descending order and without a body property", () => {
        return request(app)
        .get("/api/articles")
        .expect(200)
        .then(({ body }) => {
            expect(body.articles).toBeInstanceOf(Array)
            expect(body.articles).toHaveLength(13)
            
            body.articles.forEach((item) => {
                expect(item).toHaveProperty("comment_count")})

                for (let i = 0; i < body.articles.length -1; i++){
                    let latest = new Date(body.articles[i].created_at);
                    let next = new Date(body.articles[i + 1].created_at);
                    console.log(latest, next)
                    expect(next.getTime()).toBeLessThanOrEqual(latest.getTime())
                }
            expect(body.articles).not.toHaveProperty("body")
            expect(body.articles[0].comment_count).toBe("2")
            expect(body.articles[12].comment_count).toBe("0")
            expect(body.articles[1]).toMatchObject
            ({
            author: 'icellusedkars',
            title: 'A',
            article_id: 6,
            topic: 'mitch',
            created_at: '2020-10-18T01:00:00.000Z',
            votes: 0,
            article_img_url: 'https://images.pexels.com/photos/158651/news-newsletter-newspaper-information-158651.jpeg?w=700&h=700',
            comment_count: '1'
            })
        })
    })
})
