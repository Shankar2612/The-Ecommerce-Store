import React from 'react'
import Carousel from 'react-material-ui-carousel'
import styles from "../styles/ImageCarousel.module.scss"

export default function ImageCarousel() {
    return (
        <Carousel className={styles.carouselContainer} 
            navButtonsProps={{          
                style: {
                    backgroundColor: 'transparent',
                    borderRadius: "50%",
                    top: "50%"
                }
            }} 
            navButtonsWrapperProps={{  
                style: {
                    top: '-5%',
                    height: "100%"
                }
            }} 
            PrevIcon={<img className={styles.prevImg} src="https://img.icons8.com/external-those-icons-fill-those-icons/40/000000/external-left-arrows-those-icons-fill-those-icons.png"/>}
            NextIcon={<img className={styles.nextImg} src="https://img.icons8.com/external-those-icons-fill-those-icons/40/000000/external-right-arrows-those-icons-fill-those-icons-1.png"/>}
            IndicatorIcon=''
            animation="slide"
            timeout={700}
            navButtonsAlwaysVisible={true}>
          <img className={styles.carouselImg} src="/images/carouselImageOne.jpg" />
          <img className={styles.carouselImg} src="/images/carouselImageTwo.jpg" />
          <img className={styles.carouselImg} src="/images/carouselImageThree.jpg" />
        </Carousel>
    )
}
