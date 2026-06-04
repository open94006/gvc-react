import { Footer } from './layouts/Footer';
import { Header } from './layouts/Header';
import { Main } from './layouts/Main';
import { GvcPage } from './pages/GvcPage';
import { ReactPage } from './pages/ReactPage';

function App() {
  return (
    <div>
      <Header />
      <Main ViewGVC={<GvcPage />} ViewReact={<ReactPage />} />
      <Footer />
    </div>
  );
}

export default App;
