import React , {useState , useEffect} from 'react'
import { a } from '@react-spring/web'
import { Slider } from './Slider'
import { items } from './items'

import styles from './styles.module.css'

export default function Gallery(){

  const [activeIndex, setActiveIndex] = useState(0);

  return <>

    <div className={`flex fill center ${styles.container}`}>
      <div className={styles.main}>
        <Slider items={items} width={700} visible={3} setActiveIndex={setActiveIndex}>
          {({ imageUrl }, i) => (
            <div className={styles.content}>
              <div className={styles.marker}>{String(i+ 1).padStart(2, '0')}</div>
              <a.div className={styles.image} style={{ backgroundImage: imageUrl }} />
            </div>
          )}
        </Slider>
      </div>
      <div className={styles.navbar}>
        {items.map((item, i) => (
          <div 
            key={i}
            className={`${styles.dot} ${i === activeIndex ? styles.active : ' '}`}
            onClick={() => {
              // setActiveIndex(i)
            }} 
          />
        ))}
        </div>
     </div>

    </>
    
}