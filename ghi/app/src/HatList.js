import { Link } from "react-router-dom";

function HatList(props) {
    if(props.hats === undefined){
        return null;
    }

    async function deleteHat(id){
        fetch(`http://localhost:8090/api/hats/${id}/`, {
            method: "DELETE"
        }).then((result)=>{result.json().then((resp) => {
            console.warn(resp)
            })
        })
        window.location.reload();
    }

    return (
        <div className="container">
        <h1 className="card display-5 text-dark fw-bold text-center my-3">HAT COLLECTION</h1>
        <table className="table table-striped">
        <thead>
            <tr>
            <th>Fabric</th>
            <th>Style Name</th>
            <th>Color</th>
            <th>Picture</th>
            <th>Location</th>
            <th><Link to="/hats/new" className="btn btn-primary btn-md" >Create</Link></th>
            </tr>
        </thead>
        <tbody>
            {props.hats.map((hat,id) => {
            return (
                <tr key={id}>
                <td>{ hat.fabric }</td>
                <td>{ hat.style_name }</td>
                <td>{ hat.color }</td>
                <td className="w-25">
                    <img src={ hat.picture_url } className="img-thumbnail w-50" />
                </td>
                <td>{ hat.location }</td>
                <td><button className="btn btn-danger" onClick={() => deleteHat(hat.id)}>Delete</button></td>
                </tr>
            );
            })}
        </tbody>
        </table>
        </div>
    );
    }

export default HatList;
