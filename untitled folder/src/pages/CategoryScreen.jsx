import React from "react";

import Table from "../components/table/Table";

import customerList from "../assets/JsonData/customers-list.json";
import { useState } from "react";
import { useEffect } from "react";
import { getUsers } from "./api/users";
import { Link } from "react-router-dom";
import { Button, Card } from "react-bootstrap";
import { getShops } from "./api/shop";

const customerTableHead = ["id", "Shop Name", "Image", "shop Trn", "", ""];

const renderHead = (item, index) => <th key={index}>{item}</th>;

const renderBody = (item, index) => (
  <tr key={index}>
    <td>{item.id}</td>
    <td>{item.name}</td>
    <td>{item.email}</td>
    <td>{item.typeofuser}</td>
    <td>
      <i className="bx bx-lock"></i>
    </td>
    <td>
      <i className="bx bx-pencil"></i>
    </td>
    <td>
      <i className="bx bx-trash"></i>
    </td>
  </tr>
);

const ShopScreen = () => {
  const [shops, setshops] = useState([]);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("userInfo"));

    const fetchShops = async () => {
      const data = await getShops(user.success.token);
      setshops(data.data);
      console.log(shops);
      // console.log(users);
    };

    fetchShops();
  }, []);

  const deleteshopHandler = async (id) => {
    if (window.confirm("Are you sure")) {
      //deleteProduct(id);
      console.log(id + " shop deleted");
    }
  };

  return (
    <div>
      <h2 className="page-header">Users</h2>
      <Link to="/addnewshop">
        <Button className="my-2">Add New shop</Button>
      </Link>

      <div className="row">
        <div className="col-12">
          <div className="card">
            <div className="card__body">
              <div>
                <div className="table-wrapper">
                  <table>
                    <thead>
                      <tr>
                        {customerTableHead.map((item, index) => (
                          <th key={index}>{item}</th>
                        ))}
                      </tr>
                    </thead>

                    <tbody>
                      {shops.map((item, index) => (
                        <tr key={index}>
                          <td>{item.id}</td>
                          <td>{item.shop_name}</td>
                          <td>
                            <Card.Img
                              style={{ height: "80px", objectFit: "contain" }}
                              src={item.image}
                              variant="top"
                            />
                          </td>
                          <td>{item.shop_trn}</td>
                          <td>
                            <Link to={`/editshop/${item.id}`}>
                              <i className="bx bx-pencil"></i>
                            </Link>
                          </td>
                          <td>
                            <button
                              style={{ cursor: "pointer" }}
                              className="rounded"
                              onClick={() => deleteshopHandler(item.id)}
                            >
                              {" "}
                              <i className="bx bx-trash"></i>
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShopScreen;

