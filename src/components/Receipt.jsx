//@ts-ignore
import React, { useEffect, useState } from "react";
import { Input } from "baseui/input";
import { Button } from "baseui/button";
import { Datepicker } from "baseui/datepicker";
import toast from "react-hot-toast";
import { redirect, useNavigate } from "react-router-dom";

const ReceiptForm = ({ initialData = null, isOpen, setIsOpen }) => {
  const [receipt, setReceipt] = useState(
    initialData || {
      storeName: "",
      date: new Date(),
      items: [{ name: "", price: "", quantity: 1 }],
      total: "",
    }
  );

  useEffect(() => {
    if (!isOpen) {
      setReceipt({
        storeName: "",
        date: new Date(),
        items: [{ name: "", price: "", quantity: 1 }],
        total: "",
      });
    }
  }, [isOpen]);

  const handleItemChange = (index, field, value) => {
    const updatedItems = [...receipt.items];
    updatedItems[index][field] = value;
    setReceipt({ ...receipt, items: updatedItems });
  };
  const navigate = useNavigate();
  const addItem = () => {
    setReceipt({
      ...receipt,
      items: [...receipt.items, { name: "", price: "", quantity: 1 }],
    });
  };

  const handleSubmit = () => {
    toast.success("Receipt submitted");
    setIsOpen(false);
    setReceipt({
      storeName: "",
      date: new Date(),
      items: [{ name: "", price: "", quantity: 1 }],
      total: "",
    });
    navigate("/dashboard");
  };

  return (
    <div className="flex justify-center flex-col">
      <div className="text-lg font-semibold">Receipt Details</div>
      <div className="mb-4">
        <label className="text-sm font-medium">Store Name</label>
        <Input
          value={receipt.storeName}
          onChange={(e) =>
            setReceipt({ ...receipt, storeName: e.target.value })
          }
          placeholder="Enter store name"
        />
      </div>

      <div className="mb-4">
        <label className="text-sm font-medium">Date</label>
        <Datepicker
          value={receipt.date}
          onChange={({ date }) => setReceipt({ ...receipt, date })}
        />
      </div>

      <div className="mb-4">
        <label className="text-sm font-medium">Items</label>
        {receipt.items.map((item, index) => (
          <div key={index} className="flex gap-2 mb-2">
            <Input
              value={item.name}
              onChange={(e) => handleItemChange(index, "name", e.target.value)}
              placeholder="Item name"
            />
            <Input
              type="number"
              value={item.quantity}
              onChange={(e) =>
                handleItemChange(index, "quantity", e.target.value)
              }
              placeholder="Qty"
            />
            <Input
              type="number"
              value={item.price}
              onChange={(e) => handleItemChange(index, "price", e.target.value)}
              placeholder="Price"
            />
          </div>
        ))}
        <Button onClick={addItem} kind="secondary" className="mt-2">
          + Add Item
        </Button>
      </div>

      <div className="mb-4">
        <label className="text-sm font-medium">Total Amount</label>
        <Input
          type="number"
          value={receipt.total}
          onChange={(e) => setReceipt({ ...receipt, total: e.target.value })}
          placeholder="Total amount"
        />
      </div>

      <Button onClick={handleSubmit} kind="primary" className="w-full mt-4">
        Save Receipt
      </Button>
    </div>
  );
};

export default ReceiptForm;
