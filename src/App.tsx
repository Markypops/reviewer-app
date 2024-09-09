import { useState } from 'react';
import Header from './components/header/Header';
import Questionnaire from './components/questionnaire/Questionnaire';

function App() {
  const [topic, setTopic] = useState<string>('');
  const [section, setSection] = useState<string>('');
  const [visible, setVisible] = useState<boolean>(false);
  
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
      <Header onTopicChange={handleTopicChange} onSectionChange={handleSectionChange} isVisible={visible} setVisible={handleSelectNavBar} />
      <Questionnaire topic={ topic } section={ section } onClickChooseTopic={handleSelectNavBar} />
    </>
  )
}

export default App
