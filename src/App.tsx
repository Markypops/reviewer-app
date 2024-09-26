import { useEffect, useState } from 'react';
import Header from './components/header/Header';
import Questionnaire from './components/questionnaire/Questionnaire';
import Login from './components/login/Login';

function App() {
  const [topic, setTopic] = useState<string>('');
  const [section, setSection] = useState<string>('');
  const [visible, setVisible] = useState<boolean>(false);
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

  useEffect(() => {
    const session = localStorage.getItem('session');

    if (session) {
      const { isLoggedIn, expirationTime } = JSON.parse(session);
      if (isLoggedIn && new Date().getTime() < expirationTime) {
        setIsLoggedIn(true);
      } else {
        localStorage.removeItem('session');
      }
    }
  
  }, [])
  
  const handleTopicChange = (newTopic: string) => {
    setTopic(newTopic);
  };

  const handleSectionChange = (newSection: string) => {
    setSection(newSection);
  };

  const handleSelectNavBar = (visible: boolean) => {
    
    setVisible(visible);
  };

  return (
    <>
      {isLoggedIn ? (
        (<>
          <Header onTopicChange={ handleTopicChange } onSectionChange={ handleSectionChange } isVisible={ visible } setVisible={ handleSelectNavBar } />
          <Questionnaire topic={ topic } section={ section } onClickChooseTopic={ handleSelectNavBar } />
        </>)
      ) : (
        <Login setIsLoggedIn={setIsLoggedIn} />
      )}
    </>
  )
}

export default App
