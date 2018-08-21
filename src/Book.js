import React, { Component } from 'react'; 

class Book extends Component {
    render() {
        let bookThumbnail = this.props.book.imageLinks  
                          ? this.props.book.imageLinks.thumbnail   //use thumbnail
                          : '';                                    //if not, use empty string
        return (
            /*hardcoded components copied from App.js to be replaced with dynamically genarated by React*/
            <div className="book">          
                <div className="book-top">
                    <div
                        className="book-cover"
                        style={{
                        width: 128,
                        height: 193,
                        backgroundImage: `url("${bookThumbnail}"`
                        }}>
                    </div>
                    <div className="book-shelf-changer">
                        <select value="move" 
                                onChange={  //passed from App.js->MainPage.js->Book.js
                                    (event) => this.props.updateShelf(  //call on droplist select
                                        this.props.book, event.target.value
                                    )                        
                                }
                                value={this.props.currentShelf} //show the books current shelf in the droplist
                        >
                        {/*values fetched as a strings by the event.target.value on droplist select: */} 
                            <option value="move" disabled>Move to...</option> 
                            <option value="currentlyReading">Currently Reading</option>
                            <option value="wantToRead">Want to Read</option>
                            <option value="read">Read</option>
                            <option value="none">None</option>
                        </select>
                    </div>
                </div>
                <div className="book-title">{this.props.book.title}</div>
                <div className="book-authors">{this.props.book.authors}</div>
            </div>
        );
    }
}

export default Book;