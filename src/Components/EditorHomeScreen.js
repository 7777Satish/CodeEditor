import styles from'./EditorHomeScreen.module.css';

function EditorHomeScreen(){
    return <div className={`right ${styles.main}`}>
        <img alt='codedesk' src='/favicon.ico.svg'/>
        <div className={styles.info}>
            <div className={styles.row}>
                <span>Show All Commands</span> <div className={styles.code}><code>CTRL</code> <code>Shift</code> <code>P</code></div>
            </div>
            <div className={styles.row}>
                <span>Open File</span> <div className={styles.code}><code>CTRL</code> <code>Shift</code> <code>P</code></div>
            </div>
            <div className={styles.row}>
                <span>Open Folder</span> <div className={styles.code}><code>CTRL</code> <code>Shift</code> <code>P</code></div>
            </div>
            <div className={styles.row}>
                <span>Open Recent</span> <div className={styles.code}><code>CTRL</code> <code>Shift</code> <code>P</code></div>
            </div>
            <div className={styles.row}>
                <span>Open Chat</span> <div className={styles.code}><code>CTRL</code> <code>Shift</code> <code>P</code></div>
            </div>
        </div>
    </div>
}

export default EditorHomeScreen;