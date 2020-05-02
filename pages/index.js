import Head from "next/head";
import randomStreetView from "random-streetview";
import { useState, useEffect } from "react";
import initMap from "../components/initMap";
import TextInput from "~/components/Form/TextInput";
import { Form } from "react-final-form";
import "react-dates/initialize";
import { DateRangePicker } from "react-dates";
import axios from "axios";
import {
  getAddressCity,
  getAddressState,
  getAddressCountry,
} from "../components/Util/getLocationString";

function Datepicker() {
  const [dateRange, setdateRange] = useState({
    startDate: null,
    endDate: null,
  });
  const [focus, setFocus] = useState(null);

  const { startDate, endDate } = dateRange;

  const handleOnDateChange = (startDate, endDate) =>
    setdateRange(startDate, endDate);

  return (
    <DateRangePicker
      startDate={startDate}
      onDatesChange={handleOnDateChange}
      endDate={endDate}
      numberOfMonths={1}
      displayFormat="MMM D"
      focusedInput={focus}
      onFocusChange={(focus) => setFocus(focus)}
      startDateId="startDate"
      endDateId="endDate"
    />
  );
}

export default function Home() {
  const [coordinates, setCoordinates] = useState([]);
  const [location, setLocation] = useState(null);

  const onClient = () => typeof window !== "undefined";

  const getAddressCity = (address, length) => {
    const findType = (type) => type.types[0] === "locality";
    const location = address.map((obj) => obj);
    const rr = location.filter(findType)[0];

    return rr.long_name ? rr.long_name : rr.short_name;
  };

  const geocode = () => {
    axios
      .get(
        `https://maps.googleapis.com/maps/api/geocode/json?latlng=${coordinates[0]},${coordinates[1]}&key=AIzaSyArsb4Om72FY0mvhkBzPNcuPczOhHOStfo`
      )
      .then((res) => {
        console.log(res.data);
        console.log(res.data.plus_code.compound_code.split(" "));
        let city = getAddressCity(res.data.results[0].address_components);
        let state = getAddressState(res.data.results[0].address_components);
        let country = getAddressCountry(res.data.results[0].address_components);
        let locString = [city, state, country].join(", ").trim();
        setLocation(locString);
      })
      .catch((err) => console.log(err));
  };
  geocode();

  const getData = async () => {
    randomStreetView.setParameters({
      enableCaching: true,
      endZoom: 14,
      cacheKey: false,
      type: "sv",
      distribution: "weighted",
    });
    const location = await randomStreetView.getRandomLocation();
    console.log(location[0].toFixed(6), location[1].toFixed(6));
    setCoordinates(location);
  };

  useEffect(() => {
    getData();
    geocode();
    return () => {
      console.log("Cleanup");
    };
  }, []);

  if (coordinates.length > 0) {
    initMap(coordinates);
  }

  return (
    <div className="page">
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <header>
        <h1>{location}</h1>
        <Datepicker />
        <Form
          onSubmit={() => {
            console.log("submit");
          }}
          render={function () {
            return (
              <>
                <TextInput name="username" label="Username / Email" />
                <TextInput type="password" name="password" label="Password" />
              </>
            );
          }}
        />
        {onClient() && coordinates.length > 0 ? (
          <button onClick={getData} className="description">
            Next
            {/* Make button have singular > that splits into 2 >> on hover */}
          </button>
        ) : null}
      </header>
      <div id="map"></div>
      <div id="pano"></div>
    </div>
  );
}
