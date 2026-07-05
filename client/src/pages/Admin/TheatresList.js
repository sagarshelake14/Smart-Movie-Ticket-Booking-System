import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { HideLoading, ShowLoading } from "../../redux/loadersSlice";
import { message, Table } from "antd";
import {UpdateTheatre} from '../../apicalls/theatres'
import {
  GetAllTheatres,
} from "../../apicalls/theatres";

function TheatresList() {
  const [theatres = [] , setTheatres] = useState([]);
  const dispatch = useDispatch();


  const getData = async () => {
    try {
      dispatch(ShowLoading());

      const response = await GetAllTheatres();

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

  const handleStatusChange = async (theatre) => {
    try {
        dispatch(ShowLoading());
        const response = await UpdateTheatre({
            theatreId: theatre._id,
            ...theatre,
            isActive: !theatre.isActive,
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
      title: "STATUS",
      dataIndex: "isActive",
      render: (text, record) => {
            if(text){
              return 'Approved'
            } else {
              return 'Pending / Blocked'
            }
      },
    },
    {
      title: "ACTION",
      render: (text, record) => {
        return <div className="flex gap-3">
          {record.isActive && <span className="underline"
            onClick={()=>handleStatusChange(record)}
          >Block</span>}
          {!record.isActive && <span className="underline"
            onClick={()=>handleStatusChange(record)}
          >Approve</span>}
        </div>
      },
    },
  ];

  useEffect(()=>{
    getData();
  }, [])

  return (
    <div>
      <Table columns={columns} dataSource={theatres} />
    </div>
  );
}

export default TheatresList;