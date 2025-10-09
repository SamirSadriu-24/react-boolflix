
import './App.css'
import { RicercaProvider } from './componenti/Context';
import MyHeader from './componenti/MyHeader'

function App() {
  
  return (
    <>
      <RicercaProvider>
        <MyHeader />
      </RicercaProvider>
    </>
  )
}

export default App
