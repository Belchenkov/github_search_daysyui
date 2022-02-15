import {
    BrowserRouter as Router,
    Routes,
    Route,
} from 'react-router-dom';

import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import Home from './pages/Home';
import About from './pages/About';
import NotFound from './pages/NotFound';
import { GitHubProvider } from './context/github/GitHubContext';
import { AlertProvider } from './context/alert/AlertContext';

function App() {
  return (
      <GitHubProvider>
          <AlertProvider>
            <Router>
              <div className="flex flex-col justify-between h-screen">
                  <Navbar />

                  <main className='container mx-auto px-3 pb-12'>
                      <Routes>
                          <Route path='/' element={<Home />} exact />
                          <Route path='/about' element={<About />} exact />
                          <Route path='/notfound' element={<NotFound />} />
                          <Route path='/*' element={<NotFound />} />
                      </Routes>
                  </main>

                  <Footer />
              </div>
            </Router>
          </AlertProvider>
      </GitHubProvider>
  );
}

export default App;
