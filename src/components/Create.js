import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { collection, addDoc } from "firebase/firestore";
import { db } from "../firebaseConfig/firebase";

const Create = () => {
  const navigate = useNavigate();

  const [roomName, setRoomName] = useState("");
  const [price, setPrice] = useState(0);

  const [dni, setDni] = useState(0);
  const [name, setName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phone, setPhone] = useState(0);

  const roomsCollection = collection(db, "rooms");
  const clientsCollection = collection(db, "clients")

  const storeClients = async (e) => {
    e.preventDefault();
    await addDoc(clientsCollection, {
      dni: dni,
      name: name,
      lastName: lastName,
      phone: phone,
    });
    navigate("/");
    //console.log(e.target[0].value)
  };

  const storeRooms = async (e) => {
    e.preventDefault();
    await addDoc(roomsCollection, {
      roomName: roomName,
      price: price,
    });
    navigate("/");
    //console.log(e.target[0].value)
  };

  function MyRouteComponentName() {
    const location = useLocation();
    return location.state.names;
  } 

  return (
    <div className="container">
      <div className="row">
        <div className="col">  
          {MyRouteComponentName() === "rooms" ? (
            <div>
              <h1>Create {MyRouteComponentName()}</h1>
              <form onSubmit={storeRooms}>
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
                  <label className="form-label">Price</label>
                  <input
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    type="number"
                    className="form-control"
                  />
                </div>
                <button type="submit" className="btn btn-primary">
                  Guardar
                </button>
              </form>
            </div>
          ) : (
            <div>
              <h1>Create {MyRouteComponentName()}</h1>
              <form onSubmit={storeClients}>
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
                  <label className="form-label">Nombres</label>
                  <input
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    type="text"
                    className="form-control"
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Apellidos</label>
                  <input
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    type="text"
                    className="form-control"
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Telefono</label>
                  <input
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    type="number"
                    className="form-control"
                  />
                </div>
                <button type="submit" className="btn btn-primary">
                  Store
                </button>
              </form>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Create;
