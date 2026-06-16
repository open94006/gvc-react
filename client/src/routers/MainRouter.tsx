import { createBrowserRouter, Outlet } from 'react-router';
import { Home } from '../react-view/Home';
import { Header } from '../layouts/Header';
import { Footer } from '../layouts/Footer';
import { ZustandCountAddView } from '../react-view/zustand/ZustandAddView';

function mainLayout() {
  return (
    <>
      <Header />
      <main>
        <Outlet />
      </main>
      <Footer />
    </>
  );
}

export const router = createBrowserRouter([
  {
    path: '/',
    Component: mainLayout,
    children: [
      {
        index: true,
        Component: Home,
      },
      {
        path: '/zustandAdd',
        Component: ZustandCountAddView,
      },
    ],
  },
]);
