export const getColorText = (id: number): string => {
  if (id === 4) {
    return "#FFFFFF";
  }
  if (id === 1) {
    return "#141850";
  }
  if (id === 2) {
    return "#FFFFFF";
  }
  if (id === 3) {
    return "#33D067";
  }
  return "";
};
export const getColorBackground = (id: number): string => {
  if (id === 4) {
    return "#E94560";
  }
  if (id === 1) {
    return "#E8E8EE";
  }
  if (id === 2) {
    return "#4E97FD";
  }
  if (id === 3) {
    return "#ccf7d8";
  }
  return "";
};
