import { createBrowserRouter } from 'react-router-dom'

import type { RouteObject } from "react-router";
import Login from '../views/login'
import Layout from '../views/layout'
import Guide from '../views/guide'
import Certificate from '../views/certificates'

const routes: RouteObject[] = [
  {
    path: '/',
    element: <Layout />,
    children: [
      {element: <Guide />, path: '/guide'},
      {element: <Certificate />, index: true}
    ]
  },
  { path: '/login', element: <Login />,},

]

export default createBrowserRouter(routes)


