import OrderStatusBadge from "./OrderStatusBadge";
import OrderStatusSelect from "./OrderStatusSelect";

type Product = {
  id: number;
  title: string;
};

type OrderItem = {
  id: number;
  quantity: number;
  price: string;
  product: Product;
};

type User = {
  id: number;
  name: string;
  email: string;
};

export type AdminOrder = {
  id: number;
  total: string;
  status: string;
  createdAt: string;
  user: User;
  items: OrderItem[];
};

type OrderCardProps = {
    order: AdminOrder;
    onStatusUpdated: () => void;
};

export default function OrderCard({ order, onStatusUpdated }: OrderCardProps) {
    return (
        <div className="rounded-2xl border bg-white p-6 shadow-sm">
      {/* Order Header */}
      <div className="flex flex-col justify-between gap-4 md:flex-row">
        <div>
          <h2 className="text-xl font-bold text-slate-500">
            Order #{order.id}
          </h2>

          <p className="mt-1 text-gray-500">
            {new Date(order.createdAt).toLocaleString()}
          </p>
        </div>

        <OrderStatusBadge status={order.status} />

        <OrderStatusSelect status={order.status} orderId={order.id} onStatusUpdated={onStatusUpdated} />

      </div>

      {/* Customer */}
      <div className="mt-6 border-t pt-5 text-slate-600">
        <h3 className="font-semibold">
          Customer
        </h3>

        <p className="mt-1">
          {order.user.name}
        </p>

        <p className="text-sm text-gray-500">
          {order.user.email}
        </p>
      </div>

      {/* Products */}
      <div className="mt-6 border-t pt-5">
        <h3 className="font-semibold text-slate-800">
          Products
        </h3>

        <div className="mt-3 space-y-3 text-slate-700">
          {order.items.map((item) => (
            <div
              key={item.id}
              className="flex justify-between rounded-lg bg-gray-50 p-4"
            >
              <div>
                <p className="font-medium">
                  {item.product.title}
                </p>

                <p className="text-sm text-gray-500">
                  Quantity: {item.quantity}
                </p>
              </div>

              <p className="font-semibold">
                ₹
                {(
                  Number(item.price) * item.quantity
                ).toFixed(2)}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Total */}
      <div className="mt-6 flex justify-between border-t pt-5 text-slate-700">
        <span className="font-semibold">
          Total
        </span>

        <span className="text-xl font-bold">
          ₹{Number(order.total).toFixed(2)}
        </span>
      </div>
    </div>
  
    );
}