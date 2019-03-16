import React from 'react';
import { Link } from 'react-router-dom';
import BookShelf from './BookShelf'

const Search = ({ searchBooks, error, updateBook, updateSearchQuery }) => {
  return (
    <div className='search-books'>
      <div className='search-books-bar'>
        <Link to='/'>
          <button className='close-search'>Close</button>
        </Link>
        <div className='search-books-input-wrapper'>
          <input
            type='text'
            placeholder='Search by title or author'
            onChange={(e) => updateSearchQuery(e.target.value)}
          />
        </div>
      </div>
      <div className='search-books-results'>
        <ol className='books-grid'>
          {!error && searchBooks.length > 0 ? (
            <BookShelf books={searchBooks} onUpdateBook={updateBook} />
          ) : (
            <h3>There's no books. Try with another keyword.</h3>
          )}
        </ol>
      </div>
    </div>
  );
};

export default Search;
