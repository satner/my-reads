import React from 'react'
import { Link, Route } from 'react-router-dom'
import * as BooksAPI from './BooksAPI'
import './App.css'
import Search from './Search'
import Books from './Books'

class BooksApp extends React.Component {

  constructor(props) {
    super(props);
    this.changeBookStatus = this.changeBookStatus.bind(this)
  }
  state = {
    refresh: false,
    bookTitle: '',
    shelfBooks: [],
    token: {}
  }

  componentDidMount() {
    BooksAPI.getAll().then(shelfBooks => this.setState({shelfBooks}))
  }

  changeBookStatus(event, book) {
    console.log("eimai sto changeBookStatus tou APP")
    BooksAPI.update({id: book.id}, event.target.value).then( () =>
      BooksAPI.getAll().then(shelfBooks => this.setState({shelfBooks}))
      )
  }

  render() {
    return (
      <div className="app">
      <Route path='/search' render={() => (
          <Search 
            onSearchBook={this.showBooks}
            showBooks={this.showBooks}
            changeBookStatus={this.changeBookStatus}
            shelfBooks={this.state.shelfBooks}
            callback={this.changeBookStatus}/>
        )}/>
      <Route exact path='/' render={() => (
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
                    {this.state.shelfBooks.filter(currentBook => currentBook.shelf !== 'wantToRead' &&  currentBook.shelf !== 'read').map(b => (
                        this.state.shelfBooks.filter( bb => bb.id === b.id).length === 1 ?
                      <Books key={b.id}
                             bookTitle={b.title} 
                             bookAuthor={b.authors}
                             bookImage={b.imageLinks.smallThumbnail}
                             book={b}
                             bookCategory={this.state.shelfBooks.filter( bb => bb.id === b.id)[0].shelf}
                             callback={this.changeBookStatus}/>
                      :
                      <Books key={b.id}
                             bookTitle={b.title} 
                             bookAuthor={b.authors}
                             bookImage={b.imageLinks.smallThumbnail}
                             book={b}
                             bookCategory={"none"}
                             callback={this.changeBookStatus}/>
                      ))}
                    </ol>
                  </div>
                </div>
                <div className="bookshelf">
                  <h2 className="bookshelf-title">Want to Read</h2>
                  <div className="bookshelf-books">
                    <ol className="books-grid">   
                 {this.state.shelfBooks.filter(currentBook => currentBook.shelf !== 'currentlyReading' && currentBook.shelf !== 'read').map(b => (
                    this.state.shelfBooks.filter( bb => bb.id === b.id).length === 1 ?
                      <Books key={b.id}
                             bookTitle={b.title} 
                             bookAuthor={b.authors}
                             bookImage={b.imageLinks.smallThumbnail}
                             book={b}
                             bookCategory={this.state.shelfBooks.filter( bb => bb.id === b.id)[0].shelf}
                             callback={this.changeBookStatus}/>
                      :
                      <Books key={b.id}
                             bookTitle={b.title} 
                             bookAuthor={b.authors}
                             bookImage={b.imageLinks.smallThumbnail}
                             book={b}
                             bookCategory={"none"}
                             callback={this.changeBookStatus}/>
                      ))}
                    </ol>
                  </div>
                </div>
                <div className="bookshelf">
                  <h2 className="bookshelf-title">Read</h2>
                  <div className="bookshelf-books">
                    <ol className="books-grid">
                    {this.state.shelfBooks.filter(currentBook => currentBook.shelf !== 'wantToRead' &&  currentBook.shelf !== 'currentlyReading').map(b => (
                      this.state.shelfBooks.filter( bb => bb.id === b.id).length === 1 ?
                      <Books key={b.id}
                             bookTitle={b.title} 
                             bookAuthor={b.authors}
                             bookImage={b.imageLinks.smallThumbnail}
                             book={b}
                             bookCategory={this.state.shelfBooks.filter( bb => bb.id === b.id)[0].shelf}
                             callback={this.changeBookStatus}/>
                      :
                      <Books key={b.id}
                             bookTitle={b.title} 
                             bookAuthor={b.authors}
                             bookImage={b.imageLinks.smallThumbnail}
                             book={b}
                             bookCategory={"none"}
                             callback={this.changeBookStatus}/>
                      ))}               
                    </ol>
                  </div>
                </div>
              </div>
            </div>
            <div className="open-search">
              <Link onClick={() => this.setState({ showSearchPage: true })} to='/search'>Add a book</Link>
            </div>
          </div>
        )}/>
      </div>
    )
  }
}

export default BooksApp
