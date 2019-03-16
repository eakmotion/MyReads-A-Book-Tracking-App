import React from 'react';
import PropTypes from 'prop-types';

const Book = ({ book, onUpdateBook }) => {
  return (
    <li>
      <div className='book'>
        <div className='book-top'>
          <div
            className='book-cover'
            style={{
              width           : 128,
              height          : 193,
              backgroundImage : `url(${book.imageLinks && book.imageLinks.thumbnail})`
            }}
          />
          <div className='book-shelf-changer'>
            <select
              defaultValue={book.shelf || 'none'}
              onChange={(e) => onUpdateBook(book, e.target.value)}>
              <option value='move' disabled>
                Move to...
              </option>
              <option value='currentlyReading'>Currently Reading</option>
              <option value='wantToRead'>Want to Read</option>
              <option value='read'>Read</option>
              <option value='none'>None</option>
            </select>
          </div>
        </div>
        <div className='book-title'>{book.title}</div>
        <div className='book-authors'>
          {book.authors && book.authors.map((author, i) => (i > 0 ? ', ' : '') + author)}
        </div>
      </div>
    </li>
  );
};

Book.propTypes = {
  book         : PropTypes.shape({
    shelf   : PropTypes.string,
    title   : PropTypes.string,
    authors : PropTypes.array
  }),
  onUpdateBook : PropTypes.func
};

export default Book;
