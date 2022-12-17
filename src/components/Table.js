import React from "react";
import { Link } from "react-router-dom";

const Table = ({ confirmDelete, data, names }) => {
  return (
    <>
      <hr />
      <div className="container">
        <div className="row">
          <div className="col">
            <div className="d-grid gap-2">
              <Link
                to="/create"
                state={{ names }}
                className="btn btn-secondary mt-2 mb-2"
              >
                CREATE
              </Link>
            </div>
            {names === "clients" ? (
              <table className="table table-dark table-hover">
                <thead>
                  <tr>
                    <th>DNI</th>
                    <th>NAME</th>
                    <th>LAST NAME</th>
                    <th>PHONE</th>
                    <th>ACTIONS</th>
                  </tr>
                </thead>
                <tbody>
                  {data.map((data) => (
                    <tr key={data.id}>
                      <td>{data.dni}</td>
                      <td>{data.name}</td>
                      <td>{data.lastName}</td>
                      <td>{data.phone}</td>
                      <td>
                        <Link
                          to={`/edit/${data.id}`}
                          state={{ names: names }}
                          className="btn btn-light"
                        >
                          <i className="fa-solid fa-pencil"></i>
                        </Link>
                        <button
                          onClick={() => {
                            confirmDelete(data.id);
                          }}
                          className="btn btn-danger"
                        >
                          <i className="fa-solid fa-trash"></i>
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>

              </table>
            ) : (
              <table className="table table-dark table-hover">
                <thead>
                  <tr>
                    <th>ROOM</th>
                    <th>PRICE</th>
                    <th>ACTIONS</th>
                  </tr>
                </thead>
                <tbody>
                  {data.map((data) => (
                    <tr key={data.id}>
                      <td>{data.roomName}</td>
                      <td>{data.price}</td>

                      <td>
                        <Link
                          to={`/edit/${data.id}`}
                          state={ {names: names} }
                          className="btn btn-light"
                        >
                          <i className="fa-solid fa-pencil"></i>
                        </Link>
                        <button
                          onClick={() => {
                            confirmDelete(data.id);
                          }}
                          className="btn btn-danger"
                        >
                          <i className="fa-solid fa-trash"></i>
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>

              </table>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Table;
