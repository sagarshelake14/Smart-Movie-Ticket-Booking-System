import { Form, Modal, Table, Col, Row, message } from "antd";
import React, { useEffect } from "react";
import Button from "../../../components/Button";
import {GetAllMovies} from '../../../apicalls/movies'
import { useDispatch } from "react-redux";
import { HideLoading,ShowLoading } from "../../../redux/loadersSlice";


function Shows({ openShowsModal, setOpenShowsModal , theatre }) {
    const [view, setView] = React.useState("table")
    const [shows, setShows] = React.useState([]);
    const [movies, setMovies] = React.useState([]);
    const dispatch = useDispatch();

         const getMovies = async () => {
                  try {
                           dispatch(ShowLoading());
                           const response = await GetAllMovies();
                  if (response.success) {
                           setMovies(response.data);
                  } else {
                           message.error(response.message);
                  }
                  dispatch(HideLoading());
                  } catch (error) {
                           message.error(error.message);
                           dispatch(HideLoading());
                  }
         };

   const columns = [
         {
                  title: "Show Name",
                  dataIndex: "name", 
         },
         {
                  title: "Date",
                  dataIndex: "date", 
         },
         {
                  title: "Time",
                  dataIndex: "time", 
         },
         {
                  title: "Movie",
                  dataIndex: "movie", 
         },
         {
                  title: "ticket price",
                  dataIndex: "ticketprice", 
         },
         {
                  title: "Total Seats",
                  dataIndex: "TotalSeats", 
         },
         {
                  title: "Available Seats",
                  dataIndex: "availableSeats", 
         },
         {
                  title: "Action",
                  dataIndex: "action",
         }
   ]
   
   useEffect(()=>{
         getMovies();
   }, [])

    return (
        <Modal
            title=""
            open={openShowsModal}
            onCancel={() => setOpenShowsModal(false)}
            width={1400}
            footer={null}
        >
            <h1 className="text-primary-text-md uppercase mb-1">
                Theatre : {theatre.name}
            </h1>
            <hr />

         <div className="flex justify-between mt-1 mb-1 items-center">
         <h1 className="text-md uppercase">
                  {view === "table" ? "shows": "Add Show"}
         </h1>

         {view === "table" && <Button
                  variant="outlined"
                  title="Add Show"
                  onClick={() => {
                  setView("form");
         }}
         />}

         </div>

         {view === "table" && (
                  <Table columns={columns} dataSource={shows} />
         )}

        {view === "form" && (
                  <Form layout="vertical">
                  <Row
                  gutter={[16, 16]}
                  >

                  <Col span={8}>
                  <Form.Item label="Show Name" name="name"
                           rules={[{required: true, message: "Please input show name!"}]}
                  >
                           <input />
                  </Form.Item>
                  </Col>

                  <Col span={8}>
                  <Form.Item label="Date" name="date"
                           rules={[{required: true, message: "Please input show date!"}]}
                  >
                  <input type="date" />
                  </Form.Item>
                  </Col>

                  <Col span={8}>
                  <Form.Item label="Time" name="time">
                           <input type="time" />
                  </Form.Item>
                  </Col>

                  <Col span={8}>
                  <Form.Item label="Movie" name="movie"
                           rules={[{required: true, message: "Please select movie!"}]}
                  >
                           <select>
                           <option value="">Select Movie</option>
                           {movies.map((movie) => (
                                    <option value={movie._id}>{movie.title}</option>
                           ))}
                           </select>
                  </Form.Item>
                  </Col>

                  <Col span={8}>
                  <Form.Item label="Ticket Price" name="ticketPrice"
                           rules={[{required: true, message: "Please input ticket price!"}]}
                  >
                  <input type="number" />
                  </Form.Item>
                  </Col>

                  <Col span={8}>
                  <Form.Item label="Total Seats" name="totalSeats"
                           rules={[{required: true, message: "Please input total seats!"}]}
                  >
                  <input type="number" />
                  </Form.Item>
                  </Col>
                  </Row>

                  <div className="flex justify-end gap-1">
                  <Button
                           variant="outlined"
                           title="Cancel"
                           onClick={() => {
                                    setView("table");
                           }}
                           />
                           <Button variant="contained" title="SAVE" type="submit" />
                  </div>
         </Form>
         )}
        </Modal>
    );
}

export default Shows;