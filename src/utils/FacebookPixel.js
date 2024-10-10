import ReactPixel from "react-facebook-pixel";

const options = {
  autoConfig: true,
  debug: false,
};

export const initFacebookPixel = () => {
  ReactPixel.init("491282170581708", options);
};

export const trackPageView = () => {
  ReactPixel.pageView();
};

export const trackEvent = (event, data) => {
  ReactPixel.track(event, data);
};
