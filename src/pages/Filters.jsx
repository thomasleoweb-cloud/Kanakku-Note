import { useEffect, useState, useMemo } from "react";

const Filters = () => {
  const [filters, setFilters] = useState({
    category: "All",
    startDate: "",
    endDate: "",
    amountRange: 0,
    maxLimit: 0,
    sortBy: "recent",
  });
    const [categoryList, setCategoryList] = useState([
      "All",
    "Bills",
    "Travel",
    "Food",
    "Entertainment",
    "Grocery",
    "Shopping",
    "Others",
  ]);
  const [allData, setAllData] = useState([]);
  const [editId, setEditId] = useState(null);
  const [editChange, setEditChange] = useState({
    amount: 0,
    category: "",
    date: "",
    note: "",
  });

  useEffect(() => {
    try {
      const data = JSON.parse(localStorage.getItem("expenses") || "[]");
      setAllData(data);
    } catch {
      console.error("Storage error:");
    }
  }, []);

  useEffect(() => {
    if (allData?.length > 0) {
      const max = Math.max(...allData?.map((item) => Number(item?.amount)));
      setFilters((prev) => ({ ...prev, maxLimit: max, amountRange: max }));
    }
    localStorage.setItem("expenses", JSON.stringify(allData));
  }, [allData]);

  const filteredData = useMemo(() => {
    let result = allData.filter((item) => {
      const matchCategory =
        filters.category === "All" || item.category === filters.category;

      const itemDate = new Date(item.date);
      const start = filters.startDate ? new Date(filters.startDate) : null;
      const end = filters.endDate ? new Date(filters.endDate) : null;
      const matchDate =
        (!start || itemDate >= start) && (!end || itemDate <= end);

      const matchAmount = Number(item.amount) <= Number(filters.amountRange);

      return matchCategory && matchDate && matchAmount;
    });

    return result.sort((a, b) => {
      switch (filters.sortBy) {
        case "recent":
          return new Date(b.date) - new Date(a.date);
        case "oldest":
          return new Date(a.date) - new Date(b.date);
        case "high":
          return Number(b.amount) - Number(a.amount);
        case "low":
          return Number(a.amount) - Number(b.amount);
        default:
          return 0;
      }
    });
  }, [allData, filters]);

  const handleDelete = (id) => {
    // console.log('delete id:', id)
    const deleted = filteredData?.filter((item, i) => item?.id !== id);
    setAllData(deleted);
  };

  const handleEdit = (item) => {
    setEditId(item?.id);
    setEditChange(item);
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;

    setEditChange((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSaveEdit = () => {
    setAllData((prev) =>
      prev.map((item) => (item.id === editId ? editChange : item)),
    );

    setEditId(null);
  };

  const handleCancelEdit = () => {
    setEditId(null);
  };

  const total = filteredData?.reduce(
    (sum, item) => sum + Number(item?.amount),
    0,
  );

  return (
    <div className="FilterComponentSec flex flex-col gap-10 px-5 pt-5">
          <div className="wrapper">
              <h1 className="Heading font-bold text-2xl">Filters</h1>
        <div className="filterBox border grid grid-cols-6 grid-rows-1 p-2 bg-blue-300">
            <div className="categoryFilterBox flex flex-col gap-3 col-span-1">
              <label htmlFor="" className="font-semibold">Category:</label>
              <select
                name="category"
                id="Category"
                value={filters?.category}
                onChange={(e) =>
                  setFilters({ ...filters, category: e.target.value })
                }
                placeholder="Enter Category"
                className="categoryIn border text-sm h-6 col-span-2 bg-white"
              >
                {categoryList?.map((item, i) => {
                  return (
                    <>
                      <option key={item} value={item}>
                        {item}
                      </option>
                    </>
                  );
                })}
              </select>
            </div>
            <div className="dateFilterBox flex justify-around gap-2 col-span-2">
              <div className="flex flex-col justify-between">
                  <label htmlFor="" className="font-semibold">From:</label>
                  <input
                    type="date"
                    name="startDate"
                    id="StartDate"
                    value={filters?.startDate}
                    onChange={(e) =>
                      setFilters({ ...filters, startDate: e.target.value })
                    }
                    className="dateIn border text-sm h-6 col-span-2 bg-white"
                  />
              </div>
              <div className="flex flex-col justify-between">
                  <label htmlFor="" className="font-semibold">To:</label>
                  <input
                    type="date"
                    name="endDate"
                    id="EndDate"
                    value={filters.endDate}
                    onChange={(e) =>
                      setFilters({ ...filters, endDate: e.target.value })
                    }
                    className="dateIn border text-sm h-6 col-span-2 bg-white"
                  />
              </div>
            </div>
            <div className="amountRangeBox flex flex-col justify-between col-span-1">
              <label className="font-semibold">Max Amount: &#8377;{filters.amountRange}</label>
              <input
                type="range"
                min="1"
                max={filters.maxLimit}
                value={filters.amountRange}
                onChange={(e) =>
                  setFilters({ ...filters, amountRange: e.target.value })
                }
                class="slider"
                id="myRange"
              ></input>
            </div>
            <div className="sortBox flex flex-col justify-between col-span-1 ml-3">
              <label htmlFor="" className="font-semibold">Sort By:</label>
                      <select
                          className="border bg-white"
                name="sortBy"
                id="SortBy"
                value={filters.sortBy}
                onChange={(e) => setFilters({ ...filters, sortBy: e.target.value })}
              >
                <option value="recent">Date: Recent to Old</option>
                <option value="oldest">Date: Old to Recent</option>
                <option value="high">Amount: High to Low</option>
                <option value="low">Amount: Low to High</option>
              </select>
            </div>
            <div className="clearBox flex items-center justify-center col-span-1">
              <button
                className="border px-2 bg-blue-300 font-semibold"
                onClick={() =>
                  setFilters({
                    category: "All",
                    startDate: "",
                    endDate: "",
                    amountRange: filters.maxLimit,
                      maxLimit: filters.maxLimit,
                    sortBy: 'recent'
                  })
                }
              >
                Clear
              </button>
            </div>
        </div>
      </div>

      <div className="TableSection">
        <div className="listSection w-5xl max-h-50 overflow-auto">
          <table className="ListTable border-collapse border border-gray-500 w-5xl">
            <thead className="sticky top-0 border">
              <tr>
                <th className="w-15 border bg-blue-400">Sl.No</th>
                <th className="w-35 border bg-blue-400">Date</th>
                <th className="w-45 border bg-blue-400">Category</th>
                <th className="w-62.5 border bg-blue-400">Note</th>
                <th className="w-30 border bg-blue-400">Amount</th>
                <th className="w-45 border bg-blue-400">Update</th>
                <th className="w-30 border bg-blue-400">Remove</th>
              </tr>
            </thead>

            <tbody>
              {filteredData?.map((item, i) => {
                // console.log("item-->", item)
                return (
                  <tr key={i} className="text-center">
                    <td className="border">{i + 1}</td>
                    <td className="border">
                      {editId === item?.id ? (
                        <input
                          name="date"
                          value={editChange?.date}
                          onChange={handleEditChange}
                        />
                      ) : (
                        item?.date
                      )}
                    </td>
                    <td className="border">
                      {editId === item?.id ? (
                        <select
                          name="category"
                          id="Category"
                          value={editChange?.category}
                          onChange={handleEditChange}
                          className="border"
                        >
                          {categoryList?.map((item, i) => {
                            return (
                              <>
                                <option value={item}>{item}</option>
                              </>
                            );
                          })}
                        </select>
                      ) : (
                        // <input
                        //   name="category"
                        //   value={editChange?.category}
                        //   onChange={handleEditChange}
                        // />
                        item?.category
                      )}
                    </td>
                    <td className="border">
                      {editId === item?.id ? (
                        <input
                          name="note"
                          value={editChange?.note}
                          onChange={handleEditChange}
                        />
                      ) : (
                        item?.note
                      )}
                    </td>
                    <td className="border">
                      {editId === item?.id ? (
                        <input
                          type="number"
                          name="amount"
                          value={editChange?.amount}
                          onChange={handleEditChange}
                        />
                      ) : (
                        item?.amount
                      )}
                    </td>
                    <td className="border">
                      {editId === item?.id ? (
                        <div className="flex justify-around">
                          <button
                            className="cursor-pointer border bg-blue-900 text-white px-2"
                            onClick={handleSaveEdit}
                          >
                            Save
                          </button>
                          <button
                            className="cursor-pointer border bg-red-900 text-white px-2"
                            onClick={handleCancelEdit}
                          >
                            X
                          </button>
                        </div>
                      ) : (
                        <button
                          className="cursor-pointer border px-2 bg-blue-800 text-white"
                          onClick={() => handleEdit(item)}
                        >
                          Edit
                        </button>
                      )}
                    </td>
                    <td className="border">
                      <button
                        onClick={() => handleDelete(item?.id)}
                        className="cursor-pointer border bg-red-900 text-white px-2"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                );
              })}
              <tr className="font-bold text-center">
                <td colSpan="3"></td>
                <td className="border">Total:&#8377;</td>
                <td className="border">{total}</td>
              </tr>
            </tbody>
          </table>
        </div>
        <h2 className="font-bold">
          <span className="text-red-700">*</span>&nbsp;Total amount spent this
          month: <span className="text-red-600">&#8377; {total}</span>
        </h2>
      </div>
    </div>
  );
};

export default Filters;
