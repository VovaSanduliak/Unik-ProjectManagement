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
    <div style={{display: "flex", justifyContent: "space-between", alignItems: "flex-end"}}>
      <NumberInput
        onChange={(value) => handlePossibilityValueChange(index, value)}
        label={label}
        allowNegative={false}
        min={0}
        max={1}
        step={0.1}
        value={value}
      />
      <Button
        variant={"outline"}
        onClick={() => handlePossibilityDelete(index)}>
        X
      </Button>
    </div>
  )
};

export default Possibility;