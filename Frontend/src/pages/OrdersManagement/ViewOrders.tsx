

interface Order {
    id: number;
    customerName: string;
    productName: string;
    orderDate: string;
    status: string;
}

const orders: Order[] = [
    { id: 1, customerName: 'John Doe', productName: 'Laptop', orderDate: '2024-11-10', status: 'Shipped' },
    { id: 2, customerName: 'Jane Smith', productName: 'T-shirt', orderDate: '2024-11-12', status: 'Pending' },
    { id: 3, customerName: 'Michael Johnson', productName: 'Smartphone', orderDate: '2024-11-14', status: 'Delivered' },
    { id: 4, customerName: 'Emily Davis', productName: 'Running Shoes', orderDate: '2024-11-15', status: 'Shipped' },
    { id: 5, customerName: 'Chris Lee', productName: 'Smartwatch', orderDate: '2024-11-17', status: 'Pending' },
];

const ViewOrders = () => {
    return (
        <div className="min-h-screen bg-gray-100 p-6">
            <div className="container mx-auto max-w-7xl bg-white shadow-lg rounded-lg p-6">
                <h1 className="text-2xl font-bold text-gray-700 mb-4">View Orders</h1>

                {/* Orders Table */}
                <table className="min-w-full bg-white rounded-lg shadow-sm">
                    <thead className="bg-gray-200">
                        <tr>
                            <th className="px-4 py-2 text-left">Order ID</th>
                            <th className="px-4 py-2 text-left">Customer Name</th>
                            <th className="px-4 py-2 text-left">Product Name</th>
                            <th className="px-4 py-2 text-left">Order Date</th>
                            <th className="px-4 py-2 text-left">Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {orders.map((order) => (
                            <tr key={order.id} className="hover:bg-gray-100">
                                <td className="px-4 py-2">{order.id}</td>
                                <td className="px-4 py-2">{order.customerName}</td>
                                <td className="px-4 py-2">{order.productName}</td>
                                <td className="px-4 py-2">{order.orderDate}</td>
                                <td className="px-4 py-2">
                                    <span
                                        className={`px-2 py-1 rounded-full ${order.status === 'Shipped'
                                            ? 'bg-green-200 text-green-800'
                                            : order.status === 'Pending'
                                                ? 'bg-yellow-200 text-yellow-800'
                                                : 'bg-blue-200 text-blue-800'
                                            }`}
                                    >
                                        {order.status}
                                    </span>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default ViewOrders;
