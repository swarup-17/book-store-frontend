import { FiShoppingCart } from "react-icons/fi";
import { getImgUrl } from "../../utils/getImgUrl";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addToCart } from "../../redux/features/cart/cartSlice";
import { HiHeart, HiOutlineHeart } from "react-icons/hi2";
import { useAuth } from "../../context/AuthContext";
import {
  useAddFavoriteMutation,
  useRemoveFavoriteMutation,
  useGetFavoritesByEmailQuery,
} from "../../redux/features/favorites/favoriteApi";

const BookCard = ({ book }) => {
  const dispatch = useDispatch();
  const { currentUser } = useAuth();
  const { data: favoriteBookIds = [], refetch } = useGetFavoritesByEmailQuery(
    currentUser?.email,
    {
      skip: !currentUser,
    }
  );
  const [addFavorite] = useAddFavoriteMutation();
  const [removeFavorite] = useRemoveFavoriteMutation();

  const isFavorite = favoriteBookIds.some(fav => fav._id === book._id);

  const handleAddToCart = (product) => {
    dispatch(addToCart(product));
  };

  const handleToggleFavorite = async () => {
    if (!currentUser) {
      alert("Please login to add to favorites");
      return;
    }

    try {
      if (isFavorite) {
        await removeFavorite({ email: currentUser.email, bookId: book._id });
        refetch();
      } else {
        await addFavorite({ email: currentUser.email, bookId: book._id });
        refetch();
      }
    } catch (error) {
      console.error("Failed to toggle favorite:", error);
    }
  };

  return (
    <div className="rounded-lg transition-all duration-300 hover:shadow-xl hover:-translate-y-1 relative">
      <div className="flex flex-col sm:flex-row sm:items-center sm:h-72 sm:justify-center gap-4 bg-white p-4 rounded-xl shadow-md border border-gray-100">
        <div className="sm:h-72 sm:flex-shrink-0 rounded-md overflow-hidden relative group">
          <Link to={`/books/${book._id}`}>
            <img
              src={`${getImgUrl(book?.coverImage)}`}
              alt=""
              className="w-full h-full object-cover rounded-md cursor-pointer transition-transform duration-300 group-hover:scale-105"
            />
          </Link>
        </div>

        <div className="flex flex-col justify-between h-full py-2 w-full">
          <div>
            <Link to={`/books/${book._id}`}>
              <h3 className="text-xl font-semibold hover:text-primary mb-2 transition-colors line-clamp-1">
                {book?.title}
              </h3>
            </Link>
            <p className="text-gray-600 mb-4 line-clamp-3 text-sm">
              {book?.description.length > 80
                ? `${book.description.slice(0, 80)}...`
                : book?.description}
            </p>
            <p className="font-medium mb-4">
              ${book?.newPrice}{" "}
              <span className="line-through font-normal ml-2 text-gray-500">
                $ {book?.oldPrice}
              </span>
            </p>
          </div>
          <div className="flex items-center justify-around">
            <button
              onClick={() => handleAddToCart(book)}
              className="px-4 py-1.5 flex items-center gap-1 bg-primary text-white rounded hover:bg-indigo-600 transition-colors shadow text-sm font-medium w-fit"
            >
              <FiShoppingCart className="size-4" />
              <span>Add to Cart</span>
            </button>
            <button
              onClick={handleToggleFavorite}
              className={`p-2 rounded-full transition-colors ${isFavorite
                ? "bg-red-50 text-red-500 hover:bg-red-100"
                : "bg-gray-100 text-gray-500 hover:bg-gray-200"
                }`}
            >
              {isFavorite ? (
                <HiHeart className="size-5" />
              ) : (
                <HiOutlineHeart className="size-5" />
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookCard;
