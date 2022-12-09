import Headers from './components/header/Header';
import Editor from './Editor.js/Editor';
import style from './styles/App.module.css';


function App() {
  return (
    <div className={style.App}>
      <Headers/>
      <Editor/>
    </div>
  );
}

export default App;
