const DisplayBefore = ({ when, children }) => {
  if (new Date() <= when) {
    return children;
  }
  return null;
};

const DisplayAfter = ({ when, children }) => {
  if (new Date() > when) {
    return children;
  }
  return null;
};

export { DisplayBefore, DisplayAfter };
