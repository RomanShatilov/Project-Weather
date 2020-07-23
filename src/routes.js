const AppLibrary = () => import('@/components/AppLibrary');


const routes = [
  {
    path: '/library',
    name: '2X library',
    status: false,
    visible: true,
    component: AppLibrary
  },
];
export default routes;