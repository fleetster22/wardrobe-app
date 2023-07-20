import React from "react";

export default function ShoeList(props) {
  if (props.shoes === undefined) {
    return <div>Loading...</div>;
  }
  function deleteShoe(id) {
    const url = `http://localhost:8080/api/shoes/${id}/`;

    const options = {
      method: "DELETE",
    };
    fetch(url, options)
      .then((result) => {
        return result.json();
      })
      .then((resp) => {
        console.warn(resp);
        window.location.reload();
      });
  }

  return (
    <table className="table">
      <thead>
        <tr>
          <th>Manufacturer</th>
          <th>Model</th>
          <th>Color</th>
          <th>Image</th>
          <th>Bin</th>
        </tr>
      </thead>
      <tbody>
        {props.shoes.map((shoe) => {
          return (
            <tr key={shoe.id}>
              <td className="shoe_detail">{shoe.manufacturer}</td>
              <td className="shoe_detail">{shoe.brand_name}</td>
              <td className="shoe_detail">{shoe.color}</td>
              <td>
                <img src={shoe.pic_url} alt={shoe.model} height="220" />
              </td>
              <td>{shoe.selectedBin}</td>
              <td>
                <button
                  type="button"
                  className="btn btn-danger"
                  value={shoe.id}
                  onClick={() => deleteShoe(shoe.id)}
                >
                  Delete Shoe
                </button>
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}
