import { RouterProvider } from 'react-router';
import { router } from './routers/MainRouter';

function App() {
  return <RouterProvider router={router} />;
}

export default App;
