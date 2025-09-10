import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";

type Props = {
  images: string[];
  alt?: string;
  className?: string;
  autoplayMs?: number | null;
  slidesToShow?: 1 | 3;
  onImageClick?: (src: string) => void;
};

const Carousel = ({
  images,
  alt = "carousel image",
  className = "",
  autoplayMs = 4000,
  slidesToShow = 1,
  onImageClick,
}: Props) => {
  return (
    <div className={`relative rounded-lg bg-light ${className}`}>
      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        navigation
        pagination={{ clickable: true }}
        autoplay={autoplayMs ? { delay: autoplayMs, disableOnInteraction: false } : false}
        loop={true}
        slidesPerView={slidesToShow}
        spaceBetween={10}
        centeredSlides={slidesToShow === 3}
        className={`w-full h-64 sm:h-80 md:h-96 lg:h-[28rem] ${slidesToShow === 3 ? 'three-slide' : ''}`}
      >
        {images.map((src, i) => (
          <SwiperSlide key={src + i}>
            <img
              src={src}
              alt={`${alt} ${i + 1}`}
              className="w-full h-full object-cover rounded-lg cursor-pointer"
              onClick={() => onImageClick && onImageClick(src)}
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default Carousel;
