import LeftMenuExplorer from './LeftMenuExplorer';
import LeftMenuSearch from './LeftMenuSearch';
import LeftMenuSource from './LeftMenuSourceControl';
import LeftMenuRun from './LeftMenuRun';
import LeftMenuExtensions from './LeftMenuExtensions';

function LeftMenu({tabId}){
    function renderTab(){
        switch(tabId){
            case "0":
                return <LeftMenuExplorer />
            case "1":
                return <LeftMenuSearch />
            case "2":
                return <LeftMenuSource />
            case "3":
                return <LeftMenuRun />
            case "4":
                return <LeftMenuExtensions />
            default:
                return <LeftMenuExplorer />
        }
    }

    return <>
        {renderTab()}
    </>
}

export default LeftMenu;