import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getDoc, updateDoc, doc } from "firebase/firestore";
import { useLocation } from "react-router";
import { db } from "../firebaseConfig/firebase";

const Edit = () => {
  const location = useLocation();

  const [roomName, setRoomName] = useState("");
  const [price, setPrice] = useState(0);

//   const [names, setNames] = useState("rooms");

  const [dni, setDni] = useState(0);
  const [name, setName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phone, setPhone] = useState(0);

  const navigate = useNavigate();
  const { id } = useParams();

  const updateRooms = async (e) => {
    e.preventDefault();
    const room = doc(db, "rooms", id);
    const data = { roomName: roomName, price: price };
    await updateDoc(room, data);

    navigate("/");
  };

  const updateClients = async (e) => {
    e.preventDefault();
    const client = doc(db, "clients", id);
    const data = { dni: dni, name: name, lastName: lastName, phone: phone };
    await updateDoc(client, data);

    navigate("/");
  };

  const getItemsById = async (id) => {
    if (location.state.names === "clients") {
      const client = await getDoc(doc(db, "clients", id));
      setDni(client.data().dni);
      setName(client.data().name);
      setLastName(client.data().lastName);
      setPhone(client.data().phone);
    }
    if (location.state.names === "rooms") {
      const room = await getDoc(doc(db, "rooms", id));
      setRoomName(room.data().roomName);
      setPrice(room.data().price);
    } 
  };

  useEffect(() => {
    getItemsById(id);
  }, []);

  return (
    
    <div className="container">

      <div className="row">
        <div className="col">
          {location.state.names === "rooms" ? (
            <div>
            
              <h1>EDIT ROOMS</h1>
              <form onSubmit={updateRooms}>
                <div className="mb-3">
                  <label className="form-label">ROOM NAME</label>
                  <input
                    value={roomName}
                    onChange={(e) => setRoomName(e.target.value)}
                    type="text"
                    className="form-control"
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">PRICE</label>

                  <input
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    type="number"
                    className="form-control"
                  />
                </div>
                <button type="submit" className="btn btn-primary">
                  Update
                </button>
              </form>
            </div>
          ) : (
            <div>
              <h1>EDIT CLIENTS</h1>
              <form onSubmit={updateClients}>
                <div className="mb-3">
                  <label className="form-label">DNI</label>
                  <input
                    value={dni}
                    onChange={(e) => setDni(e.target.value)}
                    type="number"
                    className="form-control"
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">NAME</label>
                  <input
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    type="text"
                    className="form-control"
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">LAST NAME</label>
                  <input
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    type="text"
                    className="form-control"
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">PHONE</label>
                  <input
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    type="number"
                    className="form-control"
                  />
                </div>
                <button type="submit" className="btn btn-primary">
                  UPDATE
                </button>
              </form>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Edit;
