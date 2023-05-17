import React from "react";
import { api } from "../../api/apiInstance";
interface DataType {
  color: string;
}
const Client: React.FC = () => {
  const handeClick = async (color: string) => {
    let data: DataType = { color: color };
    await api.post("/click", data);
  };
  return (
    <div className="button-container">
      <button className="btn orange" onClick={() => handeClick("orange")}>
        Plus orange
      </button>
      <button className="btn blue" onClick={() => handeClick("blue")}>
        Plus blue
      </button>
    </div>
  );
};

export default Client;
