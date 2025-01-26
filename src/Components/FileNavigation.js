import { useContext } from "react";
import NavigationTab from "./NavigationTab";
import { NavigationContext } from "../App";


function FileNavigation(){
    const {openedTabs, setOpenedTabs, openedTabsRef, setOpenedTabsAndRef} = useContext(NavigationContext);

    return <div className='files'>
        { openedTabs.items.map( (item,i) => {
            return <NavigationTab item={item} key={new Date().getTime()+Math.floor(Math.random()*10000)} filetype={item.getFileType()} name={item.name} opened={i==openedTabs.items.length-1?true:false} />
        } ) }
    </div>
}

export default FileNavigation;