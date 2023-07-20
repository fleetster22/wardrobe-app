import React, { useState, useEffect } from "react";

export default function ShoeForm() {
  const [model, setModel] = useState("");
  const [manufacturer, setManufacturer] = useState("");
  const [color, setColor] = useState("");
  const [pic_url, setPicUrl] = useState("");
  const [bins, setBins] = useState("");

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

  const handleBinChange = (event) => {
    setBins(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const shoe = {};
    shoe.model = model;
    shoe.manufacturer = manufacturer;
    shoe.color = color;
    shoe.pic_url = pic_url;
    shoe.bins = bins;

    const url = "http://localhost:8080/api/shoes/";

    const fetchConfig = {
      method: "post",
      body: JSON.stringify(shoe),
      headers: {
        "Content-Type": "application/json",
      },
    };

    const response = await fetch(url, fetchConfig);
    if (response.ok) {
      const newBin = await response.json();
      console.log(newBin);

      setModel("");
      setManufacturer("");
      setColor("");
      setPicUrl("");
      setBins("");
    }
  };

  const fetchData = async () => {
    const url = "http://localhost:8100/api/bins/";
    const response = await fetch(url);
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
                  onChange={handleBinChange}
                  required
                  id="bins"
                  name="bins"
                  className="form-select"
                  value={bins}
                >
                  <option value="">Choose a bin</option>
                  {bins.map((bin) => (
                    <option key={bin.id} value={bin.id}>
                      {bin.name}
                    </option>
                  ))}
                </select>
              </div>
              <button className="btn btn-info">Add Shoe</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
