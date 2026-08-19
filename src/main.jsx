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


const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<Layout/>}>
      <Route path='' element={<Home/>}></Route>
      <Route path='/MoviesDetails/:id' element={<MovieDetails/>}></Route>
      <Route path='/GenresMovie/:id' element={<GenresMovie/>}></Route>
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
