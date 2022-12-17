import React, { useState, useEffect } from "react";
import Table from "./Table";
import {
  collection,
  getDocs,
  deleteDoc,
  doc,
} from "firebase/firestore";
import { db } from "../firebaseConfig/firebase";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const MySwal = withReactContent(Swal);

const Rooms = ({ name }) => {
  //1 - configuramos los hooks
  const [rooms, setRooms] = useState([]);

  //2 - referenciamos a la DB firestore
  const Collection = collection(db, name);

  //3 - Funcion para mostrar TODOS los docs
 
  const getItemsRooms = async () => {
    const data = await getDocs(Collection);
      setRooms(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
      console.log(rooms)
    }

    //console.log(products)
  

  //4 - Funcion para eliminar un doc

  const deleteItemRooms = async (id) => {
    const itemDoc = doc(db, name, id);
    await deleteDoc(itemDoc);
    getItemsRooms();
  };

  //5 - Funcion de confirmacion para Sweet Alert 2
  const confirmDelete = (id) => {
    MySwal.fire({
      title: `¿Elimina el ${name}?`,
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        if(name ==="rooms"){
           //llamamos a la fcion para eliminar
    deleteItemRooms(id);
        }
        
        Swal.fire("Deleted!", "Your file has been deleted.", "success");
      }
    });
  };
  //6 - usamos useEffect
  useEffect(() => {
    getItemsRooms();
    // eslint-disable-next-line
  }, []);

  //7 - devolvemos vista de nuestro componente
  return (
    <>
      <hr />
      <div>{name}</div>

      <Table confirmDelete={confirmDelete} data={rooms} />
            


    
    </>
  );
};

export default Rooms;
