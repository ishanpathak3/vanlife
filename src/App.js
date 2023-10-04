
import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider
} from 'react-router-dom'
import Home from './pages/Home';
import About from './pages/About';
import Vans, { loader as vansLoader } from './pages/Vans/Vans';
import VanDetails, { loader as vanDetailsLoader } from './pages/Vans/VanDetails';
import Layout from './components/Layout'
import Dashboard from './pages/Host/Dashboard'
import './server'
import Reviews from './pages/Host/Reviews';
import Income from './pages/Host/Income';
import HostLayout from './components/HostLayout';
import HostVans, { loader as hostVansLoader } from './pages/Host/HostVans';
import HostVanDetails, { loader as hostVanDetailsLoader } from './pages/Host/HostVanDetails';
import HostVanInfo from './pages/Host/HostVanInfo';
import HostVanPricing from './pages/Host/HostVanPricing';
import HostVanPhotos from './pages/Host/HostVanPhotos';
import NotFound from './pages/NotFound';
import Error from './components/Error';
import Login, { loginAction } from './pages/Login';
import { requireAuth } from './utils';
localStorage.clear()

function App() {

  const router = createBrowserRouter(createRoutesFromElements(
    <Route path='/' element={<Layout />}>
      <Route index element={<Home />} />
      <Route path='about' element={<About />} />
      <Route
        path="login"
        element={<Login />}
        action={loginAction}
      />
      <Route
        path='vans'
        element={<Vans />}
        errorElement={<Error />}
        loader={vansLoader}
      />
      <Route path='vans/:id' element={<VanDetails />} loader={vanDetailsLoader} />
      <Route path='host' element={<HostLayout />}loader={async({ request }) => await requireAuth(request)} errorElement={<Error />}>
        <Route index element={<Dashboard />} loader={async({ request }) => await requireAuth(request)}/>
        <Route path='income' element={<Income />} loader={async({ request }) => await requireAuth(request)}/>
        <Route path='vans' element={<HostVans />} loader={hostVansLoader} />
        <Route path='vans/:id' element={<HostVanDetails />} loader={hostVanDetailsLoader}>
          <Route index element={<HostVanInfo />} loader={async({ request }) => await requireAuth(request)}/>
          <Route path='pricing' element={<HostVanPricing loader={async({ request }) => await requireAuth(request)}/>} />
          <Route path='photos' element={<HostVanPhotos loader={async({ request }) => await requireAuth(request)}/>} />
        </Route>
        <Route path='reviews' element={<Reviews />} />
      </Route>
      <Route path='*' element={<NotFound />} />
    </Route>
  ))
  return (
    <RouterProvider router={router} />
  );
}

export default App;
