import { Modal, Form, message } from "antd";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import Button from "../../components/Button";
import { HideLoading, ShowLoading } from "../../redux/loadersSlice";
import { AddTheatre, UpdateTheatre } from "../../apicalls/theatres";

function TheatreForm({
  showTheatreFormModal,
  setShowTheatreFormModal,
  formType,
  selectedTheatre,
  setSelectedTheatre,
  getData,
}) {
  const { user } = useSelector((state) => state.users);
  const dispatch = useDispatch();

  const onFinish = async (values) => {
    values.owner = user._id;

    try {
      dispatch(ShowLoading());

      let response = null;

      if (formType === "add") {
        response = await AddTheatre(values);
      } else {
        values.theatreId = selectedTheatre._id;
        response = await UpdateTheatre(values);
      }

      if (response.success) {
        message.success(response.message);

        getData();

        setShowTheatreFormModal(false);
        setSelectedTheatre(null);
      } else {
        message.error(response.message);
      }

      dispatch(HideLoading());
    } catch (error) {
      dispatch(HideLoading());
      message.error(error.message);
    }
  };

  return (
    <Modal
      title={formType === "add" ? "Add Theatre" : "Edit Theatre"}
      open={showTheatreFormModal}
      footer={null}
      onCancel={() => {
        setShowTheatreFormModal(false);
        setSelectedTheatre(null);
      }}
    >
      <Form
        layout="vertical"
        onFinish={onFinish}
        initialValues={selectedTheatre}
      >
        <Form.Item
          label="Name"
          name="name"
          rules={[{ required: true }]}
        >
          <input type="text" />
        </Form.Item>

        <Form.Item
          label="Address"
          name="address"
          rules={[{ required: true }]}
        >
          <textarea />
        </Form.Item>

        <Form.Item
          label="Phone"
          name="phone"
          rules={[{ required: true }]}
        >
          <input type="text" />
        </Form.Item>

        <Form.Item
          label="Email"
          name="email"
          rules={[{ required: true }]}
        >
          <input type="text" />
        </Form.Item>

        <div className="flex justify-end gap-2">
          <Button
            title="Cancel"
            variant="outlined"
            type="button"
            onClick={() => {
              setShowTheatreFormModal(false);
              setSelectedTheatre(null);
            }}
          />

          <Button title="Save" type="submit" />
        </div>
      </Form>
    </Modal>
  );
}

export default TheatreForm;