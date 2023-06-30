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
        return rows
        }) 
}