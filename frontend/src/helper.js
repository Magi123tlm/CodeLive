export const toggleClass = (element, className) => {
  let el = document.querySelector(element);
  el.classList.toggle(className);
};

export const removeClass = (element, className) => {
  let el = document.querySelector(element);
  el.classlist.toggle(className);
};

export const apiBasedUrl = "http://localhost:8000";

// export const apiBasedUrl = "https://code-live-seven.vercel.app/";
