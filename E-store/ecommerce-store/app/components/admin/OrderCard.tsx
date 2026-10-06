import OrderStatusBadge from "./OrderStatusBadge";
import OrderStatusSelect from "./OrderStatusSelect";

type Product = {
  id: number;
  title: string;
  image: string;
};

type Variant = {
  id: number;
  sku: string;
  color: string | null;
  storage: string | null;
  price: string;
  stock: number;
  image: string | null;
}

type OrderItem = {
  id: number;
  quantity: number;
  price: string;
  product: Product;
  variant: Variant;
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
          {order.items.map((item) => {

            const image = item.variant.image || item.product.image;

            return (
              <div
                key={item.id}
                className="flex justify-between gap-4 rounded-lg bg-gray-50 p-4"
              >
                {/* Product information  */}
                <div className="flex gap-4">
                  {/* Image  */}
                  {image ? (
                    <img
                      src={image}
                      alt={item.product.title}
                      className="h-20 w-20 rounded-lg object-cover"
                    />
                  ) : (
                    <div className="flex h-20 w-20 items-center justify-center rounded-lg bg-gray-200 text-xs text-gray-500">
                        No Image
                    </div> 
                  )}

                  <div>
                    <p className="font-medium">
                      {item.product.title}
                    </p>

                    {/* Variant information  */}
                    {item.variant.color && (
                      <p className="text-sm text-gray-500">
                        Color: {item.variant.color}
                      </p>
                    )}

                    {item.variant.storage && (
                      <p className="text-sm text-gray-500">
                        Storage: {item.variant.storage}
                      </p>
                    )}

                    <p className="text-sm text-gray-500">
                      SKU: {item.variant.sku}
                    </p>

                    <p className="text-sm text-gray-500">
                      Quantity: {item.quantity}
                    </p>

                  </div>  

                </div>

                {/* Item Total  */}
                <div className="text-right">
                    <p className="font-semibold">
                      ₹
                      {(
                        Number(item.price) * item.quantity
                      ).toFixed(2)}
                    </p>

                    <p className="mt-1 text-sm text-gray-500">
                      ₹{Number(item.price).toFixed(2)} each
                    </p>
                </div>  

              </div> 
            
          );
        })}
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