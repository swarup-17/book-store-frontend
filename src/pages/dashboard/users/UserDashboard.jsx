import { useAuth } from "../../../context/AuthContext";
import { useGetOrderByEmailQuery } from "../../../redux/features/orders/ordersApi";

const UserDashboard = () => {
  const { currentUser } = useAuth();
  const {
    data: orders = [],
    isLoading,
    isError,
  } = useGetOrderByEmailQuery(currentUser?.email);

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error getting orders data</div>;

  return (
    <div className="bg-gray-50 py-16 min-h-screen">
      <div className="max-w-4xl mx-auto px-4">
        <div className="bg-white shadow-md rounded-lg p-8 mb-8">
          <h1 className="text-3xl font-bold mb-4">Welcome, {currentUser?.name || "User"}!</h1>
          <p className="text-gray-600">
            Access your recent orders and account details here.
          </p>
        </div>

        <div>
          <h2 className="text-2xl font-semibold mb-6">Your Recent Orders</h2>
          {orders.length > 0 ? (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-2">
              {orders.map((order) => (
                <div
                  key={order._id}
                  className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow"
                >
                  <div className="flex justify-between items-center mb-4 border-b pb-2">
                    <span className="text-sm text-gray-500">Order ID: <span className="font-mono text-gray-800">#{order._id.slice(-6)}</span></span>
                    <span className="text-sm text-gray-500">{new Date(order?.createdAt).toLocaleDateString()}</span>
                  </div>

                  <div className="mb-4">
                    <p className="text-sm text-gray-600 mb-1">Total Amount:</p>
                    <p className="text-2xl font-bold text-primary">${order.totalPrice}</p>
                  </div>

                  <div className="space-y-1">
                    <p className="text-sm font-medium text-gray-700">Products ({order.productIds.length}):</p>
                    <ul className="text-sm text-gray-600 list-disc list-inside">
                      {order.productIds.map((product) => (
                        <li key={product._id}>{product.title}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12 bg-white rounded-lg shadow-sm">
              <p className="text-gray-500 mb-4">You haven&apos;t placed any orders yet.</p>
              <a href="/" className="btn-primary px-6 py-2 rounded-md">Start Shopping</a>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;
