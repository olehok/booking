import { useEffect } from "react";
import { Formik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import dayjs from "dayjs";
import { Select, InputNumber, DatePicker, Button, Spin } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import { fetchDestinations } from "../store/thunks/hotelsThunks";

const { RangePicker } = DatePicker;

const SearchForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { destinations, loading } = useSelector((state) => state.hotels);

  useEffect(() => {
    dispatch(fetchDestinations());
  }, [dispatch]);

  if (loading || !destinations.length) return <Spin fullscreen size="large" />;

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
          page: 1,
        });
        navigate(`/hotels?${params.toString()}`);
      }}
    >
      {({ handleSubmit, setFieldValue, errors, values }) => (
        <form onSubmit={handleSubmit} layout="inline" className="search-form">
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
          {errors.city && (
            <div className="error-search-form">{errors.city}</div>
          )}

          <RangePicker
            value={values.dates}
            onChange={(dates) => setFieldValue("dates", dates)}
            disabledDate={(current) => {
              return current && current < dayjs().startOf("day");
            }}
            style={{ flexGrow: 1 }}
            placeholder={["Check-in", "Check-out"]}
          />
          {errors.dates && (
            <div className="error-search-form">{errors.dates}</div>
          )}

          <InputNumber
            min={1}
            max={6}
            value={values.adults}
            onChange={(value) => setFieldValue("adults", value)}
            style={{ width: 100 }}
            placeholder={"Adults: 1"}
          />
          {errors.adults && (
            <div className="error-search-form">{errors.adults}</div>
          )}

          <InputNumber
            min={0}
            max={5}
            value={values.children}
            onChange={(value) => setFieldValue("children", value)}
            style={{ width: 100 }}
            placeholder={"Children: 0"}
          />

          <Button
            shape="circle"
            color="primary"
            htmlType="submit"
            disabled={!!errors.dates}
            style={{ marginTop: 10 }}
            icon={<SearchOutlined />}
          />

          <Button
            color="primary"
            variant="outlined"
            onClick={() => {
              navigate("/hotels?city=all&page=1");
            }}
          >
            Show all hotels
          </Button>
        </form>
      )}
    </Formik>
  );
};

export default SearchForm;
