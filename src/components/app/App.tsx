import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { createTheme, ThemeProvider, CssBaseline} from '@mui/material';
import { Provider } from 'react-redux';
import store from '../../store/store';

import HomePage from '../pages/HomePage';
import ArticlePage from '../pages/article-page/ArticlePage';
import Error from '../error/Error';

import '@fontsource/montserrat/300.css';
import '@fontsource/montserrat/400.css';
import '@fontsource/montserrat/500.css';
import '@fontsource/montserrat/700.css';

import './App.scss';

const theme = createTheme({
  typography: {
    fontFamily: '"Montserrat", sans-serif',
  }
});

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <ThemeProvider theme = {theme}>
        <CssBaseline/>
        <Router 
      //  basename='/projects/codebridge-test-task'
        >
          <Routes>
            <Route path='/' element={<HomePage/>} errorElement={<Error/>}/>
            <Route path='/:id' element={<ArticlePage/>} errorElement={<Error/>}/>                
            <Route path="*" element={<Error/>}/>              
          </Routes>
        </Router>          
      </ThemeProvider>
    </Provider>
  );
}

export default App;
