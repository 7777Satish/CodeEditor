import { IoIosMore } from 'react-icons/io';
import styles1 from './LeftMenuCommon.module.css';
import styles from './LeftMenuExplorer.module.css';
import { IoChevronDown, IoChevronForward } from 'react-icons/io5';
import { useState } from 'react';

function LeftMenuExplorer() {
  const [tabs, setTabs] = useState([
    {opened:true},
    {opened: false},
    {opened:false}
  ]);

  const handleTab = (e) => {
    let id = e.currentTarget.getAttribute('data-tabid');
    let nt = tabs.map((t,i)=>{});
    setTabs(tabs.map((t,i)=>{return id==i ? {...t,opened:!tabs[i].opened} : t}));
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
            {tabs[0].opened?<IoChevronDown />:<IoChevronForward />}<h5>No Active Folders</h5>
          </pre>
          <div className={`${styles.content} ${styles.content1} ${!tabs[0].opened?styles.collapsed:""}`}>
            <span>You have not yet opened a folder</span>
            <button>Open Folder</button>
            <button>Open Recent</button>
            <span>You can also open a remote repository or pull request while cloning</span>
            <button>Open Remote Repository</button>
          </div>
        </div>
        
        <div className={styles.tab}>
          <pre data-tabid={1} onClick={handleTab} className={styles.title}>
            {tabs[1].opened?<IoChevronDown />:<IoChevronForward />}<h5>Outline</h5>
          </pre>
          <div className={`${styles.content} ${styles.content2} ${!tabs[1].opened?styles.collapsed:""}`}>
            <span>The active editor cannot provide outline information</span>
          </div>
        </div>
        
        <div className={styles.tab}>
          <pre data-tabid={2} onClick={handleTab} className={styles.title}>
            {tabs[2].opened?<IoChevronDown />:<IoChevronForward />}<h5>Timeline</h5>
          </pre>
          <div className={`${styles.content} ${styles.content3} ${!tabs[2].opened?styles.collapsed:""}`}>
            <span>The active editor cannot provide outline information</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LeftMenuExplorer;