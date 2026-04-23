import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import ProtectedRoute from './components/ProtectedRoute';

// Pages
import Login from './pages/Login';
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

const router = createBrowserRouter([
  // Public routes
  {
    path: '/login',
    element: <Login />,
  },
  {
    path: '/parent-access',
    element: <ParentAccess />,
  },
  
  // Admin routes
  {
    element: <ProtectedRoute allowedRoles={['super_admin', 'admin']} />,
    children: [
      {
        path: '/dashboard',
        element: <Dashboard />,
      },
      {
        path: '/students',
        element: <Students />,
      },
      {
        path: '/classes',
        element: <Classes />,
      },
      {
        path: '/staff',
        element: <Staff />,
      },
      {
        path: '/settings',
        element: <Settings />,
      },
      {
        path: '/analytics',
        element: <Analytics />,
      },
    ],
  },

  // Teacher routes
  {
    element: <ProtectedRoute allowedRoles={['form_teacher', 'subject_teacher']} />,
    children: [
      {
        path: '/my-classes',
        element: <MyClasses />,
      },
      {
        path: '/enter-results',
        element: <EnterResults />,
      },
    ],
  },

  // Shared authenticated routes
  {
    element: <ProtectedRoute allowedRoles={['super_admin', 'admin', 'form_teacher', 'subject_teacher', 'parent']} />,
    children: [
      {
        path: '/profile',
        element: <Profile />,
      },
    ],
  },

  // Unauthorised page
  {
    path: '/unauthorised',
    element: <Unauthorised />,
  },

  // Catch-all redirect
  {
    path: '*',
    element: <Login />,
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;