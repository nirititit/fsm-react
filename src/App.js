import React, { Component } from 'react';
import { Provider, connect } from 'react-redux';

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme      from 'material-ui/styles/getMuiTheme';
import mytheme from './mytheme';

import requests from './lib/requests';
import {CardsListContext} from './lib/contexts';

import Header from './Header/Header';
import InfoCard from './InfoCard/InfoCard';
import PersonsCardsList from './PersonsCardsList';

import store from './lib/redux/store';
import {setPersons,setUser} from './lib/redux/actions';

import './app.css';
import './global-vars.css';



class App extends Component {

  constructor( props ){
    super(props);
    this.state = {
      persons:[],
      selectedPersons:{}
    };
    this.getPersons();
    this.getUser();
  }

  getPersons = () => {
    requests.get('/getPersons','').then(xhr=>{
      store.dispatch(setPersons(JSON.parse(xhr).persons ));
    });
  };

  getUser = () => {
    requests.get('/getUsername','').then(xhr=>{
      store.dispatch(setUser(JSON.parse(xhr).username ));
    });
  };

  selectPersons = (selectedPersons = {}) => {
    this.setState({selectedPersons});
  };

  render() {
    return (
      <Provider store={store}>
      <MuiThemeProvider muiTheme={getMuiTheme(mytheme)} >
      <div id="app-container">
      <Header/>
      <div id="app-body">
      <CardsListContext.Provider value={{selectedIds:this.state.selectedPersons,selectIds:this.selectPersons}}>
  <PersonsCardsList />
    </CardsListContext.Provider>
    <div className="info-cards">
      {Object.values(this.state.selectedPersons).map(person=><div key={person.id}>{React.createElement(InfoCard,{...person})}</div>)}
  </div>

    </div>
    </div>
    </MuiThemeProvider>
    </Provider>
  );
  }
}

export default App;

