import {Component} from 'react'
import Loader from 'react-loader-spinner'
import ProjectShow from './ProjectShow'
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css'

import './App.css'

//This is the list (static data) used in the application. You can move it to any component if needed.

const categoriesList = [
  {id: 'ALL', displayText: 'All'},
  {id: 'STATIC', displayText: 'Static'},
  {id: 'RESPONSIVE', displayText: 'Responsive'},
  {id: 'DYNAMIC', displayText: 'Dynamic'},
  {id: 'REACT', displayText: 'React'},
]

const apStatus = {
  initial: 'initial',
  loading: 'loading',
  success: 'success',
  fail: 'fail',
}
// Replace your code here
class App extends Component {
  state = {data: [], ap: apStatus.initial, sel: 'All'}

  componentDidMount() {
    this.getData()
  }

  getData = async () => {
    this.setState({ap: apStatus.loading})
    const {sel} = this.state
    const url = `https://apis.ccbp.in/ps/projects?category=${sel}`
    const options = {methed: 'GET'}
    const response = await fetch(url, options)
    if (response.ok === true) {
      const data = await response.json()
      const updateData = data.projects.map(i => ({
        id: i.id,
        name: i.name,
        imageurl: i.image_url,
      }))
      this.setState({data: updateData, ap: apStatus.success})
    } else {
      this.setState({ap: apStatus.fail})
    }
  }

  one = event => {
    this.setState({sel: event.target.value}, this.getData)
  }
  loadingView = () => (
    <div testid="loader" className="load">
      <Loader type="ThreeDots" color="00bFFF" height={50} width={50} />
    </div>
  )
  successView = () => {
    const {data} = this.state
    return (
      <div className="fail-con">
        <ul className="app-con">
          {data.map(j => (
            <ProjectShow details={j} key={j.id} />
          ))}
        </ul>
      </div>
    )
  }
  failure = () => (
    <div>
      <img
        src="https://assets.ccbp.in/frontend/react-js/projects-showcase/failure-img.png"
        className="ima"
        alt="failure view"
      />
      <h1 className="header">Oops! Something Went Wrong</h1>
      <p className="para">
        We cannot seem to find the page you are looking for
      </p>
      <button className="but" type="button" onClick={this.getData}>
        Retry
      </button>
    </div>
  )

  finalRender = () => {
    const {ap} = this.state
    switch (ap) {
      case apStatus.loading:
        return this.loadingView()
      case apStatus.success:
        return this.successView()
      case apStatus.fail:
        return this.failure()
    }
  }

  render() {
    const {sel} = this.state
    return (
      <div>
        <nav className="nav-el">
          <img
            src="https://assets.ccbp.in/frontend/react-js/projects-showcase/website-logo-img.png"
            alt="website logo"
            className="web"
          />
        </nav>
        <div className="main-con">
          <ul className="sel-con">
            <select className="sel" value={sel} onChange={this.one}>
              {categoriesList.map(each => (
                <option value={each.id} key={each.id}>
                  {each.displayText}
                </option>
              ))}
            </select>
          </ul>
          {this.finalRender()}
        </div>
      </div>
    )
  }
}

export default App
