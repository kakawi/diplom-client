import React, {Component} from 'react';
import {Menu, Container} from 'semantic-ui-react'
import {BrowserRouter as Router, Route, Link} from 'react-router-dom';
import './App.css';
import AdSetContainer from './app/adset/AdSetContainer';
import CampaignContainer from './app/campaign/CampaignContainer';
import CampaignConstructor from './app/constructor/CampaignConstructorModal';

class App extends Component {
  render() {
    return (
      <Router>
        <Container>
          <Menu>
            <Menu.Item
              as={Link}
              to="/"
              name="Campaigns"
            />
            <Menu.Item
              as={Link}
              to="/adSets"
              name="AdSets"
            />
            <Menu.Item
              as={Link}
              to="/campaignConstructor"
              name="CampaignConstructor"
            />
          </Menu>
          <Route exact path="/" component={CampaignContainer}/>
          <Route exact path="/adSets" component={AdSetContainer}/>
          <Route exact path="/campaignConstructor" component={CampaignConstructor}/>
        </Container>
      </Router>
    )
  }
}

export default App;
