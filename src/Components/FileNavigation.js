import styles from './FileNavigation.module.css';
import { useContext } from "react";
import NavigationTab from "./NavigationTab";
import { NavigationContext } from "../App";

function FileNavigation(){
    const {openedTabs, files} = useContext(NavigationContext);

    return <div className={styles.files}>
        { openedTabs.items.map( (item,i) => {
            return <NavigationTab item={item} key={new Date().getTime()+Math.floor(Math.random()*10000)} filetype={item.getFileType()} name={item.name} opened={item.id===files[files.length-1].id?true:false} />
        } ) }
    </div>
}

export default FileNavigation;