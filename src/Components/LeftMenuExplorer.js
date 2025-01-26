import styles1 from './LeftMenuCommon.module.css';
import styles from './LeftMenuExplorer.module.css';
import { useContext, useState, useEffect, memo } from 'react';
import { FileManagerContext } from '../App';
import { IoChevronDown, IoChevronForward, IoCode } from 'react-icons/io5';
import { IoIosMore, IoLogoJavascript } from 'react-icons/io';
import { FaHashtag, FaJava, FaPython } from 'react-icons/fa';
import { FaC } from 'react-icons/fa6';
import { VscClose, VscJson } from 'react-icons/vsc';
import { HiOutlineClipboardDocumentList } from 'react-icons/hi2';

/* ========= Folder Structure ========= */
function FolderStructure({ item }) {
  const { folder, setFolder, openedTabs } = useContext(FileManagerContext);
  const [count, setCount] = useState(0);
  const handleExpand = async () => {
    await item.expand();
    setCount((prev) => prev + 1); // Trigger re-render
  };

  const handleContract = async () => {
    await item.contract();
    setCount((prev) => prev + 1); // Trigger re-render
  };

  const handleFile = () => {
    item.file();
  }
  const fileIcons = {
    html: <IoCode style={{ color: 'orange' }} />,
    css: <FaHashtag style={{ color: 'slateblue' }} />,
    js: <IoLogoJavascript style={{ color: '#CCCC00' }} />,
    python: <FaPython style={{ color: '#306998' }} />,
    c: <FaC style={{ color: '#A8B9CC' }} />,
    java: <FaJava style={{ color: '#b07219' }} />,
    json: <VscJson style={{ color: '#cbcb41' }} />
  };

  if (item.kind === 'file') {
    return <div onClick={handleFile} className={styles.fileName}>{fileIcons[item.name.split('.')[1]] || <IoCode style={{ color: 'orange' }} />}{item.name}</div>
  }
  if (item.kind === 'directory' && !item.opened) {
    return <div onClick={handleExpand} className={styles.folderName}>
      <IoChevronForward />{item.name}
    </div>
  }
  return <div className={styles.folder}>
    <div onClick={handleContract} className={styles.folderName}><IoChevronForward />{item.name}</div>
    <div className={styles.folderContent}>
      {item.structure.map((elm) => {
        return <FolderStructure key={new Date().getTime() + Math.random() * 10000} item={elm} />
      })}
    </div>
  </div>;
}

// FolderStructure = memo(FolderStructure);

