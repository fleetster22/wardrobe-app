import React, { useState, useEffect } from "react";

export default function ShoeForm() {
  const [model, setModel] = useState("");
  const [manufacturer, setManufacturer] = useState("");
  const [color, setColor] = useState("");
  const [pic_url, setPicUrl] = useState("");
  const [bins, setBins] = useState([]);
  const [selectedBin, setSelectedBin] = useState("");

  const handleModelChange = (event) => {
    setModel(event.target.value);
  };

  const handleManufacturerChange = (event) => {
    setManufacturer(event.target.value);
  };

  const handleColorChange = (event) => {
    setColor(event.target.value);
  };

  const handlePicUrlChange = (event) => {
    setPicUrl(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const data = {};
    data.model = model;
    data.manufacturer = manufacturer;
    data.color = color;
    data.pic_url = pic_url;
    data.bin = selectedBin;

    const url = "http://localhost:8080/api/shoes/";

    console.log("sending data", data);

    const fetchConfig = {
      method: "post",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    };

    const response = await fetch(url, fetchConfig);
    console.log("Received response:", response);
    if (response.ok) {
      const newShoe = await response.json();
      console.log("Response data:", newShoe);

      setModel("");
      setManufacturer("");
      setColor("");
      setPicUrl("");
      setSelectedBin("");
      setBins([]);
    }
  };

  const fetchData = async () => {
    const url = "http://localhost:8080/api/bins/";
    const response = await fetch(url);
    console.log("Received response:", response);
    if (response.ok) {
      const data = await response.json();
      setBins(data.bins);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="container">
      <div className="row">
        <div className="offset-3 col-6">
          <div className="shadow p-4 mt-4">
            <h1>Create a New Shoe</h1>
            <form onSubmit={handleSubmit} id="create-shoe-form">
              <div className="form-floating mb-3">
                <input
                  onChange={handleManufacturerChange}
                  placeholder="Manufacturer"
                  required
                  type="text"
                  name="manufacturer"
                  id="manufacturer"
                  className="form-control"
                  value={manufacturer}
                />
                <label htmlFor="manufacturer">Manufacturer</label>
              </div>
              <div className="form-floating mb-3">
                <input
                  onChange={handleModelChange}
                  placeholder="Model"
                  required
                  type="text"
                  name="model"
                  id="model"
                  className="form-control"
                  value={model}
                />
                <label htmlFor="name">Model</label>
              </div>
              <div className="form-floating mb-3">
                <input
                  onChange={handleColorChange}
                  placeholder="Shoe color"
                  required
                  type="text"
                  name="color"
                  id="color"
                  className="form-control"
                  value={color}
                />
                <label htmlFor="color">Color</label>
              </div>
              <div className="form-floating mb-3">
                <input
                  onChange={handlePicUrlChange}
                  placeholder="Picture URL"
                  required
                  type="text"
                  name="pic_url"
                  id="pic_url"
                  className="form-control"
                  value={pic_url}
                />
                <label htmlFor="pic_url">Picture URL</label>
              </div>

              <div className="mb-3">
                <select
                  onChange={(e) => setSelectedBin(e.target.value)}
                  required
                  id="bins"
                  name="bins"
                  className="form-select"
                  value={selectedBin}
                >
                  <option value="">Choose a bin</option>
                  {bins.map((bin) => (
                    <option key={bin.id} value={bin.id}>
                      {bin.closet_name}
                    </option>
                  ))}
                </select>
              </div>
              <button type="submit" className="btn btn-info">
                Add Shoe
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
