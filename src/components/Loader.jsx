import styles from "./Loader.module.css";
import { FidgetSpinner } from "react-loader-spinner";
function Loader() {
  return (
    <FidgetSpinner
      visible={true}
      height="80"
      width="80"
      ariaLabel="dna-loading"
      wrapperStyle={{}}
      wrapperClass="dna-wrapper"
      ballColors={["#d1d5db", "#d1d5db", "#d1d5db"]}
      backgroundColor="#030712"
    />
  );
}

export default Loader;
