
   import React, { useState, useEffect} from "react";

   function HatsList(props) {

     const [locations, setLocations] = useState([])
     const [hats, setHats] = useState([])
     const [columns, setColumns] = useState([[], [], []])
     const [editMode, setEditMode] = useState({})

     useEffect(() => { console.log("The component loaded!") }, [])
     useEffect(() => { console.log("The hats variable changed!") }, [hats])
     useEffect(() => { console.log("Something in the state changed!") })

     useEffect(() => {
       (async () => {
         const hatsResponse = await fetch('http://localhost:8090/api/hats/')
         if (hatsResponse.ok) {
           const hatsData = await hatsResponse.json()
           setHats(hatsData.hats)
         }
         const locationsResponse = await fetch('http://localhost:8100/api/locations/')
         if (locationsResponse.ok) {
           const locationsData = await locationsResponse.json()
           setLocations(locationsData.locations)
         }
       })()
     }, [])

     useEffect(() => {
       const columns = [[], [], []]
       let i = 0
       for (const hat of hats) {
         columns[i].push(hat)
         i = i + 1
         if (i > 2) {
           i = 0
         }
       }
       setColumns(columns)
     }, [hats])

     function createHatCards(column, col_idx) {
       return (
         <div key={col_idx} className="col">
           {column.map(hat => {
             return (
               <div key={hat.id} className="card mb-3 shadow">
                 <img src={hat.picture_url} className="card-img-top" style={(editMode[hat.id] ? { opacity: 0.2 } : {})} />
                 <div className={"card-body" + (editMode[hat.id] ? " d-none" : "")}>
                   <h5 className="card-title">{hat.style_name}</h5>
                   <h6 className="card-subtitle mb-2 text-muted">
                     {hat.fabric}, {hat.color}
                   </h6>
                 </div>
                 <div className={"card-body" + (editMode[hat.id] ? "" : " d-none")}>
                   <form id={"hat_" + hat.id} onSubmit={handleSubmit}>
                     <input type="hidden" name="id" value={hat.id} />
                     <div className="form-floating mb-1">
                       <input type="text" className="form-control" name="picture_url" defaultValue={hat.picture_url} placeholder="Picture URL" />
                       <label htmlFor="picture_url">Picture URL</label>
                     </div>
                     <div className="form-floating mb-1">
                       <input required type="text" className="form-control" name="style_name" defaultValue={hat.style_name} placeholder="Style Name" />
                       <label htmlFor="style_name">Style Name</label>
                     </div>
                     <div className="form-floating mb-1">
                       <input required type="text" className="form-control" name="fabric" defaultValue={hat.fabric} placeholder="Fabric" />
                       <label htmlFor="Fabric">Fabric</label>
                     </div>
                     <div className="form-floating mb-1">
                       <input required type="text" className="form-control" name="color" defaultValue={hat.color} placeholder="Color" />
                       <label htmlFor="color">Color</label>
                     </div>
                     <div className="mb-1">
                       <select required className="form-select" name="location">
                         <option value="">Choose a location</option>
                         {locations.map(location => {
                           return <option key={location.id} value={location.id}>{location.closet_name}</option>
                         })}
                       </select>
                     </div>
                   </form>
                 </div>
                 <div className={"card-footer" + (editMode[hat.id] ? " d-none" : "")}>
                   <span>{hat.location.closet_name} - {hat.location.section_number}/{hat.location.shelf_number}</span>
                   <span style={{ float: 'right' }}>
                     <button className="btn btn-primary" onClick={() => showEditForm(hat.id)}>Edit</button>
                     <span> </span>
                     <button className="btn btn-danger" onClick={() => deleteHat(hat)}>Delete</button>
                   </span>
                 </div>
                 <div className={"card-footer" + (editMode[hat.id] ? "" : " d-none")}>
                   <span style={{ float: 'right' }}>
                     <button className="btn btn-primary" form={"hat_" + hat.id}>Save</button>
                     <span> </span>
                     <button className="btn btn-warning" onClick={() => hideEditForm(hat.id)}>Cancel</button>
                   </span>
                 </div>
               </div>
             );
           })}
         </div>
       );
     }

     async function deleteHat(hat) {
       const response = await fetch(`http://localhost:8090/api/hats/${hat.id}/`, { method: "delete" })
       if (response.ok) {
         const idx = hats.indexOf(hat)
         const updated_hats = [...hats]
         updated_hats.splice(idx, 1)
         setHats(updated_hats)
       }
     }

     function showEditForm(id) {
       setEditMode({ ...editMode, [id]: true })
     }

     function hideEditForm(id) {
       setEditMode({ ...editMode, [id]: false })
     }

     async function handleSubmit(event) {
       event.preventDefault();
       const hat_id = event.target.id.value
       const location_id = event.target.location.value
       const data = {
         picture_url: event.target.picture_url.value,
         style_name: event.target.style_name.value,
         fabric: event.target.fabric.value,
         color: event.target.color.value,
         location: location_id,
       }
       const url = `http://localhost:8090/api/hats/${hat_id}/`
       const fetchConfig = {
         method: 'PUT',
         body: JSON.stringify(data),
         headers: {
           'Content-Type': 'application/json',
         }
       }
       const response = await fetch(url, fetchConfig)
       if (response.ok) {
         data.location = locations.find(location => location.id === parseInt(location_id))
         const idx = hats.findIndex(hat => hat.id === parseInt(hat_id))
         console.log(idx)
         const updated_hats = [...hats]
         updated_hats[idx] = { ...updated_hats[idx], ...data }
         setHats(updated_hats)
         console.log(hats)
         setEditMode({ ...editMode, [hat_id]: false })
       }
     }

     return (
       <div className="row mt-5">
         {columns.map((column, col_idx) => {
           return (
             createHatCards(column, col_idx)
           );
         })}
       </div>
     )
   }

   export default HatsList
