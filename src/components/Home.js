import React from 'react';
import { Link } from 'react-router-dom';
import BookShelf from './BookShelf'

const Home = ({ books, updateBook }) => {
  const bookShelf = [
    {
      id    : 1,
      name  : 'Currently Reading',
      value : 'currentlyReading'
    },
    {
      id    : 2,
      name  : 'Want to Read',
      value : 'wantToRead'
    },
    {
      id    : 3,
      name  : 'Read',
      value : 'read'
    }
  ];

  return (
    <div className='list-books'>
      <div className='list-books-title'>
        <h1>MyReads</h1>
      </div>
      <div className='list-books-content'>
        <div>
          {bookShelf.map((shelf) => (
            <div className='bookshelf' key={shelf.id}>
              <h2 className='bookshelf-title'>{shelf.name}</h2>
              <div className='bookshelf-books'>
                <ol className='books-grid'>
                  <BookShelf books={books} shelf={shelf.value} onUpdateBook={updateBook} />
                </ol>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className='open-search'>
        <Link to='/search'>
          <button>Add a book</button>
        </Link>
      </div>
    </div>
  );
};

export default Home;
