import axios from "axios";
import { Router, useRouter } from "next/dist/client/router";
import React, { useEffect, useState } from "react";

const Questions = () => {
  const router = useRouter();
  //   const [lng, setLng] = useState(null);
  const [loading, setLoading] = useState(true);
  const [symptom, setSymptom] = useState({});
  const [treatment, setTreatment] = useState({});
  const [callEmergency, setCallEmergency] = useState(false);

  useEffect(async () => {
    const sessionId = window.localStorage.getItem("sessionId");
    if (!sessionId) {
      let location;
      navigator?.geolocation?.getCurrentPosition(async (res) => {
        location = `${res.coords.longitude},${res.coords.latitude}`;
        console.log(location);
        // setLoading(true);
        const response = await axios.get("http://127.0.0.1:3000/session/init", {
          params: {
            location: location,
          },
        });
        window.localStorage.setItem("sessionId", response.data.session_id);
        console.log(response.data);
        setSymptom(response.data.symptom);
        setLoading(false);

        // setLng(res.coords.longitude);
        // setLat(res.coords.latitude);
      });
    } else {
      window.localStorage.removeItem("sessionId");
      router.push("/");
    }
  }, []);

  const handleClick = async (answer) => {
    const sessionId = window.localStorage.getItem("sessionId");
    const severity = symptom?.severity;
    if (sessionId) {
      setLoading(true);
      const response = await axios.get("http://127.0.0.1:3000/session/next", {
        params: {
          sessionId,
          symptomId: symptom.id,
          answer,
        },
      });
      if (response) {
        if (response.data.treatment) {
          console.log(response.data.treatment);
          setTreatment(response.data.treatment);
        } else {
          console.log(response.data.symptom);
          setSymptom(response.data.symptom);
        }
      }
      setLoading(false);
      if (!callEmergency && severity === "MEDICAL" && answer === 1) {
        try {
          const res = await axios.get(
            "http://127.0.0.1:3000/services/contact",
            {
              params: {
                sessionId,
                severity,
              },
            }
          );
          console.log(res);
          alert("Authority Alerted");
          setCallEmergency(true);
        } catch (e) {
          console.log(e);
        }
      }
    } else {
      router.push("/");
    }
  };

  return !treatment.name ? (
    <>
      {!loading ? (
        <>
          <p className="text-3xl text-center mb-4">{symptom?.question}</p>
          <button
            // type="submit"
            onClick={() => handleClick(1)}
            class="inline-flex justify-center w-32 py-2 my-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Yes
          </button>
          <button
            // type="submit"
            onClick={() => handleClick(0)}
            class="inline-flex justify-center w-32 py-2 my-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            No
          </button>
        </>
      ) : (
        <div
          class="
      animate-spin
      rounded-full
      h-24
      w-24
      mb-4
      border-t-2 border-b-2 border-purple-500
    "
        ></div>
      )}
    </>
  ) : (
    <div className="shadow-md p-4 m-4">
      <p className="p-2">{treatment.name}</p>
      <img src={treatment.image} className="rounded-md" />
      <p className="p-2">{treatment.description}</p>
    </div>
  );
};

export default Questions;
