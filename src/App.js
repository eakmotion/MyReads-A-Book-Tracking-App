import React from 'react';
import * as BooksAPI from './BooksAPI';
import PropTypes from 'prop-types';
import './App.css';
import { Route } from 'react-router-dom';
import { Link } from 'react-router-dom';

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
            <select defaultValue={book.shelf} onChange={(e) => onUpdateBook(book, e.target.value)}>
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

const BookShelf = ({ shelf, books, onUpdateBook }) => {
  let bookList = shelf ? books.filter((book) => book.shelf === shelf) : books;

  return (
    bookList &&
    bookList.map((book) => <Book key={book.id} book={book} onUpdateBook={onUpdateBook} />)
  );
};

class BooksApp extends React.Component {
  static propTypes = {
    books : PropTypes.array
  };

  state = {
    books     : [],
    query     : '',
    shelfList : {}
  };

  updateBook = (book, shelf) => {
    BooksAPI.update(book, shelf).then((res) => {
      let newBooks = this.state.books.filter((a) => a.id !== book.id);
      book['shelf'] = shelf;
      newBooks.push(book);

      this.setState({
        books : newBooks
      });
    });
  };

  updateSearchQuery = (query) => {
    query &&
      BooksAPI.search(query).then((books) => {
        books.length > 0
          ? this.setState({
              books : books.error ? [] : books
            })
          : this.setState({
              books : []
            });
      });
  };

  clearSearchQuery = () => {
    this.updateSearchQuery('');
  };

  componentDidMount() {
    BooksAPI.getAll().then((books) => {
      this.setState({
        books
      });
    });
  }

  render() {
    return (
      <div className='app'>
        <Route
          exact
          path='/'
          render={() => (
            <div className='list-books'>
              <div className='list-books-title'>
                <h1>MyReads</h1>
              </div>
              <div className='list-books-content'>
                <div>
                  <div className='bookshelf'>
                    <h2 className='bookshelf-title'>Currently Reading</h2>
                    <div className='bookshelf-books'>
                      <ol className='books-grid'>
                        <BookShelf
                          books={this.state.books}
                          shelf='currentlyReading'
                          onUpdateBook={this.updateBook}
                        />
                      </ol>
                    </div>
                  </div>
                  <div className='bookshelf'>
                    <h2 className='bookshelf-title'>Want to Read</h2>
                    <div className='bookshelf-books'>
                      <ol className='books-grid'>
                        <BookShelf
                          books={this.state.books}
                          shelf='wantToRead'
                          onUpdateBook={this.updateBook}
                        />
                      </ol>
                    </div>
                  </div>
                  <div className='bookshelf'>
                    <h2 className='bookshelf-title'>Read</h2>
                    <div className='bookshelf-books'>
                      <ol className='books-grid'>
                        <BookShelf
                          books={this.state.books}
                          shelf='read'
                          onUpdateBook={this.updateBook}
                        />
                      </ol>
                    </div>
                  </div>
                </div>
              </div>
              <div className='open-search'>
                <Link to='/search'>
                  <button>Add a book</button>
                </Link>
              </div>
            </div>
          )}
        />
        <Route
          path='/search'
          render={() => (
            <div className='search-books'>
              <div className='search-books-bar'>
                <Link to='/'>
                  <button className='close-search'>Close</button>
                </Link>
                <div className='search-books-input-wrapper'>
                  <input
                    type='text'
                    placeholder='Search by title or author'
                    onChange={(e) => this.updateSearchQuery(e.target.value)}
                  />
                </div>
              </div>
              <div className='search-books-results'>
                <ol className='books-grid'>
                  {this.state.books && (
                    <BookShelf
                      books={this.state.books.filter(
                        (book) =>
                          book.title.toLowerCase().includes(this.state.query.toLowerCase()) ||
                          book.authors
                            .map((author) => author)
                            .toString()
                            .toLowerCase()
                            .includes(this.state.query.toLowerCase())
                      )}
                    />
                  )}
                </ol>
              </div>
            </div>
          )}
        />
      </div>
    );
  }
}

export default BooksApp;
