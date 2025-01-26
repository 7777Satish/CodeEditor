import { VscClose, VscJson } from 'react-icons/vsc';
import styles from './NavigationTab.module.css';
import { IoCode } from 'react-icons/io5';
import { IoLogoJavascript } from 'react-icons/io';
import { FaHashtag, FaJava, FaPython } from 'react-icons/fa';
import { FaC } from 'react-icons/fa6';

function NavigationTab({ item, filetype, name, opened }) {
    const fileIcons = {
        html: <IoCode style={{ color: 'orange' }} />,
        css: <FaHashtag style={{ color: 'slateblue' }} />,
        js: <IoLogoJavascript style={{ color: '#CCCC00' }} />,
        python: <FaPython style={{ color: '#306998' }} />,
        c: <FaC style={{ color: '#A8B9CC' }} />,
        java: <FaJava style={{ color: '#b07219' }} />,
        json: <VscJson style={{ color: '#cbcb41' }} />
    };

    const handleClose = (event) => {
        event.stopPropagation();
        item.close();
    }
    
    const handleOpen = () => {
        item.file();
    }

    return (
        <div  onClick={handleOpen} className={`${styles.main}${opened ? ` ${styles.active}` : ""}`}>
            <span className={styles.icon}>
                {fileIcons[filetype] || 'T'}
            </span>
            <span>{name}</span>
            <button onClick={handleClose} className={opened ? `${styles.btnActive}` : ""}><VscClose /></button>
        </div>
    );
}

export default NavigationTab;