import { Accuracy } from './components/Accuracy';
import { CharacterPerMinute } from './components/CharacterPerMinute';
import { Content } from './components/Content';
import { Header } from './components/Header';
import { StopWatch } from './components/StopWatch';
import { TextInput } from './components/TextInput';
import { WordPerMinute } from './components/WordPerMinute';
import { KeyBoard } from './components/KeyBoard';
import { Modal } from './components/Modal';
import { Restart } from './components/Restart';
import { Row } from './components/Row';

const App = () => {
  return (
    <div className="container-fluid">
      <div className="text-center">
        <Header />
        <Row>
          <WordPerMinute />
          <CharacterPerMinute />
          <Accuracy />
          <StopWatch />
        </Row>
        <Content />
        <TextInput />
        <KeyBoard />
        <Restart />
        <Modal />
      </div>
    </div>
  );
};

export default App;
