export const NAV_LINKS = [
  { name: "Home",    path: "/" },
  { name: "About",   path: "/about" },
  { name: "Events",  path: "/events" },
  { name: "Team",    path: "/team" },
  { name: "Gallery", path: "/gallery" },
  { name: "Contact", path: "/contact" },
] as const;

export const SOCIAL_LINKS = {
  facebook:  "https://www.facebook.com/LeoClubPokharaPuspanjali",
  instagram: "https://www.instagram.com/LeoClubPokharaPuspanjali",
} as const;

export const CONTACT_INFO = {
  address: "Pokhara, Kaski, Nepal",
  phone:   "+977-9856034215",
  email:   "leoclubpokharapuspanjali@gmail.com",
} as const;

export const JOIN_FORM_URL = "/contact";

/**
 * In Next.js, images live in /public/images/.
 * Reference them as static paths — no import.meta.url needed.
 */
export const GALLERY_IMAGES = [
  "/images/image.jpeg",
  "/images/image2.jpeg",
  "/images/image3.jpg",
  "/images/image4.jpg",
  "/images/image5.jpg",
  "/images/bg.jpg",
] as const;

export const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:5000/api";

export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";
