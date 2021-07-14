export function backendURI(path) {
  let root = "https://llinebknd.herokuapp.com/";
  if (process.env.NODE_ENV === "development") {
    root = "http://127.0.0.1:8000/";
  }
  return root + path;
}
