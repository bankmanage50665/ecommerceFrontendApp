import ReactPixel from "react-facebook-pixel";

const options = {
  autoConfig: true,
  debug: false,
};

export const initFacebookPixel = () => {
  ReactPixel.init("1675854249655728", options);
};

export const trackPageView = () => {
  ReactPixel.pageView();
};

export const trackEvent = (event, data) => {
  ReactPixel.track(event, data);
};
