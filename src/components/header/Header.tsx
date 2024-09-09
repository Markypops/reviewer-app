import NavBar from '../navbar/NavBar';

interface HeaderProps {
  onTopicChange: (topic: string) => void;
  onSectionChange: (section: string) => void;
  isVisible: boolean;
  setVisible: (visible: boolean) => void;
}

const Header = ({onTopicChange, onSectionChange, isVisible, setVisible}: HeaderProps) => {
  return (
    <header className='bg-blue-600 text-white p-1 shadow-md'> 
      <div className="container mx-auto flex justify-between items-center">
        <NavBar onTopicChange={ onTopicChange } onSectionChange={ onSectionChange } isVisible={ isVisible } setVisible={setVisible} /> 
        <h1 className="text-2xl font-bold">INDIABIX</h1>
      </div>
    </header>
  )
};

export default Header;