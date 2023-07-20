import React, { useState, useEffect } from 'react';

export default function CreateHat() {
  const [styleName, setStyleName] = useState('');
  const [fabric, setFabric] = useState('');
  const [color, setColor] = useState('');
  const [pictureUrl, setPictureUrl] = useState('');
  const [locations, setLocations] = useState([]);
  const [selectedLocation, setSelectedLocation] = useState('');

  const handleChange = (event) => {
    const { name, value } = event.target;
    switch (name) {
      case 'style_name':
        setStyleName(value);
        break;
      case 'fabric':
        setFabric(value);
        break;
      case 'color':
        setColor(value);
        break;
      case 'picture_url':
        setPictureUrl(value);
        break;
      case 'location':
        setSelectedLocation(value);
        break;
      default:
        break;
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const data = {
      style_name: styleName,
      fabric,
      color,
      picture_url: pictureUrl,
      location: selectedLocation,
    };

    const url = 'http://localhost:8090/api/hats/';

    const fetchConfig = {
      method: 'POST',
      body: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json',
      },
    };

    const response = await fetch(url, fetchConfig);
    if (response.ok) {
      const newHat = await response.json();
      console.log(newHat);
      setStyleName('');
      setFabric('');
      setColor('');
      setPictureUrl('');
      setSelectedLocation('');
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      const url = 'http://localhost:8090/api/locations/';
      const response = await fetch(url);
      if (response.ok) {
        const data = await response.json();
        setLocations(data.locations);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="row justify-content-center">
      <div className="offset-3 col-6">
        <div className="shadow p-4 mt-4">
          <h1 className="text-center">Create a new hat</h1>
          <form onSubmit={handleSubmit}>
            <div className="form-floating mb-3">
              <input
                type="text"
                className="form-control"
                id="style_name"
                name="style_name"
                value={styleName}
                placeholder="Style Name"
                onChange={handleChange}
              />
              <label htmlFor="style_name">Style Name</label>
            </div>
            <div className="form-floating mb-3">
              <input
                type="text"
                className="form-control"
                id="fabric"
                name="fabric"
                value={fabric}
                placeholder="Fabric"
                onChange={handleChange}
              />
              <label htmlFor="fabric">Fabric</label>
            </div>
            <div className="form-floating mb-3">
              <input
                type="text"
                className="form-control"
                id="color"
                name="color"
                value={color}
                placeholder="Color"
                onChange={handleChange}
              />
              <label htmlFor="color">Color</label>
            </div>
            <div className="form-floating mb-3">
              <input
                type="text"
                className="form-control"
                id="picture_url"
                name="picture_url"
                value={pictureUrl}
                placeholder="Picture URL"
                onChange={handleChange}
              />
              <label htmlFor="picture_url">Picture URL</label>
            </div>
            <div className="mb-3">
              <select
                onChange={handleChange}
                value={selectedLocation}
                name="location"
                required
                id="location"
                className="form-select"
              >
                <option value="">Choose a location</option>
                {locations.map((location) => (
                  <option key={location.id} value={location.id}>
                    {location.closet_name}
                  </option>
                ))}
              </select>
            </div>
            <div className="text-center">
              <button type="submit" className="btn btn-primary">
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
