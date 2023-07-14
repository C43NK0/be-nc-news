const db = require("../db/connection")


exports.fetchTopics = () => {
        return db.query(`SELECT * FROM topics;`).then((result) => {
            return result.rows
        });

}

exports.fetchArticlesById = (id) => {
    return db.query(`SELECT * FROM articles WHERE article_id = $1`, [id])
    .then(({ rows }) => {
        if (rows.length === 0) {
            return Promise.reject({ status: 404, message: "Not found"})
        }
        return rows[0];
    })
}

exports.fetchArticles = () => {
    
    return db.query(`SELECT author, title, article_id, topic, created_at, votes, article_img_url,
                    (SELECT COUNT(article_id)
                    FROM comments
                    WHERE article_id = articles.article_id)
                    AS comment_count FROM articles 
                    ORDER BY created_at DESC;`).then((result) => {
        return result.rows
    })
}

exports.fetchCommentsById = (id) => {
    
    return db.query(`SELECT * FROM comments
                    WHERE article_id = $1
                    ORDER BY created_at DESC`, [id])
                    
    .then(({ rows }) => {
        if (rows.length === 0) {
            return Promise.reject({ status: 404, message: "Not found"})
        }        
        return rows
        }) 
}

exports.putComments = (username, comment, id) => {

    return db.query(`
    INSERT INTO comments (author, body, article_id)
    VALUES ($1, $2, $3)
    RETURNING *;`, [username, comment, id])
    .then(({ rows }) => {
        if (rows.length === 0) {
            return Promise.reject({ status: 404, message: "Not found"})
        }        
        return rows[0]
        }) 
}

exports.updateArticlesById = (body, articleId) => {

    return db.query(`
    UPDATE articles
    SET votes = votes + $1
    WHERE article_id = $2
    RETURNING *;`, [body, articleId])
    .then(({ rows }) => {
        if (rows.length === 0) {
            return Promise.reject({ status: 404, message: "Not Found"})
        }
        return rows[0]
    })
}