import { useContext } from "react";
import { CalcContext } from "../context/CalcContext";

const getStyleName = (btn) => {
  const className = {
    "=": "equals",
    "*": "opt",
    "-": "opt",
    "+": "opt",
    "/": "opts",
    "%": "opt",
    Cl: "clear",
    De: "delete",
  };
  return className[btn];
};

const Button = ({ value }) => {
  const { calc, setCalc } = useContext(CalcContext);

  // User clicks on a button
  const commaClick = () => {
    setCalc({
      ...calc,
      num: !calc.num.toString().includes(".") ? calc.num + value : calc.num,
    });
  };

  // User clicks on a button to reset the calculator
  const resetClick = () => {
    setCalc({
      sign: "",
      num: 0,
      res: 0,
    });
  };

  // User click numbers
  const handleClickBtn = () => {
    const numberString = value.toString();

    let numberValue;
    if (numberString === "0" && calc.num === 0) {
      numberValue = "0";
    } else {
      numberValue = Number(calc.num + numberString);
    }

    setCalc({
      ...calc,
      num: numberValue,
    });
  };

  // User Click operations
  const signClickBtn = () => {
    setCalc({
      sign: value,
      res: !calc.res && calc.num ? calc.num : calc.res,
      num: 0,
    });
  };

  // User Click equals
  const equalsClickBtn = () => {
    if (calc.res && calc.num) {
      const math = (a, b, sign) => {
        const result = {
          "+": (a, b) => a + b,
          "-": (a, b) => a - b,
          "*": (a, b) => a * b,
          "/": (a, b) => a / b,
          "%": (a, b) => a % b,
        };
        return result[sign](a, b);
      };

      setCalc({
        res: math(calc.res, calc.num, calc.sign),
        sign: "",
        num: 0,
      });
    }
  };

  // User click on modulus/Percents
  const modulusClickBtn = () => {
    setCalc({
      num: calc.num / 100,
      res: calc.res / 100,
      sign: "",
    });
  };

  // User Click delete
  const deleteClickBtn = () => {
    setCalc({
      ...calc,
      res: 0,
      num: calc.num.toString().slice(0, -1),
    });
  };

  const handleBtnClick = () => {
    const results = {
      ".": commaClick,
      Cl: resetClick,
      "/": signClickBtn,
      "-": signClickBtn,
      "+": signClickBtn,
      "*": signClickBtn,
      "%": modulusClickBtn,
      "=": equalsClickBtn,
      De: deleteClickBtn,
    };
    if (results[value]) {
      return results[value]();
    } else {
      return handleClickBtn();
    }
  };
  return (
    <button
      onClick={handleBtnClick}
      className={`${getStyleName(value)} button`}
    >
      {value}
    </button>
  );
};

export default Button;
