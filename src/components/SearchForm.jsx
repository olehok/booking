import { useEffect } from "react";
import { Formik } from "formik";
import { Select, InputNumber, DatePicker, Button } from "antd";
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
        adults: 1,
        children: 0,
      }}
      validate={(values) => {
        const errors = {};
        if (!values.city) errors.city = "City is required";
        if (!values.dates || values.dates.length !== 2)
          errors.dates = "Check-in and check-out are required";
        if (values.adults < 1 || values.adults > 5)
          errors.adults = "Adults must be between 1 and 5";
        if (!values.dates || values.dates.length !== 2) 
          errors.dates = "Check-in and check-out are required";
         else {
          const [start, end] = values.dates;

          if (end.diff(start, "day") > 30) {
            errors.dates = "Stay duration cannot exceed 30 days";
          }
        }
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
        <form onSubmit={handleSubmit}>
          <div>
            <label>City</label>
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
          </div>

          <div>
            <label>Dates</label>
            <RangePicker
              value={values.dates}
              onChange={(dates) => setFieldValue("dates", dates)}
              style={{ width: 250 }}
              disabledDate={(current) => {
                return current && current < dayjs().startOf("day");
              }}
              onCalendarChange={(dates) => {
                if (dates && dates.length === 2) {
                  const [start, end] = dates;

                  if (end.diff(start, "day") > 30) {
                    setFieldError(
                      "dates",
                      "Stay duration cannot exceed 30 days",
                    );
                  } else {
                    setFieldError("dates", undefined);
                  }
                }
                // setFieldValue("dates", dates);
              }}
            />
            {errors.dates && <div style={{ color: "red" }}>{errors.dates}</div>}
          </div>

          <div>
            <label>Adults</label>
            <InputNumber
              min={1}
              max={5}
              value={values.adults}
              onChange={(value) => setFieldValue("adults", value)}
            />
            {errors.adults && (
              <div style={{ color: "red" }}>{errors.adults}</div>
            )}
          </div>

          <div>
            <label>Children</label>
            <InputNumber
              min={0}
              max={5}
              value={values.children}
              onChange={(value) => setFieldValue("children", value)}
            />
          </div>

          <Button
            type="primary"
            htmlType="submit"
            disabled={!!errors.dates}
            style={{ marginTop: 10 }}
          >
            Search
          </Button>
        </form>
      )}
    </Formik>
  );
};

export default SearchForm;
