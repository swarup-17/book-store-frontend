import { useAuth } from "../../context/AuthContext";
import { useGetFavoritesByEmailQuery } from "../../redux/features/favorites/favoriteApi";
import BookCard from "../books/BookCard";
import { HiHeart } from "react-icons/hi2";

const FavoritesPage = () => {
    const { currentUser } = useAuth();
    const {
        data: favoriteBookIds = [],
        isLoading,
        isError,
    } = useGetFavoritesByEmailQuery(currentUser?.email, {
        skip: !currentUser,
    });

    const favorites = favoriteBookIds;

    if (isLoading) return <div className="flex items-center justify-center min-h-screen"><div className="text-lg">Loading...</div></div>;
    if (isError) return <div className="flex items-center justify-center min-h-screen"><div className="text-lg text-red-500">Error getting favorites</div></div>;

    return (
        <div className="py-8 md:py-12 lg:py-16 min-h-screen bg-gray-50">
            <div className="max-w-screen-2xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center gap-3 mb-6 md:mb-8 lg:mb-10">
                    <HiHeart className="size-8 md:size-10 text-red-500" />
                    <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-800">My Favorites</h1>
                </div>

                {favorites.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 md:gap-6 lg:gap-8">
                        {favorites.map((book) => (
                            <BookCard key={book._id} book={book} />
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-16 md:py-20 bg-white rounded-xl shadow-sm border border-gray-100">
                        <HiHeart className="size-16 md:size-20 text-gray-300 mx-auto mb-4" />
                        <p className="text-gray-500 text-base md:text-lg mb-2">
                            You have no favorite books yet.
                        </p>
                        <p className="text-gray-400 text-sm md:text-base">
                            Start exploring and add books to your favorites!
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default FavoritesPage;
