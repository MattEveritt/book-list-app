import axios from "axios";

const baseUrl = '/book'

const getBooks = () => {
    return axios.get(baseUrl)
}

const addBook = (newBook) => {
    return axios.post(baseUrl, newBook)
}

const updateBook = (id, updatedBook) => {
    return axios.put(`${baseUrl}/${id}`, updatedBook)
}

const deleteBook = (id) => {
    return axios.delete(`${baseUrl}/${id}`)
}

const bookService = {
    getBooks,
    addBook,
    updateBook,
    deleteBook
}

export default bookService