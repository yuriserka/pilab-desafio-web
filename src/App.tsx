import Home from "./pages/Home";

export default function App() {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        flex: 1,
        height: "95vh",
      }}
    >
      <Home />
    </div>
  );
}
