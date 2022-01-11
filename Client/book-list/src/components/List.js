import React from 'react'

import ListItem from './ListItem'

const List = ({ selectedBook, setSelectedBook, setCurrentBook, bookList }) => {
    return (
        <div className="list">
            <h3>Book List: </h3>
            <ul>
                {bookList.map((b) => (
                    <ListItem
                        key={b.id}
                        selectedBook={selectedBook}
                        setSelectedBook={setSelectedBook}
                        book={b}
                        setCurrentBook={setCurrentBook}
                    />
                ))}
            </ul>
        </div>
    )
}

export default List
