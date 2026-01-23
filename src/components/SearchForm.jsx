import { useEffect } from "react";
import { Formik } from "formik";
import { Select, InputNumber, DatePicker, Button, Form } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import dayjs from "dayjs";
import { fetchDestinations } from "../store/thunks/hotelsThunks";

const { RangePicker } = DatePicker;

const SearchForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { destinations, loading } = useSelector((state) => state.hotels);

  useEffect(() => {
    dispatch(fetchDestinations());
  }, [dispatch]);

  if (loading || !destinations.length) return <div>Loading cities...</div>;

  return (
    <Formik
      enableReinitialize={true}
      initialValues={{
        city: undefined,
        dates: [],
        adults: null,
        children: null,
      }}
      validate={(values) => {
        const errors = {};
        if (!values.city) errors.city = "City is required";
        if (!values.dates || values.dates.length !== 2) {
          errors.dates = "Check-in and check-out are required";
        } else {
          const [start, end] = values.dates;

          if (end.diff(start, "day") > 30) {
            errors.dates = "Stay duration cannot exceed 30 days";
          }
        }
        if (values.adults < 1 || values.adults > 6)
          errors.adults = "Adults must be between 1 and 6";

        return errors;
      }}
      onSubmit={(values) => {
        const selectedCity = destinations.find(
          (city) => city.id === values.city,
        );
        const params = new URLSearchParams({
          city: selectedCity.label,
          adults: values.adults,
          children: values.children,
        });
        navigate(`/hotels?${params.toString()}`);
      }}
    >
      {({ handleSubmit, setFieldValue, errors, values }) => (
        <Form onSubmit={handleSubmit}
          layout="inline"
          className="search-form"
        >
          {/* <div className="search-form"> */}
          <Form.Item>
            {/* <label>City</label> */}
            <Select
              placeholder="Select city"
              value={values.city}
              options={destinations.map((city) => ({
                value: city.id,
                label: city.label,
              }))}
              onChange={(value) => setFieldValue("city", value)}
              style={{ width: 200 }}
            />
            {errors.city && <div style={{ color: "red" }}>{errors.city}</div>}
          </Form.Item>

          <Form.Item>
            {/* <label>Dates</label> */}
            <RangePicker
              value={values.dates}
              onChange={(dates) => setFieldValue("dates", dates)}
              disabledDate={(current) => {
                return current && current < dayjs().startOf("day");
              }}
              style={{ width: 250 }}
              placeholder={["Check-in", "Check-out"]}
            />
            {errors.dates && <div style={{ color: "red" }}>{errors.dates}</div>}
          </Form.Item>

          <Form.Item>
            {/* <label>Adults</label> */}
            <InputNumber
              min={1}
              max={6}
              value={values.adults}
              onChange={(value) => setFieldValue("adults", value)}
              placeholder={"Adults: 1"}
            />
            {errors.adults && (
              <div style={{ color: "red" }}>{errors.adults}</div>
            )}
          </Form.Item>

          <Form.Item>
            {/* <label>Children</label> */}
            <InputNumber
              min={0}
              max={5}
              value={values.children}
              onChange={(value) => setFieldValue("children", value)}
              placeholder={"Children"}
            />
          </Form.Item>

          <Button
            type="primary"
            htmlType="submit"
            disabled={!!errors.dates}
            style={{ marginTop: 10 }}
          >
            Search
          </Button>
          {/* </div> */}
        </Form>
      )}
    </Formik>
  );
};

export default SearchForm;
