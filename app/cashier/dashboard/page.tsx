"use client";

import { useEffect, useState } from "react";
import { getCookie } from "@/lib/client-cookies";
import { BarChart, Bar, PieChart, Pie, Cell, Tooltip, Legend, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from "recharts";
import { FaUtensils, FaHistory } from "react-icons/fa";
import getMenuCount from "@/lib/getMenuCount";

const DashboardPage = () => {
    const [nameCashier, setNameCashier] = useState<string>("");
    const [menuCount, setMenuCount] = useState<number>(0);

    useEffect(() => {
        const fetchMenuCount = async () => {
            const count = await getMenuCount();
            setMenuCount(count);
        };

        fetchMenuCount();
    }, []);

    useEffect(() => {
        const cookieValue = getCookie("name") || "";
        console.log("Cookie name:", cookieValue);
        setNameCashier(cookieValue);
    }, []);

    const barData = [
        { name: "Product A", sales: 400 },
        { name: "Product B", sales: 300 },
        { name: "Product C", sales: 200 },
        { name: "Product D", sales: 500 }
    ];

    const pieData = [
        { name: "Category A", value: 40 },
        { name: "Category B", value: 30 },
        { name: "Category C", value: 20 },
        { name: "Category D", value: 10 }
    ];

    const COLORS = ["#8884d8", "#82ca9d", "#ffc658", "#ff8042"];

    return (
        <div className="min-h-screen p-6">
            <div className="bg-white p-6 rounded-lg shadow-md border-l-8 border-primary">
                <h1 className="text-2xl font-semibold text-gray-700">Dashboard</h1>
                <h2 className="text-lg text-gray-600 mt-2">Welcome, {nameCashier}</h2>
            </div>


            <div className="grid gap-6 lg:grid-cols-2 md:grid-cols-2">
                <div className="bg-white p-4 rounded-lg shadow-md flex items-center gap-4 border-l-8 border-primary mt-4">
                    <FaUtensils className="text-orange-400 text-2xl" />
                    <div>
                        <h3 className="text-sm text-gray-500">Menu Count</h3>
                        <h2 className="text-2xl font-bold text-orange-500">{menuCount}</h2>
                    </div>
                </div>

                <div className="bg-white p-4 rounded-lg shadow-md flex items-center gap-4 border-l-8 border-primary mt-4">
                    <FaHistory className="text-orange-400 text-2xl" />
                    <div>
                        <h3 className="text-sm text-gray-500">Past Order</h3>
                        <h2 className="text-2xl font-bold text-orange-500">0</h2>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                <div className="bg-white p-6 rounded-lg shadow-md border-l-8 border-primary">
                    <h3 className="text-lg font-semibold text-gray-700">Sales Overview</h3>
                    <ResponsiveContainer width="100%" height={300}>
                        <BarChart data={barData}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="name" />
                            <YAxis />
                            <Tooltip />
                            <Legend />
                            <Bar dataKey="sales" fill="#6B4EFF" />
                        </BarChart>
                    </ResponsiveContainer>
                </div>

                <div className="bg-white p-6 rounded-lg shadow-md border-l-8 border-primary">
                    <h3 className="text-lg font-semibold text-gray-700">Category Distribution</h3>
                    <ResponsiveContainer width="100%" height={300}>
                        <PieChart>
                            <Pie data={pieData} cx="50%" cy="50%" outerRadius={80} fill="#8884d8" dataKey="value" label>
                                {pieData.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                ))}
                            </Pie>
                            <Tooltip />
                            <Legend />
                        </PieChart>
                    </ResponsiveContainer>
                </div>
            </div>
        </div>
    );
};

export default DashboardPage;