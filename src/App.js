import './App.css';
import { IoIosMore } from 'react-icons/io';
import React, { createContext, useState } from 'react';
import { VscFiles, VscSearch, VscSourceControl, VscDebugAlt, VscExtensions, VscAccount, VscSettingsGear, VscSplitVertical, VscRemote, VscError, VscWarning, VscBell } from "react-icons/vsc";
import MonacoEditor from './Components/MonacoEditor';
import NavigationTab from './Components/NavigationTab';
import LeftMenu from './Components/LeftMenu';

export const FileManagerContext = createContext();

function App() {
  const [leftmenu, setLeftmenu] = useState({
    opened: true,
    currentTab: '0',
    width: 300
  });

  const [openedTabs, setOpenedTabs] = useState([]);

  const [file, setFile] = useState({
    name: 'untitled.txt',
    filetype: 'text',
    location: null
  });

  const handleNav = (e) => {
    const tabId = e.currentTarget.getAttribute('data-tab_id');
    if(tabId === leftmenu.currentTab){
      setLeftmenu({ ...leftmenu, opened: !leftmenu.opened });     
      return;
    }
    if (tabId !== null) {
      setLeftmenu({ ...leftmenu, currentTab: tabId, opened: true});
    }
  }

  return <>
    <div className="main">
      <div className='top'>
        <div className='logo'>
          <img alt='Logo' src="/favicon.ico.svg"/>
        </div>
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
      <div className='middle' style={leftmenu.opened ? { gridTemplateColumns: `${leftmenu.width}px 1fr` } : {}}>
        <div className='left'>
          <nav>
              <ul className='leftTop'>
                <li data-tab_id={0} className={leftmenu.currentTab === '0' ? 'active' : ""} onClick={handleNav}><VscFiles /></li>
                <li data-tab_id={1} className={leftmenu.currentTab === '1' ? 'active' : ""} onClick={handleNav}><VscSearch /></li>
                <li data-tab_id={2} className={leftmenu.currentTab === '2' ? 'active' : ""} onClick={handleNav}><VscSourceControl /></li>
                <li data-tab_id={3} className={leftmenu.currentTab === '3' ? 'active' : ""} onClick={handleNav}><VscDebugAlt /></li>
                <li data-tab_id={4} className={leftmenu.currentTab === '4' ? 'active' : ""} onClick={handleNav}><VscExtensions /></li>
              </ul>
            <ul className='leftBottom'>
              <li><VscAccount /></li>
              <li><VscSettingsGear /></li>
            </ul>
          </nav>
            {leftmenu.opened && <FileManagerContext.Provider value={{openedTabs,setOpenedTabs,file,setFile}}><LeftMenu tabId={leftmenu.currentTab} /></FileManagerContext.Provider>}
        </div>
        <div className='right'>
          <div className='navigation'>
            <div className='files'>
              <NavigationTab filetype="js" name="App.js" opened={true} />
              <NavigationTab filetype="python" name="index.py" opened={false} />
              <NavigationTab filetype="css" name="App.css" opened={false} />
              <NavigationTab filetype="html" name="index.html" opened={false} />
            </div>
            <div className='features'>
              <button><VscSettingsGear /></button>
              <button><VscSplitVertical /></button>
              <button><IoIosMore /></button>
            </div>
          </div>
          <div className='bottom'>
            <MonacoEditor leftmenu={leftmenu} />
          </div>
        </div>
      </div>
      <div className='bottom'>
        <div className='left'>
          <span className='remote'><VscRemote /></span>
          <span><VscError />0</span>
          <span><VscWarning />0</span>
        </div>
        <div className='right'>
          <span>Layout US</span>
          <span><VscBell /></span>
        </div>
      </div>
    </div>
  </>;
}

export default App;