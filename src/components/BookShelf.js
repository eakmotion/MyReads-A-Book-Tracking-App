import React from 'react';
import Book from './Book';
import PropTypes from 'prop-types';

const BookShelf = ({ shelf, books, onUpdateBook }) => {
  let bookList = shelf ? books.filter((book) => book.shelf === shelf) : books;

  return (
    bookList &&
    bookList.map((book) => <Book key={book.id} book={book} onUpdateBook={onUpdateBook} />)
  );
};

BookShelf.propTypes = {
  shelf        : PropTypes.string,
  book         : PropTypes.shape({
    id    : PropTypes.number,
    shelf : PropTypes.string
  }),
  onUpdateBook : PropTypes.func
};

export default BookShelf;
