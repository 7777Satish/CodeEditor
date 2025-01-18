import { IoIosMore } from 'react-icons/io';
import styles1 from './LeftMenuCommon.module.css';
import styles from './LeftMenuExplorer.module.css';
import { IoChevronDown } from 'react-icons/io5';

function LeftMenuExplorer() {
  return (
    <div className={styles1.main}>
      <div className={styles.nav}>
        <h4>Explorer</h4>
        <IoIosMore />
      </div>
      <div className={styles.bottom}>
        <div className={styles.tab}>
          <pre className={styles.title}>
            <IoChevronDown /><h3>No Active Folders</h3>
          </pre>
          <div className={styles.content}>
            <span>You have not yet opened a folder</span>
            <button>Open Folder</button>
            <button>Open Recent</button>
          </div>
        </div>
        
        <div className={styles.tab}>
          <pre className={styles.title}>
            <IoChevronDown /><h3>Outline</h3>
          </pre>
          <div className={styles.content}>
            <span>The active editor cannot provide outline information</span>
          </div>
        </div>
        
        <div className={styles.tab}>
          <pre className={styles.title}>
            <IoChevronDown /><h3>Timeline</h3>
          </pre>
          <div className={styles.content}>
            <span>The active editor cannot provide outline information</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LeftMenuExplorer;