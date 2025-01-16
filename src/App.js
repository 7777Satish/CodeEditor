import './App.css';
// import Codeeditor from './Codeeditor';
import { VscFiles, VscSearch, VscSourceControl, VscDebugAlt, VscExtensions, VscAccount, VscSettingsGear, VscVscode, VscSplitVertical } from "react-icons/vsc";
import MonacoEditor from './Components/MonacoEditor';
import NavigationTab from './Components/NavigationTab';
import { IoIosMore } from 'react-icons/io';
// Making a Code Editor in React
function App() {
  return <>
    <div className="main">
      <div className='top'>
        <div className='logo'><VscVscode /></div>
        <nav>
          <ul>
            <li>File</li>
            <li>Edit</li>
            <li>Selection</li>
            <li>View</li>
            <li>Go</li>
            <li>Run</li>
            <li>Terminal</li>
            <li>Help</li>
          </ul>
        </nav>
      </div>
      <div className='middle'>
        <div className='left'>
          <ul className='leftTop'>
            <li className='active'><VscFiles /></li>
            <li><VscSearch /></li>
            <li><VscSourceControl /></li>
            <li><VscDebugAlt /></li>
            <li><VscExtensions /></li>
          </ul>
          <ul className='leftBottom'>
            <li><VscAccount /></li>
            <li><VscSettingsGear /></li>
          </ul>
        </div>
        <div className='right'>
          <div className='navigation'>
            <div className='files'>  
              <NavigationTab filetype="js" name="App.js" opened={false} />
              <NavigationTab filetype="python" name="index.py" opened={false} />
              <NavigationTab filetype="css" name="App.css" opened={false} />
              <NavigationTab filetype="html" name="index.html" opened={false} />
              <NavigationTab filetype="c" name="program.c" opened={true} />
              <NavigationTab filetype="java" name="public.java" opened={false} />
              <NavigationTab filetype="json" name="data.json" opened={false} />
            </div>
            <div className='features'>
              <button><VscSettingsGear /></button>
              <button><VscSplitVertical /></button>
              <button><IoIosMore /></button>
            </div>
          </div>
          <div className='bottom'>
            <MonacoEditor />
          </div>
        </div>
      </div>
      <div className='bottom'></div>
    </div>
  </>;
}

export default App; 