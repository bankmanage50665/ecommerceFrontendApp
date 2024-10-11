import ReactPixel from "react-facebook-pixel";

const options = {
  autoConfig: true,
  debug: false,
};

export const initFacebookPixel = () => {
  ReactPixel.init("3404359149708895", options);
};

export const trackPageView = () => {
  ReactPixel.pageView();
};

export const trackEvent = (event, data) => {
  ReactPixel.track(event, data);
};


