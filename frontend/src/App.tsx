import './App.css'
import Navigation from './components/home/navigation';
import { Outlet } from 'react-router';

function App() {

  return (
    <>
      <Navigation/>
      <main className='relative z-10'>
        <Outlet/>
      </main>
    </>
  )
}

export default App