/* ========= Left Menu Explorer ========= */
function LeftMenuExplorer() {
  // The opened folder, tabs and current file
  const { folder, setFolder, openedTabs, setOpenedTabs, openedTabsRef, setOpenedTabsAndRef, files, setFiles } = useContext(FileManagerContext);
  
  class Item {
    constructor(name, kind, opened, handle, structure, id) {
      this.name = name;
      this.kind = kind;;
      this.opened = opened;
      this.handle = handle;
      this.structure = structure || [];
      this.id = id || new Date().getTime() + Math.floor(Math.random() * 1000);
    }

    async expand() {
      let tempS = await Array.fromAsync(this.handle.entries());
      let newS = tempS.map(([n, handle]) => {
        return new Item(n, handle.kind, false, handle, []);
      });
      this.structure = newS;
      this.opened = true;
    }

    async contract() {
      this.structure = [];
      this.opened = false;
    }

    getFileType(){
      if(this.kind == 'file'){
        return this.name.split('.')[1];
      }
    }

    close(){
      const index = openedTabsRef.current.ids.indexOf(this.id);
      setOpenedTabsAndRef((prev) => ({
        ids: prev.ids.filter((e,i)=>i!=index),
        items: prev.items.filter((e,i)=>i!=index),
      }));
      setFiles( (prev) => {
        return prev.filter((e,i)=>i!=prev.length-1);
      } );
    }

    async file() {
      if (!openedTabsRef.current.ids.includes(this.id)) {
        setOpenedTabsAndRef((prev) => ({
          ids: [...prev.ids, this.id],
          items: [...prev.items, this],
        }));
      }

      const f = await this.handle.getFile();
      const content = await f.text();
      const newFile = {
        name: f.name,
        filetype: f.type,
        content: content,
        id: this.id,
        handle: this.handle
      }
      setFiles((prev)=>{
        return [...prev, newFile];
      })
    }
  }

  class Folder extends Item { }

  // Which tabs are opened
  const [tabs, setTabs] = useState([
    { opened: true },
    { opened: false },
    { opened: false }
  ]);

  function nothing() {
    let a = openedTabs + setOpenedTabs + files + setFiles;
    nothing(a);
  }
  if (1 == 2) nothing();


  // Below function toggles the tab on click
  const handleTab = (e) => {
    let id = parseInt(e.currentTarget.getAttribute('data-tabid'));
    setTabs(tabs.map((t, i) => { return id === i ? { ...t, opened: !tabs[i].opened } : t }));
  }
  const folderClass = new Folder(folder.name, folder.kind, folder.opened, folder.handle, folder.structure, folder.id);
  // Returns neatly the structure/content of workspace tab
  const getStructure = () => {
    if (folder.name) {
      return <>
        <FolderStructure item={folderClass} />
      </>
    } else {
      return <>
        <span>You have not yet opened a folder</span>
        <button onClick={getFolder}>Open Folder</button>
        <button onClick={openRecentFolder}>Open Recent</button>
        <span>You can also open a remote repository or pull request while cloning</span>
        <button>Open Remote Repository</button>
      </>
    }
  }

  // Below function gets the folder from user and stores it in folder and localStorage
  const getFolder = async (e) => {
    try {
      var f = await window.showDirectoryPicker();
      let items = [];
      for await (const [name, handle] of f.entries()) {
        items.push(new Item(name, handle.kind, false, handle, []));
      }

      setFolder({ name: f.name, kind: folder, opened: true, handle: f, id: new Date().getTime() + Math.floor(Math.random() * 10000), structure: items });

      localStorage.setItem('recentFolder', JSON.stringify({ name: f.name, opened: f.opened, structure: items }));
    }
    catch (err) {
      console.log(err);
    }
  }

  // The below function sets the folder to the recent folder opened by user
  const openRecentFolder = () => {
    if (localStorage.recentFolder) {
      setFolder(JSON.parse(localStorage.recentFolder));
      return;
    }
  }

  return (
    <div className={styles1.main}>
      <div className={styles.nav}>
        <h4>Explorer</h4>
        <IoIosMore />
      </div>
      <div className={styles.bottom}>
        <div className={styles.tab}>
          <pre data-tabid={0} onClick={handleTab} className={styles.title}>
            {tabs[0].opened ? <IoChevronDown /> : <IoChevronForward />}<h5>Workspace</h5>
          </pre>
          <div className={`${styles.content} ${styles.content1} ${!tabs[0].opened ? styles.collapsed : ""}`}>

            {getStructure()}

          </div>
        </div>

        <div className={styles.tab}>
          <pre data-tabid={1} onClick={handleTab} className={styles.title}>
            {tabs[1].opened ? <IoChevronDown /> : <IoChevronForward />}<h5>Outline</h5>
          </pre>
          <div className={`${styles.content} ${styles.content2} ${!tabs[1].opened ? styles.collapsed : ""}`}>
            <span>The active editor cannot provide outline information</span>
          </div>
        </div>

        <div className={styles.tab}>
          <pre data-tabid={2} onClick={handleTab} className={styles.title}>
            {tabs[2].opened ? <IoChevronDown /> : <IoChevronForward />}<h5>Timeline</h5>
          </pre>
          <div className={`${styles.content} ${styles.content3} ${!tabs[2].opened ? styles.collapsed : ""}`}>
            <span>The active editor cannot provide outline information</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LeftMenuExplorer;