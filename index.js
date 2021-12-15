const express = require('express')
const cors = require('cors')
const open = require('open')
const mysql = require('mysql')
const app = express()

open('http://localhost:3001')

const connection = mysql.createConnection({
    host: 'assignmentdb.cqhux0lzwcuv.us-east-1.rds.amazonaws.com',
    user: 'admin',
    password: 'Scooby1990!',
    database: 'bookdb',
})

connection.connect()

app.use(cors())
app.use(express.json())
app.use(express.static('build'))

app.get('/book', (request, response) => {
    connection.query('SELECT * FROM books', (error, rows) => {
        if (error) throw error
        response.json(rows)
    })
})

app.post('/book', (request, response) => {
    const book = request.body
    connection.query(
        `INSERT INTO books (title, author, description) VALUES ('${book.title}', '${book.author}', '${book.description}');`,
        (error, result) => {
            if (error) throw error
            const newBook = {
                ...book,
                id: result.insertId,
            }
            response.status(201).json(newBook)
        }
    )
})

app.put('/book/:id', (request, response) => {
    const updatedBook = request.body
    const id = Number(request.params.id)
    connection.query(
        `UPDATE books 
        SET title = ?, author = ?, description = ? WHERE id = ?`,
        [updatedBook.title, updatedBook.author, updatedBook.description, id],
        (error) => {
            if (error) throw error
            response.status(200).json(updatedBook)
        }
    )
})

app.delete('/book/:id', (request, response) => {
    const id = Number(request.params.id)
    connection.query(`DELETE FROM books WHERE id=${id}`, (error) => {
        if (error) throw error
        response.status(204).end()
    })
})

const PORT = 3001
app.listen(PORT, () => {
    console.log(`server running on port ${PORT}`)
})
