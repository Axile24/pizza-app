

export const getImageUrl = (path) => {
  if (!path) {
    console.error("ERROR: No image path provided");
    return "";
  }
  return `/assets/${path}`;
};
