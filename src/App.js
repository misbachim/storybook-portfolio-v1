import './App.css'
import '../node_modules/papercss/dist/paper.css';
import '../node_modules/papercss/dist/paper.min.css';
import styled from 'styled-components';
import Main from './pages/Main/Main';
import Helmet from 'react-helmet';
import { useState } from 'react';
import { useEffect } from 'react';
import Background from './components/background/Background';

function App() {
  const [mode, setMode] = useState(
    window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches ? "dark" :"light"
  );

  useEffect(() => {
    const modeMe = (e) => {
      setMode(e.matches ? "dark" : "light");
    }  
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', modeMe);
    return window.matchMedia('(prefers-color-scheme: dark)').removeListener(modeMe);
  }, []);

  const toggleMode = () => {
    setMode(prev => prev === 'dark' ? 'light' : 'dark')
  }

  return (
    <>
      <Helmet>
          <html className={mode} lang="en"></html>
      </Helmet>
      <Background mode={mode} />
        <Container className='paper container padding-top-small padding-bottom-small' imgUrl={process.env.PUBLIC_URL + '/background.jpg'}>
          <Main mode={mode} toggleMode={toggleMode}/>
        </Container>
    </>
  );
}

export default App;

const Container = styled.div`
  min-height: 100vh;
  /* background: url(${(props)=>props.imgUrl}); */
  background-size: 500%;
  background-position: -400px -300px;
  /* background-position: -2500px -300px; */
  backdrop-filter: blur(5px);
`