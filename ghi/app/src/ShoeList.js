import React from "react";

export default function ShoeList(props) {
  return (
    <table className="table">
      <thead>
        <tr>
          <th>Manufacturer</th>
          <th>Model</th>
          <th>Color</th>
          <th>Image</th>
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
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}
