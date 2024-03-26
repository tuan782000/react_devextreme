import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { RouterProvider } from "react-router-dom"
import { router } from "./Routes/routes.jsx"
import 'devextreme/dist/css/dx.light.css';
import './index.css'
import './devextreme-config';


ReactDOM.createRoot(document.getElementById('root')).render(
  <RouterProvider router={router}>
    <App />
  </RouterProvider>
)
