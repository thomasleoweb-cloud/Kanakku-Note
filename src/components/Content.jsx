import Dropdown from "./Dropdown";

const Content = () => {
    console.log("hiiii")
    const handleSave = (e) => {
        console.log("event:", e)
    }

  return (
    <div className="ContentSection p-5">
      <form action="" className="form grid grid-cols-18 grid-rows-1 gap-2">
        <span className="text-sm col-span-2">Amount:</span>
        <input
          type="number"
          name="amount"
          id="Amount"
          placeholder="Enter Amount"
          className="amountIn border text-sm h-6 col-span-2"
        />
        <span className="text-sm col-span-2">Category:</span>{" "}
        <input
          type="text"
          name="category"
          id="Category"
          placeholder="Enter Category"
          className="categoryIn border text-sm h-6 col-span-2"
        />
        <span className="text-sm col-span-1">Date:</span>{" "}
        <input
          type="date"
          name="date"
          id="Date"
          className="dateIn border text-sm h-6 col-span-2"
        />
        <span className="text-sm col-span-1">Note:</span>{" "}
        <textarea
          name="note"
          id="Note"
          cols="50"
                  rows="2"
                  placeholder="note here..."
          className="dateIn border text-sm col-span-4"
        >
        </textarea>
        
        <button type="submit" className="p-1 col-span-2 bg-blue-800 text-white" onClick={(event)=>handleSave(event)}>Save</button>
      </form>
    </div>
  );
};

export default Content;
