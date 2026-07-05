import React, { useState, useEffect } from "react";
import Button from "../../components/Button";
import TheatreForm from "./TheatreForm";
import { useDispatch, useSelector } from "react-redux";
import { HideLoading, ShowLoading } from "../../redux/loadersSlice";
import { message, Table } from "antd";
import {
  GetAllTheatresByOwner,
  DeleteTheatre,
} from "../../apicalls/theatres";

function TheatresList() {
  const [showTheatreFormModal, setShowTheatreFormModal] = useState(false);
  const [selectedTheatre, setSelectedTheatre] = useState(null);
  const [formType, setFormType] = useState("add");
  const [theatres, setTheatres] = useState([]);

  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.users);

  const getData = async () => {
    try {
      dispatch(ShowLoading());

      const response = await GetAllTheatresByOwner({
        owner: user._id,
      });

      if (response.success) {
        setTheatres(response.data);
      } else {
        message.error(response.message);
      }

      dispatch(HideLoading());
    } catch (error) {
      dispatch(HideLoading());
      message.error(error.message);
    }
  };

  useEffect(() => {
    if (user) {
      getData();
    }
  }, [user]);

  const handleDelete = async (id) => {
    try {
      dispatch(ShowLoading());

      const response = await DeleteTheatre({
        theatreId: id,
      });

      if (response.success) {
        message.success(response.message);
        getData();
      } else {
        message.error(response.message);
      }

      dispatch(HideLoading());
    } catch (error) {
      dispatch(HideLoading());
      message.error(error.message);
    }
  };

  const columns = [
    {
      title: "NAME",
      dataIndex: "name",
    },
    {
      title: "ADDRESS",
      dataIndex: "address",
    },
    {
      title: "PHONE",
      dataIndex: "phone",
    },
    {
      title: "EMAIL",
      dataIndex: "email",
    },
    {
      title: "ACTION",
      render: (text, record) => (
        <div className="flex gap-3">
          <i
            className="ri-delete-bin-line"
            onClick={() => handleDelete(record._id)}
          ></i>

          <i
            className="ri-pencil-line"
            onClick={() => {
              setFormType("edit");
              setSelectedTheatre(record);
              setShowTheatreFormModal(true);
            }}
          ></i>
        </div>
      ),
    },
  ];

  return (
    <div>
      <div className="flex justify-end mb-3">
        <Button
          variant="outlined"
          title="Add Theatre"
          onClick={() => {
            setFormType("add");
            setSelectedTheatre(null);
            setShowTheatreFormModal(true);
          }}
        />
      </div>

      <Table
        columns={columns}
        dataSource={theatres}
        rowKey="_id"
      />

      {showTheatreFormModal && (
        <TheatreForm
          showTheatreFormModal={showTheatreFormModal}
          setShowTheatreFormModal={setShowTheatreFormModal}
          formType={formType}
          selectedTheatre={selectedTheatre}
          setSelectedTheatre={setSelectedTheatre}
          getData={getData}
        />
      )}
    </div>
  );
}

export default TheatresList;