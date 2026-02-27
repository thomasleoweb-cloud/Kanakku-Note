import Dropdown from "./Dropdown";
import { useState, useEffect } from "react";

const Content = () => {
  const [form1, setForm1] = useState({
    amount: 0,
    category: "",
    date: "",
    note: "",
  });

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
      console.log('is it setting')
    } catch {
      // localStorage.removeItem('expenses');
      console.error("Storage error:");
    }
  }, []);

  useEffect(() => {
    console.log("allData", allData)
    localStorage.setItem("expenses", JSON.stringify(allData));
  }, [allData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm1((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleDelete = (id) => {
    // console.log('delete id:', id)
    const deleted = allData.filter((item, i) => item?.id !== id);
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
   setAllData(prev =>
      prev.map(item =>
        item.id === editId ? editChange : item
      )
    );

    setEditId(null);
  };

  const handleCancelEdit = () => {
    setEditId(null);
  };

  // console.log("event:", Date.now().toString())
  const handleSave = (e) => {
    e.preventDefault();

    try {
      const Existing = JSON.parse(localStorage.getItem("expenses") || "[]");
      const ID = Date.now().toString();
      // console.log('id-->', ID)
      const newEntry = {
        id: ID,
        ...form1,
      };
      const updated = [...Existing, newEntry];
      localStorage.setItem("expenses", JSON.stringify(updated));
      setAllData((prev) => [...prev, newEntry]);
      // console.log('expenses Array:', updated)
      setForm1({
        amount: 0,
        category: "",
        date: "",
        note: "",
      });
    } catch {
      // localStorage.removeItem('expenses');
      console.error("Storage error:");
    }
  };

  const total = allData?.reduce((sum, item) => sum + Number(item?.amount), 0);

  // console.log('total:', total)
  // console.log('allData:', allData)

  return (
    <div className="ContentSection p-5 flex flex-col gap-5">
      <form
        onSubmit={handleSave}
        className="form grid grid-cols-18 grid-rows-1 gap-2"
      >
        <span className="text-sm col-span-2">Amount:</span>
        <input
          type="number"
          name="amount"
          id="Amount"
          value={form1.amount}
          onChange={handleChange}
          placeholder="Enter Amount"
          className="amountIn border text-sm h-6 col-span-2"
        />
        <span className="text-sm col-span-2">Category:</span>{" "}
        <input
          type="text"
          name="category"
          id="Category"
          value={form1.category}
          onChange={handleChange}
          placeholder="Enter Category"
          className="categoryIn border text-sm h-6 col-span-2"
        />
        <span className="text-sm col-span-1">Date:</span>{" "}
        <input
          type="date"
          name="date"
          id="Date"
          value={form1.date}
          onChange={handleChange}
          className="dateIn border text-sm h-6 col-span-2"
        />
        <span className="text-sm col-span-1">Note:</span>{" "}
        <textarea
          name="note"
          id="Note"
          cols="50"
          rows="2"
          value={form1.note}
          onChange={handleChange}
          placeholder="note here..."
          className="dateIn border text-sm col-span-4"
        ></textarea>
        <button type="submit" className="p-1 col-span-2 bg-blue-800 text-white">
          Save
        </button>
      </form>

      <div className="listSection w-5xl max-h-90 overflow-auto">
        <table className="ListTable border-collapse border border-gray-500 w-5xl">
          <thead className="sticky top-0 border">
            <tr>
              <th className="w-15 border">Sl.No</th>
              <th className="w-35 border">Date</th>
              <th className="w-45 border">Category</th>
              <th className="w-62.5 border">Note</th>
              <th className="w-30 border">Amount</th>
              <th className="w-45 border">Update</th>
              <th className="w-30 border">Remove</th>
            </tr>
          </thead>

          <tbody>
            {allData?.map((item, i) => {
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
                      <input
                        name="category"
                        value={editChange?.category}
                        onChange={handleEditChange}
                      />
                    ) : (
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
                        <button className="cursor-pointer border bg-blue-900 text-white px-2" onClick={handleSaveEdit}>Save</button>
                        <button className="cursor-pointer border bg-red-900 text-white px-2" onClick={handleCancelEdit}>X</button>
                      </div>
                    ) : (
                      <button className="cursor-pointer" onClick={() => handleEdit(item)}>Edit</button>
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
              <td colSpan="5"></td>
              <td className="border">Total:</td>
              <td>{total}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Content;
