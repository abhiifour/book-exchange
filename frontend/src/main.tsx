
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { Provider } from 'react-redux'
import { BrowserRouter , HashRouter} from 'react-router'
import store from './store/store.ts'
import { Handshake } from 'lucide-react'

createRoot(document.getElementById('root')!).render(
 <HashRouter>

 <Provider store={store} >
    <App/>
 </Provider>
 
 </HashRouter>
)
