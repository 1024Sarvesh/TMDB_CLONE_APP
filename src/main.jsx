import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { RouterProvider } from 'react-router/dom'
import { createBrowserRouter, createRoutesFromElements, Route } from 'react-router'
import Layout from '../Layout.jsx'
import Home from './Components/Home/Home.jsx'
import NotFoundPage from './Components/NotFoundPage/NotFoundPage.jsx'
import MovieDetails from './Components/MoviesDetails/MoviesDetails.jsx'
import GenresMovie from './Components/GenresMovie/GenresMovie.jsx'
import CreditDetails from './Components/CreditDetails/CreditDetails.jsx'
import NowPlaying from './Components/MovieList/NowPlaying.jsx'
import TopRated from './Components/MovieList/TopRated.jsx'
import Popular from './Components/MovieList/Popular.jsx'
import Upcoming from './Components/MovieList/Upcoming.jsx'
import Trailor from './Components/Trailor/Trailor.jsx'


const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<Layout/>}>
      <Route path='' element={<Home/>}></Route>
      <Route path='/MoviesDetails/:id' element={<MovieDetails/>}></Route>
      <Route path='/GenresMovie/:id' element={<GenresMovie/>}></Route>
      <Route path='/CreditDetails/:id' element={<CreditDetails/>}></Route>
      <Route path='/NowPlaying' element={<NowPlaying/>}></Route>
      <Route path='/TopRated' element={<TopRated/>}></Route>
      <Route path='/Popular' element={<Popular/>}></Route>
      <Route path='/Upcoming' element={<Upcoming/>}></Route>
      <Route path='/Trailor/:id' element={<Trailor/>}></Route>
      <Route path="*" element={<NotFoundPage/>}></Route>
    </Route>
  )
)


createRoot(document.getElementById('root')).render(
  // <StrictMode>
  //   <App />
  // </StrictMode>,
  <RouterProvider router={router}></RouterProvider>
)
