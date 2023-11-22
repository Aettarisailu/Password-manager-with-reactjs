import {Component} from 'react'
import './index.css'
import {v4} from 'uuid'

const colorList = ['yello', 'orange', 'green', 'red', 'blue']

class Home extends Component {
  state = {
    website: '',
    username: '',
    password: '',
    latestList: [],
    isShows: false,
    isTrue: false,
  }

  listenWebsitename = e => {
    this.setState({website: e.target.value})
  }

  listenUsername = e => {
    this.setState({username: e.target.value})
  }

  listenPassword = e => {
    this.setState({password: e.target.value})
  }

  addContent = e => {
    e.preventDefault()
    const {website, username, password} = this.state
    const initial = website.slice(0, 1).toUpperCase()
    const classValue = colorList[Math.floor(Math.random() * 5)]
    const newValue = {
      id: v4(),
      websiteName: website,
      UserName: username,
      Password: password,
      initialValu: initial,
      addClass: classValue,
    }
    this.setState(prevState => ({
      latestList: [...prevState.latestList, newValue],
      website: '',
      username: '',
      password: '',
      isTrue: true,
      searchInput: '',
    }))
  }

  showPassword = e => {
    if (e.target.checked) {
      this.setState({isShows: true})
    } else {
      this.setState({isShows: false})
    }
  }

  searchList = e => {
    this.setState({searchInput: e.target.value})
  }

  deleteItem = id => {
    const {latestList} = this.state
    const newList = latestList.filter(eachValue => eachValue.id !== id)
    const caseOf = newList.length !== 0
    this.setState({latestList: newList, isTrue: caseOf})
  }

  render() {
    const {
      latestList,
      website,
      username,
      password,
      isShows,
      searchInput,
    } = this.state
    let {isTrue} = this.state
    const newList = latestList.filter(eachValue =>
      eachValue.websiteName.toLowerCase().includes(searchInput.toLowerCase()),
    )

    if (newList.length === 0) {
      isTrue = false
    } else {
      isTrue = true
    }

    return (
      <div className="App-container">
        <img
          src="https://assets.ccbp.in/frontend/react-js/password-manager-logo-img.png"
          alt="app logo"
          className="app-logo"
        />
        <div className="sub-div1">
          <img
            src="https://assets.ccbp.in/frontend/react-js/password-manager-sm-img.png"
            alt="password manager"
            className="sub-div1-image2"
          />
          <form className="add-details" onSubmit={this.addContent}>
            <h1 className="detail-heading">Add New Password</h1>
            <div className="input-holder">
              <img
                src="https://assets.ccbp.in/frontend/react-js/password-manager-website-img.png"
                alt="website"
                className="input-image"
              />
              <input
                type="text"
                className="input-element"
                placeholder="Enter Website"
                onChange={this.listenWebsitename}
                value={website}
              />
            </div>
            <div className="input-holder">
              <img
                src="https://assets.ccbp.in/frontend/react-js/password-manager-username-img.png"
                alt="username"
                className="input-image"
              />
              <input
                type="text"
                className="input-element"
                placeholder="Enter Username"
                onChange={this.listenUsername}
                value={username}
              />
            </div>
            <div className="input-holder">
              <img
                src="https://assets.ccbp.in/frontend/react-js/password-manager-password-img.png"
                alt="password"
                className="input-image"
              />
              <input
                type="password"
                className="input-element"
                placeholder="Enter Password"
                onChange={this.listenPassword}
                value={password}
              />
            </div>
            <button type="submit" className="add-btn ">
              Add
            </button>
          </form>
          <img
            src="https://assets.ccbp.in/frontend/react-js/password-manager-lg-img.png"
            alt="password manager"
            className="sub-div1-image1"
          />
        </div>
        <div className="sub-div2">
          <div className="first-div">
            <div className="Your-passwords">
              <h1 className="heading-name">Your Passwords</h1>
              <p className="colored-text">{newList.length}</p>
            </div>
            <div className="search-holder">
              <img
                src="https://assets.ccbp.in/frontend/react-js/password-manager-search-img.png"
                alt="search"
                className="input-image"
              />
              <input
                type="search"
                className="search-element"
                placeholder="Search"
                onChange={this.searchList}
                value={searchInput}
              />
            </div>
          </div>
          <hr />
          <div className="show-password">
            <input
              type="checkbox"
              className="check-box"
              id="check"
              onChange={this.showPassword}
            />
            <label htmlFor="check" className="lable-password">
              Show passwords
            </label>
          </div>
          {!isTrue && (
            <div className="empty-state">
              <img
                src="https://assets.ccbp.in/frontend/react-js/no-passwords-img.png"
                alt="no passwords"
                className="empty-image"
              />
              <p className="no-password">No Passwords</p>
            </div>
          )}
          {isTrue && (
            <ul className="result-container">
              {newList.map(eachValue => (
                <li className="item-list" id={eachValue.id} key={eachValue.id}>
                  <p className={`initial ${eachValue.addClass}`}>
                    {eachValue.initialValu}
                  </p>
                  <div className="List-content">
                    <p className="website">{eachValue.websiteName}</p>
                    <p className="website">{eachValue.userName}</p>
                    <p className="website">{eachValue.Password}</p>
                    {!isShows && (
                      <img
                        src="https://assets.ccbp.in/frontend/react-js/password-manager-stars-img.png"
                        alt="stars"
                        className="stars-image"
                      />
                    )}
                    {isShows && <p className="website">{eachValue.Password}</p>}
                  </div>
                  <button
                    type="button"
                    className="del-btn"
                    onClick={() => this.deleteItem(eachValue.id)}
                    data-testid="delete"
                  >
                    <img
                      src="https://assets.ccbp.in/frontend/react-js/password-manager-delete-img.png"
                      alt="delete"
                      className="del-image"
                    />
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    )
  }
}

export default Home
