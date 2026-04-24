import { useState } from "react";
import API from "./api";

function Dashboard({ setAuth }) {
  const [data, setData] = useState([]);

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [product, setProduct] = useState("");
  const [location, setLocation] = useState("");
  const [date, setDate] = useState("");

  const [activeTab, setActiveTab] = useState("search");

  const [stats, setStats] = useState({
    total: 0,
    today: 0,
    upcoming: 0,
  });

  // ---------------- API CALLS ----------------

  const updateStatsBasic = (resData) => {
    setStats({
      total: resData.length,
      today: 0,
      upcoming: 0,
    });
  };

  const searchCustomer = async () => {
    const res = await API.post("/search", { name, phone });
    setData(res.data);
    updateStatsBasic(res.data);
  };

  const searchProduct = async () => {
    const res = await API.post("/product", { product });
    setData(res.data);
    updateStatsBasic(res.data);
  };

  const searchLocation = async () => {
    const res = await API.post("/location", { location });
    setData(res.data);
    updateStatsBasic(res.data);
  };

  const getServices = async () => {
    const res = await API.post("/services", { date });

    if (res.data.message) {
      alert(res.data.message);
      setData([]);
      return;
    }

    setData(res.data);

    const todayStr = new Date().toISOString().split("T")[0];

    let todayCount = 0;
    let upcomingCount = 0;

    res.data.forEach((item) => {
      const serviceDate = item["Service Date"];

      if (serviceDate === todayStr) {
        todayCount++;
      } else {
        upcomingCount++;
      }
    });

    setStats({
      total: res.data.length,
      today: todayCount,
      upcoming: upcomingCount,
    });
  };

  const logout = async () => {
    await API.get("/logout");
    setAuth(false);
  };

  const clearAll = () => {
    setName("");
    setPhone("");
    setProduct("");
    setLocation("");
    setDate("");
    setData([]);
    setStats({ total: 0, today: 0, upcoming: 0 });
  };

  // ---------------- UI ----------------

  return (
    <div className="flex h-screen bg-slate-900 text-white">

      {/* Sidebar */}
      <div className="w-64 bg-slate-800 p-5">
        <h2 className="text-xl font-bold mb-6">💧 Water CRM</h2>

        {["search", "product", "location", "services"].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`block mb-3 capitalize hover:text-blue-400 ${
              activeTab === tab ? "text-blue-400 font-semibold" : ""
            }`}
          >
            {tab}
          </button>
        ))}

        <button
          onClick={logout}
          className="mt-10 text-red-400 hover:text-red-600"
        >
          Logout
        </button>
      </div>

      {/* Main */}
      <div className="flex-1 p-6 overflow-auto">

        {/* Header */}
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-2xl font-semibold capitalize">
            {activeTab} Dashboard
          </h1>

          <button
            onClick={clearAll}
            className="bg-red-500 px-4 py-2 rounded hover:bg-red-600"
          >
            Clear All
          </button>
        </div>

        {/* KPI CARDS */}
        <div className="grid grid-cols-3 gap-4 mb-6">

          <div className="bg-slate-800 p-4 rounded shadow">
            <h4 className="text-gray-400">Total Records</h4>
            <p className="text-2xl font-bold">{stats.total}</p>
          </div>

          <div className="bg-slate-800 p-4 rounded shadow">
            <h4 className="text-gray-400">Today Services</h4>
            <p className="text-2xl font-bold text-green-400">
              {stats.today}
            </p>
          </div>

          <div className="bg-slate-800 p-4 rounded shadow">
            <h4 className="text-gray-400">Upcoming</h4>
            <p className="text-2xl font-bold text-yellow-400">
              {stats.upcoming}
            </p>
          </div>

        </div>

        {/* SEARCH SECTIONS */}

        {activeTab === "search" && (
          <div className="bg-slate-800 p-4 rounded mb-4">
            <h3 className="mb-3 text-lg font-semibold text-blue-300">
              Search Customer
            </h3>

            <div className="flex gap-3">
              <input
                value={name}
                placeholder="Name"
                className="p-2 bg-slate-700 rounded w-full"
                onChange={(e) => setName(e.target.value)}
              />

              <input
                value={phone}
                placeholder="Phone"
                className="p-2 bg-slate-700 rounded w-full"
                onChange={(e) => setPhone(e.target.value)}
              />

              <button
                onClick={searchCustomer}
                disabled={!name && !phone}
                className="bg-blue-500 px-4 rounded hover:bg-blue-600 disabled:opacity-50"
              >
                Search
              </button>
            </div>
          </div>
        )}

        {activeTab === "product" && (
          <div className="bg-slate-800 p-4 rounded mb-4">
            <h3 className="mb-3 text-lg font-semibold text-blue-300">
              Product Search
            </h3>

            <div className="flex gap-3">
              <input
                value={product}
                placeholder="Product"
                className="p-2 bg-slate-700 rounded w-full"
                onChange={(e) => setProduct(e.target.value)}
              />

              <button
                onClick={searchProduct}
                disabled={!product}
                className="bg-blue-500 px-4 rounded hover:bg-blue-600 disabled:opacity-50"
              >
                Search
              </button>
            </div>
          </div>
        )}

        {activeTab === "location" && (
          <div className="bg-slate-800 p-4 rounded mb-4">
            <h3 className="mb-3 text-lg font-semibold text-blue-300">
              Location Search
            </h3>

            <div className="flex gap-3">
              <input
                value={location}
                placeholder="Location"
                className="p-2 bg-slate-700 rounded w-full"
                onChange={(e) => setLocation(e.target.value)}
              />

              <button
                onClick={searchLocation}
                disabled={!location}
                className="bg-blue-500 px-4 rounded hover:bg-blue-600 disabled:opacity-50"
              >
                Search
              </button>
            </div>
          </div>
        )}

        {activeTab === "services" && (
          <div className="bg-slate-800 p-4 rounded mb-4">
            <h3 className="mb-3 text-lg font-semibold text-blue-300">
              Services
            </h3>

            <div className="flex gap-3">
              <input
                type="date"
                value={date}
                className="p-2 bg-slate-700 rounded"
                onChange={(e) => setDate(e.target.value)}
              />

              <button
                onClick={getServices}
                disabled={!date}
                className="bg-blue-500 px-4 rounded hover:bg-blue-600 disabled:opacity-50"
              >
                Find
              </button>
            </div>
          </div>
        )}

        {/* TABLE */}

        <div className="bg-slate-800 p-4 rounded">
          {data.length === 0 ? (
            <p className="text-gray-400">No data to display</p>
          ) : (
            <table className="w-full text-sm">
              <thead>
                <tr className="text-blue-400 border-b border-slate-700">
                  {Object.keys(data[0]).map((k) => (
                    <th key={k} className="p-2 text-left">
                      {k}
                    </th>
                  ))}
                </tr>
              </thead>

              <tbody>
                {data.map((row, i) => (
                  <tr
                    key={i}
                    className={`border-t border-slate-700 ${
                      i % 2 === 0 ? "bg-slate-800" : "bg-slate-700"
                    } hover:bg-slate-600`}
                  >
                    {Object.values(row).map((v, j) => (
                      <td key={j} className="p-2">
                        {v}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>

      </div>
    </div>
  );
}

export default Dashboard;