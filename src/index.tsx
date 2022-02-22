import React from 'react';
import ReactDOM from 'react-dom';
import './style/main.scss';
import App from './components/App';
import { ThemeProvider } from '@emotion/react';
import theme from './style/theme';
import { Provider } from 'react-redux';
import store from './store';
import { HashRouter as Router} from 'react-router-dom';

ReactDOM.render(
  <Provider store={store}>
    <ThemeProvider theme={theme}>
      <Router>
        <React.StrictMode>
          <App />
        </React.StrictMode>
      </Router>
    </ThemeProvider>
  </Provider>,
  document.getElementById('root')
);
