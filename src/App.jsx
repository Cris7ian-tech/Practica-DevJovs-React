
import Header from './components/Header'
import Footer from './components/Footer' // Corregida las ruta
import HomePage from './pages/HomePage'

import Route from './components/Route'
import SearchPage from './pages/SearchPage';

function App() {

  
  return (
    <>
      <Header />
      <Route path="/" component={HomePage} />
      <Route path="/search" component={SearchPage} />
      <Footer />
    </>
  );
}

export default App;
