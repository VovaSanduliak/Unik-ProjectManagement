import {useState} from 'react'
import {Button, Container, Fieldset, NumberInput, Table} from "@mantine/core";
import Possibility from "./components/Possibility.jsx";
import './App.css'

const App = () => {
  const [possibilities, setPossibilities] = useState([0.1]);
  const [buyingPrice, setBuyingPrice] = useState(0.4);
  const [sellPrice, setSellPrice] = useState(0.75);
  const [lostProfit, setLostProfit] = useState(0.5);

  const [optionValues, setOptionValues] = useState([0]);
  const [demandValues, setDemandValues] = useState([0]);

  const addPossibility = () => {
    setPossibilities(prevState => [...prevState, 0]);
    addDemand();
  }

  const handlePossibilityValueChange = (index, newValue) => {
    setPossibilities(prevState => {
      const newState = [...prevState];
      newState[index] = newValue;
      return newState;
    })
  }

  const handlePossibilityDelete = (index) => {
    setPossibilities(prevState => {
      return prevState.filter((_, i) => i !== index);
    })

    deleteDemandValue(index);
  }

  const clearPossibilities = () => {
    setPossibilities([]);
  }

  const addOption = () => {
    setOptionValues(prevState => [...prevState, prevState.length]);
  }

  const addDemand = () => {
    setDemandValues(prevState => [...prevState, prevState.length])
  }

  const deleteDemandValue = (index) => {
    setDemandValues(prevState => {
      return prevState.filter((_, i) => i !== index);
    })
  };

  const handlePlusPossibility = () => {
    addPossibility();
  }

  const handleDemandValueChange = (index, value) => {
    setDemandValues(prevState => {
      const newState = [...prevState];
      newState[index] = +value;
      return newState;
    })
  }

  const handleOptionValueChange = (index, value) => {
    setOptionValues(prevState => {
      const newState = [...prevState];
      newState[index] = +value;
      return newState;
    })
  }

  const calculate = (optionValue, demandValue) => {
    const result = optionValue >= demandValue
      ? sellPrice * Math.min(optionValue, demandValue) - buyingPrice * optionValue
      : sellPrice * optionValue - buyingPrice * optionValue - lostProfit * (demandValue - optionValue)

    return Math.fround(result).toFixed(2);
  }

  return <>
    <Container style={{
      display: "flex",
      flexDirection: "column",
      minHeight: "100vh",
      justifyContent: "space-between",
      boxSizing: "border-box"
    }}>
      <div style={{
        display: "flex",
        justifyContent: "space-between",
        marginTop: "1rem"
      }}>
        {/*Probability*/}
        <div>
          <Fieldset legend="Ймовірності попиту">
            <div>
              {possibilities.map((value, index) => {
                return (
                  <Possibility
                    key={index}
                    index={index}
                    label={`P${index}`}
                    value={value}
                    handlePossibilityValueChange={handlePossibilityValueChange}
                    handlePossibilityDelete={handlePossibilityDelete}
                  />
                )
              })}
              <div style={{display: "flex", justifyContent: "space-between", marginTop: "10px"}}>
                <Button onClick={() => handlePlusPossibility()}
                        style={{marginTop: ".5rem"}}>
                  +
                </Button>
                {/*<Button onClick={() => clearPossibilities()}*/}
                {/*        style={{marginTop: ".5rem"}}>*/}
                {/*  Очистити*/}
                {/*</Button>*/}
              </div>
            </div>
          </Fieldset>

        </div>

        {/*Price calculations*/}
        <div style={{}}>
          <Fieldset legend="Ціни">
            <NumberInput
              onChange={(value) => setBuyingPrice(value)}
              label={"Ціна закупки"}
              defaultValue={0.4}
              step={0.1}

              allowNegative={false}/>
            <NumberInput
              onChange={() => (value) => setSellPrice(value)}
              label={"Ціна продажу"}
              defaultValue={0.75}
              step={0.1}
              allowNegative={false}/>
            <NumberInput
              onChange={(value) => setLostProfit(value)}
              label={"Упущена вигода"}
              defaultValue={0.5}
              step={0.1}

              allowNegative={false}/>
          </Fieldset>
        </div>
      </div>

      {/*Result table */}
      <div>

        <Table withRowBorders withTableBorder withColumnBorders>
          <Table.Thead>
            <Table.Tr>
              <Table.Th>Альтернативи</Table.Th>
              <Table.Th>Попит</Table.Th>
            </Table.Tr>
            <Table.Tr>
              <Table.Th span={2}>К-сть / Попит</Table.Th>
              {possibilities.map((number, index) => {
                return (
                  <Table.Th key={index}>
                    <NumberInput
                      value={demandValues[index]}
                      min={0}
                      onChange={(value) => handleDemandValueChange(index, value)}
                    />
                  </Table.Th>
                )
              })}
            </Table.Tr>
          </Table.Thead>
          <Table.Tbody>
            {optionValues.map((optionValue, index) => {
              return (
                <Table.Tr key={index}>
                  <Table.Td>
                    {/*{optionValue}*/}
                    <NumberInput
                      onChange={(value) => handleOptionValueChange(index, value)}
                      allowNegative={false}
                      min={0}
                      value={optionValue}
                    />
                  </Table.Td>
                  {possibilities.map((_, i) => {
                    return (
                      <Table.Td key={i}>
                        {calculate(optionValue, demandValues[i])}
                      </Table.Td>
                    );
                  })}
                </Table.Tr>
              )
            })}

          </Table.Tbody>
        </Table>

        <Button onClick={() => addOption()} mt={10}>+</Button>
      </div>

      {/* EMV */}
      <div style={{marginBottom: "1rem"}}>
        <Table withRowBorders withTableBorder withColumnBorders>
          <Table.Thead>
            <Table.Tr>
              <Table.Th>Кількість</Table.Th>
              <Table.Th>EMV</Table.Th>
            </Table.Tr>
          </Table.Thead>
          <Table.Tbody>
            {optionValues.map((optionValue, index) => {
              return (
                <Table.Tr key={index}>
                  <Table.Td>{`${optionValue}`}</Table.Td>
                  <Table.Td>
                    {(() => {
                      let result = 0;
                      demandValues.forEach((demandValue, i) => {
                        result += possibilities[i] * calculate(optionValue, demandValue);
                      });
                      return result.toFixed(2);
                    })()}
                  </Table.Td>
                </Table.Tr>
              )
            })}
          </Table.Tbody>
        </Table>
      </div>
    </Container>
  </>
}

export default App;
