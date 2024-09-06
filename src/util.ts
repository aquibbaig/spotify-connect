export const isDocumentVisible = (): boolean => {
  try {
    return (
      typeof document === "undefined" ||
      document.visibilityState === undefined ||
      document.visibilityState === "visible"
    );
  } catch (err) {
    return false;
  }
};
