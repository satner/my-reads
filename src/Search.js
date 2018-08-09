import React from 'react'
import { Link } from 'react-router-dom'
import * as BooksAPI from './BooksAPI'
import Books from './Books'

class Search extends React.Component {
  state = {
    bookTitle: '',
    books: [],
  }

  showBooks(bookTitle) {
    this.setState({bookTitle})
    BooksAPI.search(bookTitle).then((books) => Array.isArray(books) ? this.setState({books}) : this.setState({books: []}))
  }

  render() {
   return  (
    <div className="search-books">
      <div className="search-books-bar">
        <Link className="close-search" to='/'>Close</Link>
          <div className="search-books-input-wrapper">
            <input type="text" placeholder="Search by title or author" value={this.state.bookTitle} onChange={(event) => this.showBooks(event.target.value)}/>
          </div>
      </div>
      <div className="search-books-results">
        <ol className="books-grid">
          {this.state.books.map(b => (
              this.props.shelfBooks.filter( bb => bb.id === b.id).length === 1  ?
                <Books key={b.id}
                       bookTitle={b.title} 
                       bookAuthor={b.authors}
                       bookImage={b.hasOwnProperty('imageLinks') ? b.imageLinks.smallThumbnail : ''}
                       book={b}
                       bookCategory={this.props.shelfBooks.filter( bb => bb.id === b.id)[0].shelf}
                       callback={this.props.callback} />
                       :
                       <Books key={b.id}
                        bookTitle={b.title} 
                        bookAuthor={b.authors}
                        bookImage={b.hasOwnProperty('imageLinks') ? b.imageLinks.smallThumbnail : ''}
                        book={b}
                        bookCategory={"none"}
                        callback={this.props.callback} />
            ))}
        </ol>
       </div>
    </div>)
  }       
}

export default Search