import { FiShoppingCart } from "react-icons/fi";
import { useParams } from "react-router-dom";

import { getImgUrl } from "../../utils/getImgUrl";
import { useDispatch } from "react-redux";
import { addToCart } from "../../redux/features/cart/cartSlice";
import { useFetchBookByIdQuery } from "../../redux/features/books/booksApi";

const SingleBook = () => {
  const { id } = useParams();
  const { data: book, isLoading, isError } = useFetchBookByIdQuery(id);

  const dispatch = useDispatch();

  const handleAddToCart = (product) => {
    dispatch(addToCart(product));
  };

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error happending to load book info</div>;
  return (
    <div className="max-w-screen-2xl mx-auto px-4 py-10 bg-white shadow rounded-md">
      <div className="flex flex-col md:flex-row gap-12">
        {/* Left Side: Image */}
        <div className="md:w-1/3 w-full flex justify-center">
          <img
            src={`${getImgUrl(book.coverImage)}`}
            alt={book.title}
            className="w-full max-w-sm rounded-lg shadow-lg object-cover hover:scale-105 transition-transform duration-300"
          />
        </div>

        {/* Right Side: Details */}
        <div className="md:w-2/3 w-full space-y-6">
          <div>
            <h1 className="text-4xl font-bold text-gray-900 mb-2 font-primary">
              {book.title}
            </h1>
            <p className="text-lg text-gray-600">
              by <span className="font-semibold text-primary">{book.author || "Unknown Author"}</span>
            </p>
          </div>

          <div className="flex items-center gap-4">
            <span className="bg-blue-100 text-blue-800 text-xs font-semibold px-2.5 py-0.5 rounded dark:bg-blue-200 dark:text-blue-800 capitalize">
              {book?.category}
            </span>
            <span className="text-gray-500 text-sm">
              Published: {new Date(book?.createdAt).toLocaleDateString()}
            </span>
          </div>

          <div>
            <p className="text-gray-700 leading-relaxed text-lg">
              <strong>Description:</strong> {book.description}
            </p>
          </div>

          <div className="flex items-center gap-4 mt-8">
            <span className="text-3xl font-bold text-gray-900">${book.newPrice}</span>
            {book.oldPrice && (
              <span className="text-xl text-gray-400 line-through">${book.oldPrice}</span>
            )}
          </div>

          <button
            onClick={() => handleAddToCart(book)}
            className="btn-primary w-full md:w-auto px-8 py-3 flex items-center justify-center gap-2 text-lg"
          >
            <FiShoppingCart className="size-5" />
            <span>Add to Cart</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default SingleBook;
