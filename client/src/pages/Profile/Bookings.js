import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../../components/Button";
import { useDispatch, useSelector } from "react-redux";
import { HideLoading, ShowLoading } from "../../redux/loadersSlice";
import { message, Table, Row, Col } from "antd";
import { GetBookingsOfUser } from "../../apicalls/bookings";
import moment from "moment";

function Bookings() {
  const [bookings, setBookings] = useState([]);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const getData = async () => {
    try {
        dispatch(ShowLoading());
        const response = await GetBookingsOfUser();
        if (response.success) {
            setBookings(response.data);
        } else {
            message.error(response.message);
        }
        dispatch(HideLoading());
    } catch (error) {
        dispatch(HideLoading());
        message.error(error.message);
    }
 };
 useEffect(()=> {
         getData();
 }, [])
  return (
    <div>
    <Row gutter={[16, 16]}>
        {bookings.map((booking) => (
            <Col span={12}>
                <div className="card p-2 flex justify-between uppercase">
                    <div>
                        <h1 className="text-xl">
                            {booking.show.movie.title} ({booking.show.movie.language})
                        </h1>
                        <div className="divider"></div>
                        <h1 className="text-sm">
                            {booking.show.theatre.name} ({booking.show.theatre.address})
                        </h1>
                        <h1 className="text-sm">
                           

                        </h1>
                    </div>
                </div>
            </Col>
        ))}
    </Row>
</div>
  )
}

export default Bookings