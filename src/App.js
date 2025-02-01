import styles from './App.module.css';
import { IoIosMore } from 'react-icons/io';
import React, { createContext, useEffect, useRef, useState } from 'react';
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
  const isTopNavOpened = useRef(0);

  const removeNavTabActive = (e) => {
    var activetabs = [...document.getElementsByClassName(styles.navTabActive)];
    activetabs.forEach(t=>{
      const isSameElement = activetabs.some(el => el.children[0] === e);
      if(!isSameElement){
        t.classList.remove(styles.navTabActive);
      }
    })
  }

  useEffect(()=>{
    window.addEventListener('click', (e)=>{
    if (!e.target.closest(styles.navList)) {
      removeNavTabActive();
      isTopNavOpened.current = 0;
    }
    });
  },[]);

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

  const handleTopNavButtonClick = (e) => {
    removeNavTabActive();
    setTimeout(()=>{
      e.target.parentElement.classList.add(styles.navTabActive);
      isTopNavOpened.current = 1;
    },10)
  }

  const handleTopNavButtonMove = (e) => {
    if(isTopNavOpened.current){
      removeNavTabActive(e.target);
      // setTimeout(()=>{
        e.target.parentElement.classList.add(styles.navTabActive);
        isTopNavOpened.current = 1;
      // },10)
    }
  }

  return <>
    <div className={styles.app}>
      <div className={styles.top}>
        <div className={styles.logo}>
          <img alt='Logo' src="/favicon.ico.svg"/>
        </div>
        <nav>
          <ul className={styles.navList}>
            <li>
              <button onClick={(e)=>{handleTopNavButtonClick(e)}} onMouseMove={ (e)=>{handleTopNavButtonMove(e)} }>File</button>
              <div className={styles.menu}>
                <div className={styles.group}>
                  <div className={styles.row}>New Text File</div>
                  <div className={styles.row}>New File</div>
                  <div className={styles.row}>New Window</div>
                  <div className={styles.row}>New Folder</div>
                </div>
                <div className={styles.group}>
                  <div className={styles.row}>Save As</div>
                  <div className={styles.row}>Save File</div>
                </div>
                <div className={styles.group}>
                  <div className={styles.row}>Close Editor</div>
                  <div className={styles.row}>Close Folder</div>
                  <div className={styles.row}>Close Window</div>
                </div>
                <div className={styles.group}>
                  <div className={styles.row}>Exit</div>
                </div>
              </div>
            </li>
            <li>
              <button onClick={(e)=>{handleTopNavButtonClick(e)}} onMouseMove={ (e)=>{handleTopNavButtonMove(e)} }>Edit</button>
              <div className={styles.menu}>
                <div className={styles.group}>
                  <div className={styles.row}>Undo</div>
                  <div className={styles.row}>Redo</div>
                </div>
                <div className={styles.group}>
                  <div className={styles.row}>Cut</div>
                  <div className={styles.row}>Copy</div>
                  <div className={styles.row}>Paste</div>
                </div>
                <div className={styles.group}>
                  <div className={styles.row}>Find</div>
                  <div className={styles.row}>Replace</div>
                </div>
                <div className={styles.group}>
                  <div className={styles.row}>Find in Files</div>
                  <div className={styles.row}>Replace in Files</div>
                </div>
                <div className={styles.group}>
                  <div className={styles.row}>Toggle Line Comment</div>
                  <div className={styles.row}>Toggle Block Comment</div>
                </div>
              </div>
            </li>
            <li>
              <button onClick={(e)=>{handleTopNavButtonClick(e)}} onMouseMove={ (e)=>{handleTopNavButtonMove(e)} }>Selection</button>
              <div className={styles.menu}>
                <div className={styles.group}>
                  <div className={styles.row}>Select All</div>
                  <div className={styles.row}>Expand All</div>
                  <div className={styles.row}>Shrink All</div>
                </div>
                <div className={styles.group}>
                  <div className={styles.row}>Copy Line Up</div>
                  <div className={styles.row}>Copy Line Down</div>
                  <div className={styles.row}>Move Line Up</div>
                  <div className={styles.row}>Move Line Down</div>
                  <div className={styles.row}>Duplicate Selection</div>
                </div>
                <div className={styles.group}>
                  <div className={styles.row}>Add Cursor Above</div>
                  <div className={styles.row}>Add Cursor Below</div>
                  <div className={styles.row}>Add Cursor to Line Ends</div>
                  <div className={styles.row}>Add Next Occurance</div>
                  <div className={styles.row}>Add Previous Occurance</div>
                  <div className={styles.row}>Select All Occurance</div>
                </div>
              </div>
            </li>
            
            <li>
              <button onClick={(e)=>{handleTopNavButtonClick(e)}} onMouseMove={ (e)=>{handleTopNavButtonMove(e)} }>View</button>
              <div className={styles.menu}>
                <div className={styles.group}>
                  <div className={styles.row}>Command Palette...</div>
                  <div className={styles.row}>Open View</div>
                </div>
                <div className={styles.group}>
                  <div className={styles.row}>Explorer</div>
                  <div className={styles.row}>Search</div>
                  <div className={styles.row}>Source Control</div>
                  <div className={styles.row}>Run</div>
                  <div className={styles.row}>Extensions</div>
                </div>
                <div className={styles.group}>
                  <div className={styles.row}>Chat</div>
                  <div className={styles.row}>AI Edits</div>
                </div>
                <div className={styles.group}>
                  <div className={styles.row}>Problems</div>
                  <div className={styles.row}>Outputs</div>
                  <div className={styles.row}>Debug Console</div>
                  <div className={styles.row}>Terminal</div>
                </div>
                <div className={styles.group}>
                  <div className={styles.row}>Word Wrap</div>
                </div>
              </div>
            </li>
            
            <li>
              <button onClick={(e)=>{handleTopNavButtonClick(e)}} onMouseMove={ (e)=>{handleTopNavButtonMove(e)} }>Go</button>
              <div className={styles.menu}>
                <div className={styles.group}>
                  <div className={styles.row}>Back</div>
                  <div className={styles.row}>Forward</div>
                  <div className={styles.row}>Last Edit Location</div>
                </div>
                <div className={styles.group}>
                  <div className={styles.row}>Switch Editor</div>
                  <div className={styles.row}>Switch Group</div>
                </div>
                <div className={styles.group}>
                  <div className={styles.row}>Go to File...</div>
                  <div className={styles.row}>Go to Symbol in Workspace...</div>
                </div>
                <div className={styles.group}>
                  <div className={styles.row}>Go to Symbol in Editor...</div>
                  <div className={styles.row}>Go to Definition</div>
                  <div className={styles.row}>Go to Declaration</div>
                  <div className={styles.row}>Go to Type Definition</div>
                  <div className={styles.row}>Go to Implementations</div>
                  <div className={styles.row}>Go to References</div>
                </div>
                <div className={styles.group}>
                  <div className={styles.row}>Go to Line/Column...</div>
                  <div className={styles.row}>Go to Bracket</div>
                </div>
                <div className={styles.group}>
                  <div className={styles.row}>Next Problem</div>
                  <div className={styles.row}>Previous Problem</div>
                </div>
                <div className={styles.group}>
                  <div className={styles.row}>Next Change</div>
                  <div className={styles.row}>Previous Change</div>
                </div>
              </div>
            </li>
            
              
            <li>
              <button onClick={(e)=>{handleTopNavButtonClick(e)}} onMouseMove={ (e)=>{handleTopNavButtonMove(e)} }>Run</button>
              <div className={styles.menu}>
                <div className={styles.group}>
                  <div className={styles.row}>Start Debugging</div>
                  <div className={styles.row}>Run Without Debugging</div>
                  <div className={`${styles.row} ${styles.disabled}`}>Stop Debugging</div>
                  <div className={`${styles.row} ${styles.disabled}`}>Restart Debugging</div>
                </div>
                <div className={styles.group}>
                  <div className={`${styles.row} ${styles.disabled}`}>Open Configurations</div>
                  <div className={styles.row}>Add Configuration...</div>
                </div>
                <div className={styles.group}>
                  <div className={`${styles.row} ${styles.disabled}`}>Step Over</div>
                  <div className={`${styles.row} ${styles.disabled}`}>Step Into</div>
                  <div className={`${styles.row} ${styles.disabled}`}>Step Out</div>
                  <div className={`${styles.row} ${styles.disabled}`}>Continue</div>
                </div>
                <div className={styles.group}>
                  <div className={styles.row}>Toggle Breakpoint</div>
                  <div className={styles.row}>New Breakpoint</div>
                </div>
                <div className={styles.group}>
                  <div className={styles.row}>Enable All Breakpoints</div>
                  <div className={styles.row}>Disable All Breakpoints</div>
                  <div className={styles.row}>Remove All Breakpoints</div>
                </div>
                <div className={styles.group}>
                  <div className={styles.row}>Install Additional Debuggers</div>
                </div>
              </div>
            
            </li>
            
            <li>
              <button onClick={(e)=>{handleTopNavButtonClick(e)}} onMouseMove={ (e)=>{handleTopNavButtonMove(e)} }>Terminal</button>
              <div className={styles.menu}>
                <div className={styles.group}>
                  <div className={styles.row}>New Terminal</div>
                  <div className={styles.row}>Split Terminal</div>
                </div>
                
                <div className={styles.group}>
                  <div className={styles.row}>Run Task...</div>
                  <div className={styles.row}>Run Build Task...</div>
                  <div className={styles.row}>Run Active File</div>
                  <div className={styles.row}>Run Selected Text</div>
                </div>
                
                <div className={styles.group}>
                  <div className={styles.row}>Show Running Tasks</div>
                  <div className={styles.row}>Restart Running Task</div>
                  <div className={styles.row}>Terminate Task</div>
                </div>
                <div className={styles.group}>
                  <div className={styles.row}>Configure Tasks</div>
                  <div className={styles.row}>Configure Default Build Task</div>
                </div>
              </div>
            </li>
            
            <li>
              <button onClick={(e)=>{handleTopNavButtonClick(e)}} onMouseMove={ (e)=>{handleTopNavButtonMove(e)} }>Help</button>
              <div className={styles.menu}>
                <div className={styles.group}>
                  <div className={styles.row}>Welcome</div>
                  <div className={styles.row}>Show All Commands</div>
                  <div className={styles.row}>Documentation</div>
                  <div className={styles.row}>Editor Playground</div>
                  <div className={styles.row}>Show Release Notes</div>
                  <div className={styles.row}>Get Started with Accessibility Features</div>
                </div>
                
                <div className={styles.group}>
                  <div className={styles.row}>Keyboard Shortcuts Reference</div>
                  <div className={styles.row}>Video Tutorials</div>
                  <div className={styles.row}>Tips and Tricks</div>
                </div>
                
                <div className={styles.group}>
                  <div className={styles.row}>Join Us on YouTube</div>
                  <div className={styles.row}>Search Feature Requests</div>
                  <div className={styles.row}>Report Issue</div>
                </div>
                <div className={styles.group}>
                  <div className={styles.row}>View License</div>
                  <div className={styles.row}>Privacy Statement</div>
                </div>
                
                <div className={styles.group}>
                  <div className={styles.row}>Toggle Developer Tools</div>
                  <div className={styles.row}>Open Process Explorer</div>
                </div>
                
                <div className={styles.group}>
                  <div className={styles.row}>Check for Updates...</div>
                </div>
                
                <div className={styles.group}>
                  <div className={styles.row}>About</div>
                </div>
              </div>
            </li>
          </ul>
          <span><a target='_blank' href='https://github.com/7777Satish/CodeEditor'>Open Source &copy; Satish Singh</a></span>
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