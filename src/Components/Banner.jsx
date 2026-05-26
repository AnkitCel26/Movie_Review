import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

const Banner = ({ movies }) => {
  return (
    <Swiper
      modules={[Navigation, Pagination, Autoplay]}
      navigation
      pagination={{ clickable: true }}
      autoplay={{ delay: 3000 }}
      loop={true}
    >
      {movies.map((movie) => (
        <SwiperSlide key={movie.id}>
          <img
            src={`https://image.tmdb.org/t/p/original/${movie.backdrop_path}`}
            alt={movie.title}
            style={{
              width: '100%',
              height: '800px',
              objectFit: 'cover'
            }}
          />
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default Banner;