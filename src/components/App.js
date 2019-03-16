import React from 'react';
import * as BooksAPI from '../utils/BooksAPI';
import PropTypes from 'prop-types';
import '../App.css';
import { Route } from 'react-router-dom';
import Home from './Home';
import Search from './Search';

class BooksApp extends React.Component {
  static propTypes = {
    books : PropTypes.array
  };

  state = {
    books       : [],
    searchBooks : [],
    loading     : false,
    error       : null
  };

  componentDidMount() {
    this.setState({ loading: true });

    BooksAPI.getAll().then((books) => {
      this.setState({
        books,
        searchBooks : books,
        loading     : false
      });
    });
  }

  updateBook = (book, shelf) => {
    BooksAPI.update(book, shelf)
      .then(() => {
        let newBooks = this.state.books.filter((a) => a.id !== book.id);
        book['shelf'] = shelf;
        newBooks.push(book);

        this.setState({ books: newBooks });
      })
      .finally(() => alert(`${book.title} has been added to the shelf`));
  };

  updateSearchQuery = (query) => {
    query.length > 1
      ? BooksAPI.search(query.trim(), 20)
          .then((newBooks) => {
            newBooks.length > 0
              ? newBooks.error
                ? this.setState({
                    searchBooks : [],
                    error       : newBooks.error
                  })
                : this.setState({ searchBooks: newBooks })
              : this.setState({ searchBooks: [] });
          })
          .catch((error) => {
            this.setState({ error });
            console.error(error);
          })
      : this.setState({ searchBooks: this.state.books });
  };

  render() {
    if (this.state.loading) {
      return <h3>Loading...</h3>;
    }

    const { books, error, searchBooks } = this.state;

    return (
      <div className='app'>
        <Route exact path='/' render={() => <Home books={books} updateBook={this.updateBook} />} />
        <Route
          path='/search'
          render={() => (
            <Search
              searchBooks={searchBooks}
              error={error}
              updateBook={this.updateBook}
              updateSearchQuery={this.updateSearchQuery}
            />
          )}
        />
        <div id='footer'>
          <p>
            Udacity My Reads App by <a 
              href='https://github.com/eakmotion/MyReads-A-Book-Tracking-App' 
              target='_blank'>
              eakmotion
            </a>
          </p>
        </div>
      </div>
    );
  }
}

export default BooksApp;
