import { useState } from "react";
import uuid from "react-uuid";
import "./index.css";

const descriptionCodes = [
  {
    tag: "Al",
    service: "AIR , INSTRUMENT",
    number_series: "4000-4199",
  },
  {
    tag: "AU",
    service: "AIR , UTILITY",
    number_series: "4200-4399",
  },
  {
    tag: "BD",
    service: "BLOWDOWNS",
    number_series: "2000-2199",
  },

  {
    tag: "BG",
    service: "BLANKET GAS",
    number_series: "5000 - 5099",
  },
  {
    tag: "C",
    service: "CHEMICALS",
    number_series: "7100-7149",
  },
  {
    tag: "CO",
    service: "CARBON DIOXIDE",
    number_series: "5900 - 5999",
  },
  {
    tag: "CW",
    service: "COOLING WATER",
    number_series: "3000 - 3299",
  },
  {
    tag: "DE",
    service: "DELUGE WATER",
    number_series: "3600-3799 , 3990-3999, 4300-4399",
  },
  {
    tag: "DF",
    service: "DIESEL FUEL",
    number_series: "5100 - 5199",
  },
  {
    tag: "DH",
    service: "DRAIN , HYDROCARBON",
    number_series: "2200 - 2399 , 4700-4799",
  },
  {
    tag: "DW",
    service: "DRAIN , WATER , ETC.",
    number_series: "2400-2599, 4450-4599, 5500-5649, 7000-7099, 8200-8799",
  },
  {
    tag: "EX",
    service: "EQUIPMENT EXHAUST",
    number_series: "7980-7999",
  },
  {
    tag: "FG",
    service: "FUEL GAS",
    number_series: "- 5200 - 5399",
  },
  {
    tag: "FL",
    service: "FLARE",
    number_series: "2600-2999 , 4900-4999, 5800-5899",
  },
  {
    tag: "FW",
    service: "FIREWATER",
    number_series: "3300 - 3499",
  },
  {
    tag: "GH",
    service: "GAS , HYDROCARBON",
    number_series: "9600 - 9699",
  },
  {
    tag: "GU",
    service: "GAS , UTILITY",
    number_series: "4600 - 4699",
  },
  {
    tag: "HY",
    service: "HYDRAULIC",
    number_series: "4800 - 4899",
  },
  {
    tag: "JF",
    service: "JET FUEL",
    number_series: "5400-5499",
  },
  {
    tag: "LO",
    service: "LUBE OIL",
    number_series: "6000 - 6199",
  },
  {
    tag: "N",
    service: "NITROGEN",
    number_series: "5600 - 5799",
  },
  {
    tag: "P",
    service: "PROCESS LIQUIDS / VAPOR",
    number_series: "1000 - 1999, 5900 - 5999",
  },
  {
    tag: "P",
    service: "PROCESS BRIDLES",
    number_series: "8000-8199",
  },
  {
    tag: "SE",
    service: "SEWAGE",
    number_series: "4400-4449",
  },
  {
    tag: "SH",
    service: "SODIUM HYPOCHLORITE",
    number_series: "7400 - 7499",
  },
  {
    tag: "SO",
    service: "SEAL OIL",
    number_series: "6200-6299",
  },
  {
    tag: "SV",
    service: "SAFETY VALVE DISCHARGE",
    number_series: "9800-9899",
  },
  {
    tag: "SW",
    service: "RAW SEAWATER",
    number_series: "9000-9199",
  },
  {
    tag: "T",
    service: "HEAT TRANSFER MEDIUM",
    number_series: "8800 - 8999",
  },
  {
    tag: "VG",
    service: "VENT GAS",
    number_series: "7750 - 7979",
  },
  {
    tag: "VT",
    service: "TRIM NUMBER",
    number_series: "0001 - 0200",
  },
  {
    tag: "W",
    service: "WATER , PRODUCED",
    number_series: "9200 - 9399",
  },
  {
    tag: "WI",
    service: "WATER , INJECTION",
    number_series: "9400-9599",
  },
  {
    tag: "WP",
    service: "WATER , POTABLE",
    number_series: "3500 - 3699",
  },
  {
    tag: "WU",
    service: "WATER , UTILITY",
    number_series: "3800 - 3949",
  },
];

const DrishyaUi = () => {
  const [value, setValue] = useState("");
  const [uiDisplay, setUiDisplay] = useState(false);
  const [pipeLinesList, setPipeLinesList] = useState([]);
  const gettingValue = (e) => {
    setValue(e.target.value);
  };

  const gettingInputValue = () => {
    if (value !== "") {
      const splitPipeLine = value.split("-");
      const object = {};
      const date = new Date();
      const finalDate = `${date.getDate()}/${
        date.getMonth() + 1
      }/${date.getFullYear()} At ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;
      if (splitPipeLine.length === 5) {
        object["pipeline_name"] = value;
        object["line_size_inches"] = splitPipeLine[0];
        object["line_commodity_code"] = splitPipeLine[1];
        const descriptionObject = descriptionCodes.find(
          (eachOne) => eachOne.tag === splitPipeLine[1]
        );
        object["line_commodity_description"] = descriptionObject.service;
        object["pipe_specification"] =
          splitPipeLine[2] + "-" + splitPipeLine[3];
        object["line_number"] = splitPipeLine[4];
        object["time_stamp"] = finalDate;
        object["error"] = "";
      } else {
        object["pipeline_name"] = value;
        object["time_stamp"] = finalDate;
        object[
          "error"
        ] = `pipeline_name ${value} does not have the expected number of properties 5 : line_size_inches, line_commodity_code, pipe_specification_part_1, pipe_specification_part_2, line_number`;
      }

      setPipeLinesList([...pipeLinesList, object]);
      setUiDisplay(true);
      setValue("");
    }
  };
  return (
    <div className="main-container">
      <h1>Drishya App</h1>
      <label htmlFor="pipeline">Enter PipeLine Number</label>
      <input
        id="pipeline"
        value={value}
        onChange={gettingValue}
        type="text"
        placeholder="Enter PipeLine Number"
      />
      <button onClick={gettingInputValue} type="button">
        Convert
      </button>
      {uiDisplay ? (
        <div>
          <h1 className="main-heading">History Of Added Pipeline Numbers</h1>
          <table>
            <thead>
              <tr>
                <th>PipeLine Name</th>
                <th>Size in Inches</th>
                <th>PipeLine Commodity</th>
                <th>PipeLine Commodity Description</th>
                <th>PipeLine Specification</th>
                <th>PipeLine Number</th>
                <th>Time Stamp</th>
                <th>Error</th>
              </tr>
            </thead>
            <tbody>
              {pipeLinesList.map((eachPipeLine) => (
                <tr key={uuid()}>
                  <td className="table-data">{eachPipeLine.pipeline_name}</td>
                  <td className="table-data">
                    {eachPipeLine.line_size_inches}
                  </td>
                  <td className="table-data">
                    {eachPipeLine.line_commodity_code}
                  </td>
                  <td className="table-data">
                    {eachPipeLine.line_commodity_description}
                  </td>
                  <td className="table-data">
                    {eachPipeLine.pipe_specification}
                  </td>
                  <td className="table-data">{eachPipeLine.line_number}</td>
                  <td className="table-data">{eachPipeLine.time_stamp}</td>
                  <td className="error-msg">{eachPipeLine.error}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        ""
      )}
    </div>
  );
};

export default DrishyaUi;
