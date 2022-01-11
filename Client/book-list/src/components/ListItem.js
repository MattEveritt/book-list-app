import React from 'react'

const ListItem = ({ selectedBook, setSelectedBook, book, setCurrentBook }) => {

    // Handles clicking on a book list item
    const clickHandler = () => {
        setSelectedBook(book.id)
        setCurrentBook(book)
    }

    return (
        <li key={book.id}>
            <div
                style={
                    selectedBook === book.id
                        ? { backgroundColor: '#99EE99' }
                        : { backgroundColor: '#C7F6B6' }
                }
                className="list-item"
                onClick={clickHandler}
            >
                <p>
                    Title: {book.title} <br></br> Author: {book.author}
                </p>
            </div>
        </li>
    )
}

export default ListItem
