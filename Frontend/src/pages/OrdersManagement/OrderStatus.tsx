import React, { useState } from 'react';

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

const OrderStatus = () => {
    const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
    const [newStatus, setNewStatus] = useState<string>('');

    const handleStatusChange = (orderId: number) => {
        if (!newStatus) return;

        // Find the order and update its status
        const updatedOrders = orders.map((order) =>
            order.id === orderId ? { ...order, status: newStatus } : order
        );

        console.log('Updated Orders:', updatedOrders);
        // You can replace the console log with actual logic to update in your backend or state
    };

    return (
        <div className="min-h-screen bg-gray-100 p-6">
            <div className="container mx-auto max-w-7xl bg-white shadow-lg rounded-lg p-6">
                <h1 className="text-2xl font-bold text-gray-700 mb-4">Update Order Status</h1>

                {/* Order Selection */}
                <div className="mb-4">
                    <label htmlFor="orderSelect" className="block text-gray-700">Select Order</label>
                    <select
                        id="orderSelect"
                        className="mt-1 block w-full px-4 py-2 border rounded-md focus:ring focus:ring-blue-300"
                        onChange={(e) => {
                            const orderId = parseInt(e.target.value, 10);
                            const order = orders.find((order) => order.id === orderId);
                            setSelectedOrder(order || null);
                            setNewStatus(order ? order.status : '');
                        }}
                    >
                        <option value="">-- Select an Order --</option>
                        {orders.map((order) => (
                            <option key={order.id} value={order.id}>
                                {`Order #${order.id} - ${order.productName}`}
                            </option>
                        ))}
                    </select>
                </div>

                {/* Display Selected Order */}
                {selectedOrder && (
                    <div className="bg-gray-50 p-4 rounded-md shadow-md mb-4">
                        <h2 className="text-lg font-semibold">{`Order #${selectedOrder.id} - ${selectedOrder.productName}`}</h2>
                        <p className="text-sm text-gray-600">{`Customer: ${selectedOrder.customerName}`}</p>
                        <p className="text-sm text-gray-600">{`Order Date: ${selectedOrder.orderDate}`}</p>
                        <p className="text-sm text-gray-600">{`Current Status: ${selectedOrder.status}`}</p>
                    </div>
                )}

                {/* Status Update */}
                <div className="mb-4">
                    <label htmlFor="statusSelect" className="block text-gray-700">Update Status</label>
                    <select
                        id="statusSelect"
                        className="mt-1 block w-full px-4 py-2 border rounded-md focus:ring focus:ring-blue-300"
                        value={newStatus}
                        onChange={(e) => setNewStatus(e.target.value)}
                        disabled={!selectedOrder}
                    >
                        <option value="">-- Select Status --</option>
                        <option value="Pending">Pending</option>
                        <option value="Shipped">Shipped</option>
                        <option value="Delivered">Delivered</option>
                        <option value="Canceled">Canceled</option>
                    </select>
                </div>

                {/* Update Button */}
                <button
                    onClick={() => {
                        if (selectedOrder) handleStatusChange(selectedOrder.id);
                    }}
                    className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 disabled:opacity-50"
                    disabled={!selectedOrder || !newStatus}
                >
                    Update Status
                </button>
            </div>
        </div>
    );
};

export default OrderStatus;
