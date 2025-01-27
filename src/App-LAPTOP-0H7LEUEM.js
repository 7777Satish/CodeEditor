import styles from './App.module.css';
import { IoIosMore } from 'react-icons/io';
import React, { createContext, useRef, useState } from 'react';
import { VscFiles, VscSearch, VscSourceControl, VscDebugAlt, VscExtensions, VscAccount, VscSettingsGear, VscSplitVertical, VscRemote, VscError, VscWarning, VscBell } from "react-icons/vsc";
import MonacoEditor from './Components/MonacoEditor';
import LeftMenu from './Components/LeftMenu';
import FileNavigation from './Components/FileNavigation';
import EditorHomeScreen from './Components/EditorHomeScreen';
// import CodeEditor from './Codeeditor';

export const FileManagerContext = createContext();
export const NavigationContext = createContext();

function App() {
  const [leftmenu, setLeftmenu] = useState({
    opened: true,
    currentTab: '0',
    width: 300
  });

  const [folder,setFolder] = useState({
    name: null,
    opened: true,
    id: null,
    kind: 'directory',
    structure:[]
  });

  const [openedTabs, setOpenedTabs] = useState({ items: [], ids: [] });
  const openedTabsRef = useRef({ ids: [], items: [] });
  const setOpenedTabsAndRef = (updater) => {
    setOpenedTabs((prev) => {
      const newState = updater(prev);
      openedTabsRef.current = newState; // Keep ref updated
      return newState;
    });
  };
  
  const [files, setFiles] = useState([]);
  // const [files, setFiles] = useState([{
  //   name: "welcome.txt",
  //   filetype: "text/css",
  //   id: null,
  //   handle: null,
  //   content: '#Welcome to CodeDesk\n#Open a folder to start coding'
  // }]);

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
    <div className={styles.app}>
      <div className={styles.top}>
        <div className={styles.logo}>
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
      <div className={styles.middle} style={leftmenu.opened ? { gridTemplateColumns: `${leftmenu.width}px 1fr` } : {}}>
        <div className={styles.left}>
          <nav>
              <ul className={styles.leftTop}>
                <li data-tab_id={0} className={leftmenu.currentTab === '0' ? styles.active : ""} onClick={handleNav}><VscFiles /></li>
                <li data-tab_id={1} className={leftmenu.currentTab === '1' ? styles.active : ""} onClick={handleNav}><VscSearch /></li>
                <li data-tab_id={2} className={leftmenu.currentTab === '2' ? styles.active : ""} onClick={handleNav}><VscSourceControl /></li>
                <li data-tab_id={3} className={leftmenu.currentTab === '3' ? styles.active : ""} onClick={handleNav}><VscDebugAlt /></li>
                <li data-tab_id={4} className={leftmenu.currentTab === '4' ? styles.active : ""} onClick={handleNav}><VscExtensions /></li>
              </ul>
            <ul className={styles.leftBottom}>
              <li><VscAccount /></li>
              <li><VscSettingsGear /></li>
            </ul>
          </nav>
            {leftmenu.opened && <FileManagerContext.Provider value={{folder, setFolder, openedTabs, setOpenedTabs, openedTabsRef, setOpenedTabsAndRef, files, setFiles}}><LeftMenu tabId={leftmenu.currentTab} /></FileManagerContext.Provider>}
        </div>
        {
        files.length?<>
        <div className={styles.right}>
          <div className={styles.navigation}>
            <NavigationContext.Provider value={{openedTabs, setOpenedTabs, openedTabsRef, setOpenedTabsAndRef, files}}>
              <FileNavigation />
            </NavigationContext.Provider>
            <div className={styles.features}>
              <button><VscSettingsGear /></button>
              <button><VscSplitVertical /></button>
              <button><IoIosMore /></button>
            </div>
          </div>
          <div className={styles.bottom}>
            <MonacoEditor file={files[files.length-1]} leftmenu={leftmenu} />
            {/* {console.log(files[files.length-1])} */}
            {/* <CodeEditor file={files[files.length-1]} leftmenu={leftmenu} /> */}
          </div>
        </div></>
        : <EditorHomeScreen />
        }
      </div>
      <div className={styles.bottom}>
        <div className={styles.left}>
          <span className={styles.remote}><VscRemote /></span>
          <span><VscError />0</span>
          <span><VscWarning />0</span>
        </div>
        <div className={styles.right}>
          <span>Layout US</span>
          <span><VscBell /></span>
        </div>
      </div>
    </div>
  </>;
}

export default App;