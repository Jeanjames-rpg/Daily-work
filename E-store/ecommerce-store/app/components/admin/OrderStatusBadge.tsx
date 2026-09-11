type OrderStatusBadgeProps = {
    status: string;
};

export default function OrderStatusBadge({status,}: OrderStatusBadgeProps) {
    return (
        <span className="rounded-full bg-yellow-100 px-4 py-2 text-sm font-semibold text-yellow-700">
            {status}
        </span>
    );
}