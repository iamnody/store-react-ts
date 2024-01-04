import 'swiper/css'
import 'swiper/css/navigation'
import { Navigation } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'
import './Carousel.scss'

type Props = {}
export default function Carousel({}: Props) {
  return (
    <>
      <Swiper
        className='Carousel'
        loop={true}
        navigation={true}
        modules={[Navigation]}
      >
        {Array.from({ length: 4 }).map((_, i) => (
          <SwiperSlide key={i}>
            <img src={`/carousel/${i + 1}.png`} alt={'product.name'} />
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  )
}
