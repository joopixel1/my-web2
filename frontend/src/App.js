import React, { Component } from 'react';
import { BrowserRouter as Router, Navigate, Route, Routes } from 'react-router-dom';
import "bootstrap/dist/css/bootstrap.min.css";// Bootstrap CSS
import "bootstrap/dist/js/bootstrap.bundle.min";// Bootstrap Bundle JS

//import Header from './components/Header/Header';
import Home from './components/Home/Home';
import Error from './components/Error/Error';
import Sidebars from './components/Sidebars/Sidebars';
import Projects from './components/Projects/Projects';
import Resume from './components/Resume/Resume.tsx';
import Header from './components/Header/Header'
import { MobileContext } from './components/MobileContext/MobileContext';
import './App.css'

export default class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      size: 0,
    }
  }

  updateDimensions = () => {
    this.setState({size : window.innerWidth })
  }

  componentDidMount(){
    this.updateDimensions()
    window.addEventListener('resize', this.updateDimensions)
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.updateDimensions)
  }


  render () {
    return (
      <div id="my_container">
      <MobileContext.Provider value={{ size: this.state.size, isMobile: this.state.size < 700}}>
      <Router >
        <Sidebars pageWrapId={"my_main"} outerContainerId={"my_container"}/>
        
        <div id="my_main">
          <div id={(this.state.size < 700) ? "my_mobile" : "my_non-mobile"}>
            <Header/>
            <div className={'rout'}>
              <Routes>
                <Route exact path='/' element={<Home/>} />
                <Route path='/Projects/*' element={<Projects/>} />
                <Route path='/Writing' element={<Error/>} />
                <Route path='/Resume' element={<Resume/>} />
                <Route path='/Error' element={<Error/>} />
                <Route path='*' element={<Navigate to='/Error' replace={true}/>}/>
              </Routes>
            </div>
        </div>
      </div>
      </Router> 
      </MobileContext.Provider>  
      </div>         
    );
  }

}


