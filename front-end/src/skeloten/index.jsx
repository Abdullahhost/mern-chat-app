import "./index.css";
const Skeleton = () => {
  return (
    <div className="loader">
      <span style={{ "--x": 1 }}></span>
      <span style={{ "--x": 2 }}></span>
      <span style={{ "--x": 3 }}></span>
      <span style={{ "--x": 2 }}></span>
      <span style={{ "--x": 1 }}></span>
    </div>
  );
};

export default Skeleton;
