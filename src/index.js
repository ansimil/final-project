import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter as Router } from 'react-router-dom'
import { AuthProviderWrapper } from './contexts/auth';
import { ModuleProviderWrapper } from './contexts/modules';
import { QueryClient, QueryClientProvider } from 'react-query'

const queryClient = new QueryClient()
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  // <React.StrictMode>
  <QueryClientProvider client={queryClient}>
    <AuthProviderWrapper>
      <ModuleProviderWrapper>
        <Router>
          <App />
        </Router>
      </ModuleProviderWrapper>
    </AuthProviderWrapper>
  </QueryClientProvider>

  // </React.StrictMode>
);





// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
