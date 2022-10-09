import "./App.css";
import CalProvider from "./context/CalcContext";
import Button from "./components/Button";
import ButtonBox from "./components/ButtonBox";
import Screen from "./components/Screen";
import Wrapper from "./components/Wrapper";

const btnValues = [
  ["Cl", "De", "/", "%"],
  ["7", "8", "9", "*"],
  ["4", "5", "6", "-"],
  ["1", "2", "3", "+"],
  ["0", ".", "="],
];

function App() {
  return (
    <CalProvider>
      <Wrapper>
        <Screen />
        <ButtonBox>
          {btnValues.flat().map((btn, index) => (
            <Button value={btn} key={index} />
          ))}
        </ButtonBox>
      </Wrapper>
    </CalProvider>
  );
}

export default App;
