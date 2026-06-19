import { createBrowserRouter, Outlet } from 'react-router';
import { Home } from '../react-view/Home';
import { Header } from '../layouts/Header';
import { Footer } from '../layouts/Footer';
import { ZustandCountAddView } from '../react-view/zustand/ZustandAddView';
import { ZustandDemoView } from '../react-view/zustand-demo/ZustandDemoView';
import { Preview } from '../react-view/zustand-demo/Preview';
import { UseRefDemo } from '../react-view/UseRefDemo';

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
        path: 'zustandAdd',
        Component: ZustandCountAddView,
      },
      {
        path: 'useRefDemo',
        Component: UseRefDemo,
      },
    ],
  },
  {
    path: '/zustandDemo',
    Component: mainLayout,
    children: [
      {
        index: true,
        Component: ZustandDemoView,
      },
      {
        path: 'preview',
        Component: Preview,
      },
    ],
  },
]);
