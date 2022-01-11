import React, { useState, useEffect } from 'react'

import bookService from '../services/book'

// Reset values for the form
const clearedFormData = {
    id: null,
    title: null,
    author: null,
    description: null,
}

const Form = ({
    setSelectedBook,
    currentBook,
    setCurrentBook,
    books,
    setBooks,
}) => {
    const [title, setTitle] = useState(currentBook.title)
    const [author, setAuthor] = useState(currentBook.author)
    const [description, setDescription] = useState(currentBook.description)
    const [isDisabled, setIsDisabled] = useState(true)

    useEffect(() => {
        setTitle(currentBook.title)
        setAuthor(currentBook.author)
        setDescription(currentBook.description)

        // Only change the buttons disabled state after a currentbook is set by user
        currentBook.id ? setIsDisabled(false) : setIsDisabled(true)
    }, [currentBook])

    const titleInputHandler = (e) => {
        setTitle(e.target.value)
    }

    const authorInputHandler = (e) => {
        setAuthor(e.target.value)
    }

    const descriptionInputHandler = (e) => {
        setDescription(e.target.value)
    }

    // Handles adding a new book when Save New button is clicked
    const submitHandler = async (e) => {
        e.preventDefault()

        // Create new book object to be sent to the server
        const newBook = {
            title: title,
            author: author,
            description: description,
        }
        try {
            const { data } = await bookService.addBook(newBook)
            const newBooks = [...books, data]
            setBooks(newBooks) // Update the book list
            setCurrentBook(clearedFormData) // Reset the form inputs
        } catch (error) {
            console.log('Error: addBook', error)
        }
    }

    // Handles updating a book when save button is clicked
    const updateHandler = async (e) => {
        e.preventDefault()

        // Updated book object to be sent to the server
        const updatedBook = {
            ...currentBook,
            title: title,
            author: author,
            description: description,
        }
        try {
            await bookService.updateBook(currentBook.id, updatedBook)

            // Updates the book in the book list
            const newBooks = books.map((b) =>
                b.id === updatedBook.id ? updatedBook : b
            )

            setBooks(newBooks) // Updates the book list if the update is successfull
            setCurrentBook(clearedFormData) // Resets the form fields
        } catch (error) {
            console.log('Error: updateBook', error)
        }
    }

    // Handles deleting a book when delete button is clicked
    const deleteHandler = async (e) => {
        e.preventDefault()
        try {
            await bookService.deleteBook(currentBook.id)

            const newBooks = books.filter((b) => b.id !== currentBook.id) // New books array without deleted book
            setBooks(newBooks) // Updates the book list if the update is successfull
        } catch (error) {
            console.log('Error: deleteBook', error)
        }
        
        setCurrentBook(clearedFormData) // Reset the form
    }

    const clearSelectionHandler = (e) => {
        e.preventDefault()
        setCurrentBook(clearedFormData) // Reset the form
        setSelectedBook(null) // Reset the selected book state
    }

    return (
        <div className="form">
            <h3>Book Form: </h3>
            <form>
                <label>Title</label>
                <div>
                    <input
                        className="form-input"
                        type="text"
                        name="title"
                        value={title ? title : ''}
                        onChange={titleInputHandler}
                    />
                </div>
                <label>Author</label>
                <div>
                    <input
                        className="form-input"
                        type="text"
                        name="author"
                        value={author ? author : ''}
                        onChange={authorInputHandler}
                    />
                </div>
                <label>Description</label>
                <div>
                    <textarea
                        rows="3"
                        className="form-textarea"
                        name="description"
                        value={description ? description : ''}
                        onChange={descriptionInputHandler}
                    />
                </div>
                <div className="form-buttons">
                    <button
                        className="button"
                        disabled={!isDisabled}
                        onClick={submitHandler}
                    >
                        Save New
                    </button>
                    <button
                        className="button"
                        disabled={isDisabled}
                        onClick={updateHandler}
                    >
                        Save
                    </button>
                    <button
                        className="button"
                        disabled={isDisabled}
                        onClick={deleteHandler}
                    >
                        Delete
                    </button>
                    <button
                        className="button"
                        disabled={isDisabled}
                        onClick={clearSelectionHandler}
                    >
                        Clear book selection
                    </button>
                </div>
            </form>
        </div>
    )
}

export default Form
