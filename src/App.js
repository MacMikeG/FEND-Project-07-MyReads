import React from 'react';
import { Route} from 'react-router-dom';


import SearchPage from './SearchPage';
import MainPage from './MainPage';

import * as BooksAPI from './BooksAPI'  //imports all available methods
import './App.css';


class BooksApp extends React.Component {
  state = {
    books: [] //array for the fetched books to map
  }

  componentDidMount() {
    BooksAPI.getAll().then((books) => { //fetch books from API
      this.setState({ books: books })   //update the books array
    })
  }

  updateShelf = (book, shelf) => {   // method updates the 'books' array state before passing it to the MainPage.js that will pass it to the Book.js
    BooksAPI.update(book, shelf)    //use the provided in API update method

    //refresh the page
    BooksAPI.getAll().then((books) => { //fetch books from API
      this.setState({ books: books })   //update the books array
    })
  }

  render() {
    return (  //pass the methods to the MainPage
      <div className="app">
        <Route exact path='/'   //router
                      render={() => (
            <MainPage books={this.state.books}  
                      updateShelf={this.updateShelf}
            />
          )}
        />

        <Route exact path='/search'   //router
                     render={() => (
            <SearchPage updateShelf={this.updateShelf}
                        books={this.state.books}
            />
          )}
        />
      </div>
    );
  }
  /*
  * TODO: Instead of using this state variable to keep track of which page
  * we're on, use the URL in the browser's address bar. This will ensure that
  * users can use the browser's back and forward buttons to navigate between
  * pages, as well as provide a good URL they can bookmark and share.
    
    state = {
      showSearchPage: false
    };
  */
}

export default BooksApp;
