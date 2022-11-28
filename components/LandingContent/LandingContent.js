import PageTxt from '../PageTxt/PageTxt'
import Image from 'next/image';
import img from '../../public/Webinar-pana.png';
import styles from './LandingContent.module.css'
const LandingContent = () => {
    return ( 
      <div className={styles.Container}>
        <div className={` container`}>
        <div className="row">
          <div className="col-md-6">
            <PageTxt/>
          </div>
          <div className="col-md-6">
          <Image
            src={img}
            alt="Picture of the author"
            width={500}
            height={500}
            />  
          </div>
        </div>
      </div>
      </div>
     );
}
 
export default LandingContent;