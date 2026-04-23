import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import ProtectedRoute from './components/ProtectedRoute';

// Pages
import Login from './pages/Login';
import Register from './pages/Register';
import ParentAccess from './pages/ParentAccess';
import Dashboard from './pages/Dashboard';
import Students from './pages/Students';
import Classes from './pages/Classes';
import Staff from './pages/Staff';
import Settings from './pages/Settings';
import MyClasses from './pages/MyClasses';
import EnterResults from './pages/EnterResults';
import Analytics from './pages/Analytics';
import Profile from './pages/Profile';
import Unauthorised from './pages/Unauthorised';

const adminRoles = ['super_admin', 'admin'];
const teacherRoles = ['form_teacher', 'subject_teacher'];
const allAuthenticatedRoles = ['super_admin', 'admin', 'form_teacher', 'subject_teacher', 'parent'];

const router = createBrowserRouter([
  {
    path: '/login',
    element: <Login />,
  },
  {
    path: '/register',
    element: <Register />,
  },
  {
    path: '/parent-access',
    element: <ParentAccess />,
  },
  {
    path: '/unauthorised',
    element: <Unauthorised />,
  },
  {
    path: '/dashboard',
    element: <ProtectedRoute allowedRoles={adminRoles}><Dashboard /></ProtectedRoute>,
  },
  {
    path: '/students',
    element: <ProtectedRoute allowedRoles={adminRoles}><Students /></ProtectedRoute>,
  },
  {
    path: '/classes',
    element: <ProtectedRoute allowedRoles={adminRoles}><Classes /></ProtectedRoute>,
  },
  {
    path: '/staff',
    element: <ProtectedRoute allowedRoles={adminRoles}><Staff /></ProtectedRoute>,
  },
  {
    path: '/settings',
    element: <ProtectedRoute allowedRoles={adminRoles}><Settings /></ProtectedRoute>,
  },
  {
    path: '/analytics',
    element: <ProtectedRoute allowedRoles={adminRoles}><Analytics /></ProtectedRoute>,
  },
  {
    path: '/my-classes',
    element: <ProtectedRoute allowedRoles={teacherRoles}><MyClasses /></ProtectedRoute>,
  },
  {
    path: '/enter-results',
    element: <ProtectedRoute allowedRoles={teacherRoles}><EnterResults /></ProtectedRoute>,
  },
  {
    path: '/profile',
    element: <ProtectedRoute allowedRoles={allAuthenticatedRoles}><Profile /></ProtectedRoute>,
  },
  {
    path: '/',
    element: <Login />,
  },
  {
    path: '*',
    element: <Login />,
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;