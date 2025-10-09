
import './App.css'
import { RicercaProvider } from './componenti/Context';
import MyHeader from './componenti/Header/MyHeader'
import MyMain from './componenti/Main/MyMain';

function App() {
  
  return (
    <>
      <RicercaProvider>
        <MyHeader />
        <MyMain />
      </RicercaProvider>
    </>
  )
}

export default App
