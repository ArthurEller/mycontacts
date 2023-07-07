import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import { ThemeProvider } from 'styled-components';
import GlobalStyles from '../../assets/styles/global';
import defaultTheme from '../../assets/styles/themes/default';

import Header from '../Header';

import { Container } from './styles';
import Home from '../../pages/Home';
import NewContact from '../../pages/NewContact';
import EditContact from '../../pages/EditContact';

function App() {
  return (
    <Router>
      <ThemeProvider theme={defaultTheme}>
        <GlobalStyles />
        <Container>
          <Header />
          <Routes>
            <Route path="/" exact element={<Home />} />
            <Route path="/new" element={<NewContact />} />
            <Route path="/edit/:id" element={<EditContact />} />
          </Routes>
        </Container>
      </ThemeProvider>

    </Router>

  );
}

export default App;
