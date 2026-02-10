import BookCard from "../books/BookCard";
import { useFetchAllBooksQuery } from "../../redux/features/books/booksApi";

// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import required modules
import { Pagination, Navigation } from "swiper/modules";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

const Recommened = () => {
  const { data: books = [] } = useFetchAllBooksQuery();
  return (
    <div className="py-16">
      <h2 className="text-3xl font-semibold mb-6">Recommended for you </h2>

      {/* Swiper for Mobile and Tablet (below lg breakpoint) */}
      <div className="block lg:hidden">
        <Swiper
          slidesPerView={1}
          spaceBetween={30}
          navigation={true}
          breakpoints={{
            640: {
              slidesPerView: 1,
              spaceBetween: 20,
            },
            768: {
              slidesPerView: 2,
              spaceBetween: 40,
            },
          }}
          modules={[Pagination, Navigation]}
          className="mySwiper"
        >
          {books.length > 0 &&
            books.slice(8, 18).map((book, index) => (
              <SwiperSlide key={index}>
                <BookCard book={book} />
              </SwiperSlide>
            ))}
        </Swiper>
      </div>

      {/* Grid for Desktop (lg and above) */}
      <div className="hidden lg:grid lg:grid-cols-3 xl:grid-cols-4 gap-8">
        {books.length > 0 &&
          books.slice(8, 18).map((book, index) => (
            <BookCard key={index} book={book} />
          ))}
      </div>
    </div>
  );
};

export default Recommened;
