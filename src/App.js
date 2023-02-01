import {Route, Routes} from 'react-router-dom'
import {AuthProvider} from './contexts/auth-context'
import SignUpPage from './pages/SignUpPage'
import SignInPage from 'pages/SignInPage'
import HomePage from 'pages/HomePage'
import PageNotFound from 'pages/PageNotFound'
import PostDetailsPage from 'pages/PostDetailsPage'
import DashboardLayout from 'module/dashboard/DashboardLayout'
import DashboardPage from 'pages/DashboardPage'
import PostManage from 'module/post/PostManage'
import PostAddNew from 'module/post/PostAddNew'
import PostUpdate from 'module/post/PostUpdate'
import CategoryManage from 'module/category/CategoryManage'
import CategoryAddNew from 'module/category/CategoryAddNew'
import CategoryUpdate from 'module/category/CategoryUpdate'
import UserManage from 'module/user/UserManage'
import UserAddNew from 'module/user/UserAddNew'
import UserUpdate from 'module/user/UserUpdate'
import UserProfile from 'module/user/UserProfile'

function App() {
  return (
    <div>
      <AuthProvider>
        <Routes>
          <Route
            path="/"
            element={<HomePage></HomePage>}
          ></Route>
          <Route
            path="/sign-up"
            element={<SignUpPage></SignUpPage>}
          ></Route>
          <Route
            path="/sign-in"
            element={<SignInPage></SignInPage>}
          ></Route>

          <Route
            path="*"
            element={<PageNotFound></PageNotFound>}
          ></Route>
          <Route
            path="/post-detail"
            element={<PostDetailsPage></PostDetailsPage>}
          ></Route>
          <Route element={<DashboardLayout />}>
            <Route
              path="/dashboard"
              element={<DashboardPage></DashboardPage>}
            ></Route>
            <Route
              path="/manage/posts"
              element={<PostManage></PostManage>}
            ></Route>
            <Route
              path="/manage/add-post"
              element={<PostAddNew></PostAddNew>}
            ></Route>
            <Route
              path="/manage/category"
              element={<CategoryManage></CategoryManage>}
            ></Route>
            <Route
              path="/manage/add-category"
              element={<CategoryAddNew></CategoryAddNew>}
            ></Route>
          </Route>
        </Routes>
      </AuthProvider>
    </div>
  )
}
export default App
