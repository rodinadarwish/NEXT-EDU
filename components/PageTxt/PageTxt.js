import styles from './Page.module.css'
const PageTxt = () => {
    return ( <>
        <div className={`${styles.txtContainer} container`}>
            <p className={styles.txt}>
            Welcome to Next-EDU,<br/>
            we are look forward to the future<br/>
            join us now!!
            </p>
        </div>
    </>  );
}
 
export default PageTxt;