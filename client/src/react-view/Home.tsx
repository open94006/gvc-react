import { Main } from '../layouts/Main';
import { GvcPage } from '../pages/GvcPage';
import { ReactPage } from '../pages/ReactPage';

export function Home() {
  return <Main ViewGVC={<GvcPage />} ViewReact={<ReactPage />} />;
}
