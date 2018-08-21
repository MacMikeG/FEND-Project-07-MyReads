import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import * as BooksAPI from './BooksAPI';
import Book from './Book';

class SearchPage extends Component {
    state = {
        query: '',
        searchedBooks: []   //books that match search query
    }

    updateQuery = (query) => {      //update the query state to the current
        this.setState({ 
            query: query            //search for multiple words
        })
        this.updateSearch(query);   
    }

    updateSearch = (query) => {     //fetch books to update SearchPage state
        if (query) {                //if there is a query, use API
            BooksAPI.search(query).then((searchedBooks) => {
                if (searchedBooks.error) {  //if there's an error- return an empty array
                    this.setState({ searchedBooks: [] });                    
                } else {            //if there isn't an error- return searchedBooks query
                    this.setState({ searchedBooks: searchedBooks })
                }
            })
        } else {                    //if there's no query- return an empty array
            this.setState({ searchedBooks: [] });
        }
    }

    render() {
        /*
        if (this.state.query) {
            const match = new ReqExp(escapeRegExp(this.state.query), 'i')
        } else {
            this.setState({ searchedBooks: this})
        }*/

        return (    /* hardcoded SearchPage content moved as separate component from App.js */
            <div className="search-books">
                <div className="search-books-bar">

                    <Link           //router
                        to='/'
                        className="close-search" 
                    > Close </Link>

                    <div className="search-books-input-wrapper">
                        <input type="text" 
                               placeholder="Search by title or author" 
                               value={this.state.query}    //update with state
                               onChange={(event) => this.updateQuery(event.target.value)}   //update SearchPage state based on what's typed in the search bar
                        />
                    </div>
                </div>

                <div className="search-books-results">
                    <ol className="books-grid">{
                        this.state.searchedBooks.map(searchedBooks => {
                            let defaultShelf = 'none';

                            this.props.books.map(book => (          //map through all the books fetched from API
                                book.id === searchedBooks.id ?      //if true, then book already exist 
                                defaultShelf = book.shelf:
                                ''
                            ));

                            return (
                                <li key={searchedBooks.id}>
                                    <Book book={searchedBooks}
                                          updateShelf={this.props.updateShelf}  
                                          currentShelf={defaultShelf}              //if no shelf's selected
                                    />
                                </li>
                            )    
                        }
                        )
                    }
                    </ol>
                </div>
            </div>
        );
    }
}

export default SearchPage;