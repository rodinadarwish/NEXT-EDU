import Navbar from '../components/Navbar'
import styles from '../styles/login.module.css'
const login = () => {
    return (
    <div className={`${styles.back}`}>
        <Navbar/>
        <div className={`container`} >#Login here #Rodina Code </div>
    </div>
    );
}
export default login;