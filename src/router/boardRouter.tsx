import { lazy, Suspense } from 'react';
import SuspenseLoader from '../components/SuspenseLoader';
import suspenseLoader from '../components/SuspenseLoader';
import SidebarLayout from '../layouts/SidebarLayout';
import { Navigate } from 'react-router-dom';

const Loader = (Component) => (props) =>
  (
    <Suspense fallback={<SuspenseLoader />}>
      <Component {...props} />
    </Suspense>
  );

const BoardList = Loader(
  lazy(() => import('src/board/pages/BoardListPage'))
);

const boaRouter = {
  path: '/boa',
  element: <SidebarLayout/>,
  children: [
    {
      path: '',
      element: <Navigate to="list" replace/>
    },
    {
      path: 'list',
      element: <BoardList/>
    }
  ]

}
