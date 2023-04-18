import {Swiper, SwiperSlide} from "swiper/react";
import { Navigation, Pagination, Scrollbar, A11y, EffectCube } from 'swiper';
import 'swiper/swiper-bundle.min.css';

const toHref = (s) => {
  return "/game/" + s;
}

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
        (slide.image == "" ? null :
        <SwiperSlide key={slide.image}>
          <a href={toHref(slide.gameId)}>
            <img src={slide.image} alt={slide.title} style={{height: 216, width: 332}}/>
            <figcaption class="title-figcaption">{slide.title}</figcaption>
          </a>
        </SwiperSlide>
        )
      ))}
    </Swiper>
  )

}

export default GroupGame;