import { Link } from "react-router-dom";
import "./HatList.css";  // Importing the CSS file for the animation

function HatList(props) {
  if (props.hats === undefined) {
    return <div>Loading...</div>;
  }

  async function deleteHat(id) {
    try {
      const response = await fetch(`http://localhost:8090/api/hats/${id}/`, {
        method: "DELETE",
      });

      if (response.status !== 204) {
        const data = await response.json();
        console.warn(data);
      }

      window.location.reload();
    } catch (error) {
      console.error("Error deleting hat:", error);
    }
  }

  return (
    <div className="container">
      <img id="fallingHat" src="https://i.imgur.com/71s2TFu.png" alt="Hat" />
      <h1 className="card display-5 text-dark fw-bold text-center my-3">
        Top off your head!
      </h1>
      <table className="table table-striped">
        <thead>
          <tr>
            <th>Fabric</th>
            <th>Style Name</th>
            <th>Color</th>
            <th>Picture</th>
            <th>Location</th>
            <th>
              <Link to="/hats/new" className="btn btn-primary btn-md">
                Create
              </Link>
            </th>
          </tr>
        </thead>
        <tbody>
          {props.hats.map((hat) => {
            return (
              <tr key={hat.id}>
                <td>{hat.fabric}</td>
                <td>{hat.style_name}</td>
                <td>{hat.color}</td>
                <td className="w-25">
                  <img src={hat.picture_url} className="img-thumbnail w-50" alt="Hat" />
                </td>
                <td>{`${hat.location.closet_name}, Section: ${hat.location.section_number}, Shelf: ${hat.location.shelf_number}`}</td>
                <td>
                  <button className="btn btn-danger" onClick={() => deleteHat(hat.id)}>
                    Delete
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default HatList;
