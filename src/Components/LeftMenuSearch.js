import styles1 from './LeftMenuCommon.module.css';

function LeftMenuSearch() {
  return (
    <div className={styles1.main}>
      <input type="text" placeholder="Search" />
    </div>
  );
}

export default LeftMenuSearch;