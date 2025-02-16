import './index.css'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import {createBrowserRouter, createRoutesFromElements, Route, RouterProvider} from 'react-router-dom'
import Layout from './Layout.jsx'
import {Register,Login} from './pages/index.js'
import { Provider } from 'react-redux'
import {store} from './redux/store.js'
import Dashboard from './pages/Dashboard.jsx'
import { Toaster } from "@/components/ui/toaster"
import Profile from './pages/Profile.jsx'
import MyBlogs from './pages/MyBlogs.jsx'
import BlogUpload from './pages/BlogUpload.jsx'
import Post from './pages/Post.jsx'
 


const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<Layout />}>
      <Route path='' element={<Dashboard />} />
      <Route path='/login' element={<Login />} />
      <Route path='/register' element={<Register />} />
      <Route path='/profile' element={<Profile />} />
      <Route path='/myblogs' element={<MyBlogs />} />
      <Route path='/createblog' element={<BlogUpload />} />
      <Route path='/post/:slug' element={<Post />} />
    </Route>
  )
)

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
    <RouterProvider router={router}/>
    
    <Toaster/>
    </Provider>
  </StrictMode>,
)
