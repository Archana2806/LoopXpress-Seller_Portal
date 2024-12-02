import React, { useState } from 'react';

interface ReturnRequest {
    id: number;
    customerName: string;
    productName: string;
    orderDate: string;
    requestDate: string;
    status: string;
}

const returnRequests: ReturnRequest[] = [
    { id: 1, customerName: 'John Doe', productName: 'Laptop', orderDate: '2024-11-10', requestDate: '2024-11-15', status: 'Pending' },
    { id: 2, customerName: 'Jane Smith', productName: 'T-shirt', orderDate: '2024-11-12', requestDate: '2024-11-16', status: 'Approved' },
    { id: 3, customerName: 'Michael Johnson', productName: 'Smartphone', orderDate: '2024-11-14', requestDate: '2024-11-18', status: 'Pending' },
    { id: 4, customerName: 'Emily Davis', productName: 'Running Shoes', orderDate: '2024-11-15', requestDate: '2024-11-20', status: 'Rejected' },
    { id: 5, customerName: 'Chris Lee', productName: 'Smartwatch', orderDate: '2024-11-17', requestDate: '2024-11-19', status: 'Approved' },
];

const ReturnAndRefund = () => {
    const [selectedRequest, setSelectedRequest] = useState<ReturnRequest | null>(null);
    const [newStatus, setNewStatus] = useState<string>('');

    const handleStatusChange = (requestId: number) => {
        if (!newStatus) return;

        // Find the return request and update its status
        const updatedRequests = returnRequests.map((request) =>
            request.id === requestId ? { ...request, status: newStatus } : request
        );

        console.log('Updated Return Requests:', updatedRequests);
        // You can replace the console log with actual logic to update in your backend or state
    };

    return (
        <div className="min-h-screen bg-gray-100 p-6">
            <div className="container mx-auto max-w-7xl bg-white shadow-lg rounded-lg p-6">
                <h1 className="text-2xl font-bold text-gray-700 mb-4">Return and Refund Requests</h1>

                {/* Return Request Selection */}
                <div className="mb-4">
                    <label htmlFor="requestSelect" className="block text-gray-700">Select Return Request</label>
                    <select
                        id="requestSelect"
                        className="mt-1 block w-full px-4 py-2 border rounded-md focus:ring focus:ring-blue-300"
                        onChange={(e) => {
                            const requestId = parseInt(e.target.value, 10);
                            const request = returnRequests.find((request) => request.id === requestId);
                            setSelectedRequest(request || null);
                            setNewStatus(request ? request.status : '');
                        }}
                    >
                        <option value="">-- Select a Request --</option>
                        {returnRequests.map((request) => (
                            <option key={request.id} value={request.id}>
                                {`Request #${request.id} - ${request.productName}`}
                            </option>
                        ))}
                    </select>
                </div>

                {/* Display Selected Return Request */}
                {selectedRequest && (
                    <div className="bg-gray-50 p-4 rounded-md shadow-md mb-4">
                        <h2 className="text-lg font-semibold">{`Request #${selectedRequest.id} - ${selectedRequest.productName}`}</h2>
                        <p className="text-sm text-gray-600">{`Customer: ${selectedRequest.customerName}`}</p>
                        <p className="text-sm text-gray-600">{`Order Date: ${selectedRequest.orderDate}`}</p>
                        <p className="text-sm text-gray-600">{`Request Date: ${selectedRequest.requestDate}`}</p>
                        <p className="text-sm text-gray-600">{`Current Status: ${selectedRequest.status}`}</p>
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
                        disabled={!selectedRequest}
                    >
                        <option value="">-- Select Status --</option>
                        <option value="Pending">Pending</option>
                        <option value="Approved">Approved</option>
                        <option value="Rejected">Rejected</option>
                    </select>
                </div>

                {/* Update Button */}
                <button
                    onClick={() => {
                        if (selectedRequest) handleStatusChange(selectedRequest.id);
                    }}
                    className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 disabled:opacity-50"
                    disabled={!selectedRequest || !newStatus}
                >
                    Update Status
                </button>
            </div>
        </div>
    );
};

export default ReturnAndRefund;
