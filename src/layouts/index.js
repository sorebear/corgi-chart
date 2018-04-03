import React from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';

import Navigation from '../components/Navigation';
import withAuthentication from '../components/Session/withAuthentication';

import './index.css';

const TemplateWrapper = ({ children }) => (
  <div>
    <Helmet
      title="Gatsby Firebase Authentication"
      meta={[
        { name: 'description', content: 'Gatsby Firebase Authentication' },
        { name: 'keywords', content: 'Gatsby Firebase Authentication' },
      ]}
    />
    <div className="app">
      <Navigation />

      <hr/>

      {children()}
    </div>
    <script src="https://trello.com/1/client.js?key=[1b14081ee3e1b8bb4342a54211677fa8]"></script>
  </div>
)

TemplateWrapper.propTypes = {
  children: PropTypes.func,
}

export default withAuthentication(TemplateWrapper)
