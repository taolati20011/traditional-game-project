import {Swiper, SwiperSlide} from "swiper/react";
import { Navigation, Pagination, Scrollbar, A11y, EffectCube } from 'swiper';
import 'swiper/swiper-bundle.min.css';

const GroupGame = ({ slides }) => {
  return (
    <Swiper
      modules={[Navigation, Pagination, Scrollbar, A11y, EffectCube]}
      spaceBetween={30}
      slidesPerView={(slides.length) > 2 ? 3 : (slides.length)}
      slidesPerGroup={(slides.length) > 2 ? 3 : (slides.length)}
      navigation={true}
      effect={"fade"}
    >
      {slides.map((slide) => (
        <SwiperSlide key={slide.image}>
          <img src={slide.image} alt={slide.title} style={{height: 216, width: 332}}/>
          <figcaption>{slide.title}</figcaption>
        </SwiperSlide>
      ))}
    </Swiper>
  )

}

export default GroupGame;