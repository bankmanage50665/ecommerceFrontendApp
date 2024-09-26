import { useEffect, useRef , useState} from "react";
import { json } from "react-router-dom";

export default function useHttpHooks() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const activeHttpRequest = useRef([]);

  async function sendRequest(url, method = "GET", body = null, headers = {}) {
    setLoading(true);
    const abortController = new AbortController();
    try {
      const res = await fetch(url, {
        method,
        body,
        headers,
        signal: abortController.signal,
      });
      activeHttpRequest.current = activeHttpRequest.current.filter(
        (reqCtr) => reqCtr !== abortController
      );
      const resData = await res.json();
      if (!res.ok) {
        throw json(
          {
            message:
              resData.message ||
              "Couldn't get correct response from backend, Please try again later.",
          },
          { status: 500 }
        );
      }
      return resData;
    } catch (err) {
      setError(err);
      setLoading(false);
      //   throw json(
      //     { message: "Field to create/login user, try again later." },
      //     { status: 500 }
      //   );
    }
  }

  useEffect(() => {
    return () => {
      activeHttpRequest.current.forEach((abortController) =>
        abortController.abort()
      );
    };
  }, []);

  const clearErr = () => {
    setError(null);
  };

  return {
    sendRequest,
    error,
    loading,
    clearErr,
  };
}
