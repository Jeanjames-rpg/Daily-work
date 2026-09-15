import { getCurrentUser } from "@/lib/auth";
import Link from "next/link";
import { redirect } from "next/navigation";


export default async function AdminPage() {
    const user = await getCurrentUser();

    if (!user) {
        redirect("/login");
    }

    if (user.role !== "ADMIN" && user.role !== "OWNER") {
        redirect("/");
    }

    return (
        <main className="max-w-7xl mx-auto px-6 py-12">
            <div className="mb-10">
                <p className="text-sm font-medium text-indigo-600">
                    {user.role}
                </p>

                <h1 className="mt-2  text-4xl font-bold">
                    Admin Dashboard
                </h1>

                <p className="mt-2 text-gray-500">
                    Welcome back, {user.name}
                </p>
            </div>

            <div className="grid gap-6 md:grid-cols-3">
                <div className="rounded-2xl border bg-white p-6 shadow-sm">
                    <Link 
                        href="/admin/products"
                        className="text-lg font-semibold text-slate-500"
                    >
                        Products
                    </Link>

                    <p className="mt-2 text-gray-500">
                        Manage your store products.
                    </p>
                </div>

               <div className="rounded-2xl border bg-white p-6 shadow-sm">
                    <Link 
                        href="/admin/orders"
                        className="text-lg font-semibold text-slate-500"
                    >
                        Orders
                    </Link> 

                    <p className="mt-2 text-gray-500">
                        View and manage customer orders
                    </p>
               </div> 

               <div className="rounded-2xl border bg-white p-6 shadow-sm">
                    <h2 className="text-lg font-semibold text-slate-500">
                        Inventory
                    </h2>

                    <p className="mt-2 text-gray-500">
                        Manage product stock
                    </p>
               </div>
            </div>

            {user.role === "OWNER" && (
                <div>
                    <h2 className="text-lg font-semibold">
                        Owner Controls
                    </h2>

                    <p className="mt-2 text-gray-500">
                        Manage administartors and store settings
                    </p>
                </div>
            )}
        </main>
    );
}