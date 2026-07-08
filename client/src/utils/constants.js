export const NAV_LINKS = [
  { name: "Home",    path: "/" },
  { name: "About",   path: "/about" },
  { name: "Events",  path: "/events" },
  { name: "Team",    path: "/team" },
  { name: "Gallery", path: "/gallery" },
  { name: "Contact", path: "/contact" },
];

export const SOCIAL_LINKS = {
  facebook: "https://www.facebook.com/LeoClubPokharaPuspanjali",
  instagram: "https://www.instagram.com/LeoClubPokharaPuspanjali",
};

export const CONTACT_INFO = {
  address: "Pokhara, Nepal",
  phone: "+977-98XXXXXXXX",
  email: "info@leoclubpuspanjali.org",
};

export const JOIN_FORM_URL = "/contact";

export const GALLERY_IMAGES = [
  new URL("../assets/image.jpeg", import.meta.url).href,
  new URL("../assets/image2.jpeg", import.meta.url).href,
  new URL("../assets/image3.jpg", import.meta.url).href,
  new URL("../assets/image4.jpg", import.meta.url).href,
  new URL("../assets/image5.jpg", import.meta.url).href,
  new URL("../assets/bg.jpg", import.meta.url).href,
];

export const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";
