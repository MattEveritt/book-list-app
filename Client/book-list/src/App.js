import React, { useState, useEffect } from 'react'

import Form from './components/Form'
import List from './components/List'
import bookService from './services/book'

const App = () => {
    const [currentBook, setCurrentBook] = useState({
        id: null,
        title: null,
        author: null,
        description: null,
    })
    const [books, setBooks] = useState([])
    const [selectedBook, setSelectedBook] = useState(null)

    //Fetch books from the server on first render only
    useEffect(() => {
        const getBooks = async () => {
            try {
                const { data } = await bookService.getBooks()
                setBooks(data)
            } catch (error) {
                console.log(error)
            }
        }
        getBooks()
    }, [])

    return (
        <div className="app">
            <Form
                setSelectedBook={setSelectedBook}
                currentBook={currentBook}
                setCurrentBook={setCurrentBook}
                books={books}
                setBooks={setBooks}
            />
            <List
                selectedBook={selectedBook}
                setSelectedBook={setSelectedBook}
                setCurrentBook={setCurrentBook}
                bookList={books}
            />
        </div>
    )
}

export default App
