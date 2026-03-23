import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import dayjs from 'dayjs';
import { useTranslation } from 'react-i18next';
import { fetchDestinations } from '../../store/thunks/hotelsThunks';
import { Formik } from 'formik';
import useWithLng from '../../hooks/useWithLng';
import { Select, InputNumber, DatePicker, Button, Spin, Card } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import styles from './SearchForm.module.scss';

const { RangePicker } = DatePicker;

const SearchForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { destinations, loading } = useSelector((state) => state.hotels);
  const { t } = useTranslation();
  const { withLng } = useWithLng();
  const [isSmallScreen, setIsSmallScreen] = useState(false);

  useEffect(() => {
    dispatch(fetchDestinations());
  }, [dispatch]);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(max-width: 576px)');
    const onChange = (event) => setIsSmallScreen(event.matches);
    setIsSmallScreen(mediaQuery.matches);

    mediaQuery.addEventListener('change', onChange);
    return () => mediaQuery.removeEventListener('change', onChange);
  }, []);

  if (loading || !destinations.length) {return <Spin fullscreen size="large" />;}

  return (
    <Card size="small" className={styles.searchFormCard}>
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
          if (!values.city) {errors.city = t('searchForm.cityRequired');}
          if (!values.dates || values.dates.length !== 2) {
            errors.dates = t('searchForm.datesRequired');
          } else {
            const [start, end] = values.dates;

            if (end.diff(start, 'day') > 30) {
              errors.dates = t('searchForm.stayTooLong');
            }
          }
          if (values.adults < 1 || values.adults > 6)
          {errors.adults = t('searchForm.adultsRange');}

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
          navigate(`${withLng('/hotels')}?${params.toString()}`);
        }}
      >
        {({ handleSubmit, setFieldValue, errors, values }) => (
          <form
            onSubmit={handleSubmit}
            layout="inline"
            className={styles.searchForm}
          >
            <div className={styles.searchFormGroup}>
              <Select
                placeholder={t('searchForm.selectCity')}
                value={values.city}
                options={destinations.map((city) => ({
                  value: city.id,
                  label: city.label,
                }))}
                onChange={(value) => setFieldValue('city', value)}
                className={styles.searchFormSelect}
              />
              {errors.city && (
                <div className="error-message">{errors.city}</div>
              )}
            </div>

            <div className={styles.searchFormGroup}>
              <RangePicker
                value={values.dates}
                onChange={(dates) => setFieldValue('dates', dates)}
                disabledDate={(current) => {
                  return current && current < dayjs().startOf('day');
                }}
                classNames={{ popup: { root: styles.rangePopup } }}
                styles={isSmallScreen ? {
                  popup: {
                    root: {
                      left: '50%',
                      transform: 'translateX(-50%)',
                      maxWidth: 'calc(100vw - 2rem)',
                      width: '100%',
                      padding: '0 0.5rem',
                      boxSizing: 'border-box',
                    }
                  }
                } : undefined}
                className={styles.searchFormRange}
                placeholder={[
                  t('searchForm.checkIn'),
                  t('searchForm.checkOut'),
                ]}
              />
              {errors.dates && (
                <div className="error-message">{errors.dates}</div>
              )}
            </div>

            <div className={styles.searchFormGroup}>
              <InputNumber
                min={1}
                max={6}
                value={values.adults}
                onChange={(value) => setFieldValue('adults', value)}
                className={styles.searchFormPersons}
                placeholder={t('searchForm.adultsPlaceholder')}
              />
              {errors.adults && (
                <div className="error-message">{errors.adults}</div>
              )}
            </div>

            <InputNumber
              min={0}
              max={5}
              value={values.children}
              onChange={(value) => setFieldValue('children', value)}
              className={styles.searchFormPersons}
              placeholder={t('searchForm.childrenPlaceholder')}
            />

            <Button
              shape="circle"
              color="primary"
              htmlType="submit"
              disabled={!!errors.dates}
              className={styles.searchFormSubmit}
              icon={<SearchOutlined />}
            />

            <Button
              color="primary"
              variant="outlined"
              onClick={() => {
                navigate(`${withLng('/hotels')}?city=all&page=1`);
              }}
              className={styles.searchFormShowAll}
            >
              {t('searchForm.showAllHotels')}
            </Button>
          </form>
        )}
      </Formik>
    </Card>
  );
};

export default SearchForm;
