import React from 'react'

class Books extends React.Component {
	constructor(props) {
		super(props)
		this.state = {selectValue: this.props.bookCategory}
	}

	state = {
		selectValue: '',
	}
	
	changeBookStatus(event, book) {
    this.props.callback(event,  book)
		this.setState({selectValue: event.target.value})
  }

	render() {
		return (
			<li>
        <div className="book">
          <div className="book-top">
            <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${this.props.bookImage})` }}></div>
              <div className="book-shelf-changer">
                <select value={this.state.selectValue} onChange={(event) => this.changeBookStatus(event, this.props.book)}>
                  <option value="move" disabled>Move to...</option>
                  <option value="currentlyReading">Currently Reading</option>
                  <option value="wantToRead">Want to Read</option>
                  <option value="read">Read</option>
                  <option value="none">None</option>
                </select>
                </div>
              </div>
            <div className="book-title">{this.props.bookTitle}</div>
          <div className="book-authors">{this.props.bookAuthor}</div>
        </div>
      </li>
    )
	}
}

export default Books