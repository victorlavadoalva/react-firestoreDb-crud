import React, { useState, useEffect } from "react";
import Table from "./Table";
import { collection, getDocs, deleteDoc, doc } from "firebase/firestore";
import { db } from "../firebaseConfig/firebase";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

const MySwal = withReactContent(Swal);

const Show = ({ name }) => {
  //1 - configuramos los hooks

  const [items, setItems] = useState([]);

  //2 - referenciamos a la DB firestore
  const Collection = collection(db, name);

  //3 - Funcion para mostrar TODOS los docs

  const getItems = async () => {
    const data = await getDocs(Collection);
    setItems(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
  };

  //4 - Funcion para eliminar un doc

  const deleteItem = async (id) => {
    const itemDoc = doc(db, name, id);
    await deleteDoc(itemDoc);
    getItems();
  };

  //5 - Funcion de confirmacion para Sweet Alert 2
  const confirmDelete = (id) => {
    MySwal.fire({
      title: `Delete ${name}?`,
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        if (name === "clients") {
          //llamamos a la fcion para eliminar
          deleteItem(id);
        }
        if (name === "rooms") {
          //llamamos a la fcion para eliminar
          deleteItem(id);
        }

        Swal.fire("Deleted!", "Your file has been deleted.", "success");
      }
    });
  };

  const confirmUpdate = () => {
    MySwal.mixin({
      toast: true,
      position: "top-end",
      showConfirmButton: false,
      timer: 3000,
      timerProgressBar: true,
      didOpen: (toast) => {
        toast.addEventListener("mouseenter", Swal.stopTimer);
        toast.addEventListener("mouseleave", Swal.resumeTimer);
      },
    }).then((result) => {
      if (result.isConfirmed) {
        MySwal.fire({
          icon: "success",
          title: "successful update",
        });
      }
    });
  };
  //6 - usamos useEffect
  useEffect(() => {
    getItems();

    // eslint-disable-next-line
  }, [name]);

  //7 - devolvemos vista de nuestro componente
  return (
    <>
      <Table confirmDelete={confirmDelete} confirmUpdate={confirmUpdate} names={name} data={items} />
    </>
  );
};

export default Show;
