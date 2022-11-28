import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import Image from 'next/image';
import Button from 'react-bootstrap/Button';
import img from '../public/LOGO.png';
import styles from '../styles/Navbar.module.css'
import Link from 'next/link'
const  navbar= () => {
    return ( 
  
    <Navbar className={styles.back} expand="lg">
       
      <Container >
        <Navbar.Brand className={styles.txtColor} href="#"> 
        <Image
            src={img}
            alt="Picture of the author"
            width={60}
            height={60}
            />  NEXT-EDU</Navbar.Brand>
       
        <Button variant="outline-primary" className={styles.link}><Link href='/login' className={styles.link}>Login</Link></Button>
      </Container>
    </Navbar>
     );
}
 
export default navbar;