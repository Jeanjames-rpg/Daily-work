const alertStyles = {
    success: "bg-green-50 text-green-800 border-green-200",
    error:"bg-red-50 text-red-800 border-red-200",
    warning: "bg-yellow-50 text-yellow-800 border-yellow-200 ",
    info: "bg-blue-50 text-blue-800 border-blue-200",
};

function AlertComponent({ type = "info" , message, onClose }) {
    return (
        <div
            role="alert"
            className={`flex items-center justify-between rounded-lg border px-4 py-3 ${alertStyles[type]}`}
        >
            <p className="text-sm font-medium">{message}</p>

            {onClose && (
                <button
                    onClick={onClose}
                >
                    x
                </button>
            )}

        </div>
    );
}

export default AlertComponent;