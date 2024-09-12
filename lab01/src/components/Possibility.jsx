import {Button, NumberInput} from "@mantine/core";

const Possibility = (
  {
    index,
    label,
    value,
    handlePossibilityValueChange,
    handlePossibilityDelete}
  ) => {
  return (
    <div style={{display: "flex", justifyContent: "space-between"}}>
      <NumberInput
        onChange={(value) => handlePossibilityValueChange(index, value)}
        leftSection={label}
        allowNegative={false}
        min={0}
        max={1}
        step={0.1}
        value={value}
      />
      <Button
        onClick={() => handlePossibilityDelete(index)}>
        X
      </Button>
    </div>
  )
};

export default Possibility;