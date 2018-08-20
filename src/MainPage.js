import React, { Component } from 'react';     //Component is enough
import {Link} from 'react-router-dom';
import Book from './Book.js';
//filter method allows to use the condition: if the shelf is Currently Reading then display the book

class MainPage extends Component {
    render() {
        return(
            /* hardcoded MainPage content moved as separate component from App.js */
            <div className="list-books">
            <div className="list-books-title">
              <h1>MyReads</h1>
            </div>
            <div className="list-books-content">
              <div>
                <div className="bookshelf">
                  <h2 className="bookshelf-title">Currently Reading</h2>
                  <div className="bookshelf-books">
                    <ol className="books-grid">
                      {                           
                        this.props.books  
                          .filter(book => book.shelf === 'currentlyReading')  //create a new array from the 'books' array
                          .map(book => (  //create a list element for each element of the new array
                            <li key={book.id}>
                              <Book 
                                book={book} //allows to use element as props in Book.js
                                updateShelf={this.props.updateShelf} //method passed from App.js
                                currentShelf='currentlyReading'/>
                            </li>
                          ))
                        }
                    </ol>
                  </div>
                </div>
                <div className="bookshelf">
                  <h2 className="bookshelf-title">Want to Read</h2>
                  <div className="bookshelf-books">
                    <ol className="books-grid">
                    {                           
                      this.props.books  //create a new array from the 'books' array
                        .filter(book => book.shelf === 'wantToRead')
                        .map(book => (  //create list element for each element of the new array
                          <li key={book.id}>
                            <Book 
                              book={book} //allows to use element as props in Book.js
                              updateShelf={this.props.updateShelf} //method passed from App.js
                              currentShelf='wantToRead'
                            />
                          </li>
                        ))
                      }
                    </ol>
                  </div>
                </div>
                <div className="bookshelf">
                  <h2 className="bookshelf-title">Read</h2>
                  <div className="bookshelf-books">
                    <ol className="books-grid">
                    {                           
                      this.props.books  //create a new array from the 'books' array
                        .filter(book => book.shelf === 'read')
                        .map(book => (  //create list element for each element of the new array
                          <li key={book.id}>
                            <Book 
                              book={book} //allows to use element as props in Book.js
                              updateShelf={this.props.updateShelf} //method passed from App.js
                              currentShelf='read'
                            />
                          </li>                      
                        ))
                      }
                    </ol>
                  </div>
                </div>
              </div>
            </div>
            <div className="open-search">
              <Link to="/search"> Add a book
              </Link>
            </div>
          </div>
        );
    }
}

export default MainPage;