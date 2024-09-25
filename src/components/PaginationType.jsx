import * as React from 'react';
import MuiToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import { styled } from "@mui/material/styles";


export default function PaginationType( {onChangeCallback}) {

  const ToggleButton = styled(MuiToggleButton, {
    shouldForwardProp: (prop) => prop !== "selectedColor",
  })(({ selectedColor }) => ({
    "&.Mui-selected, &.Mui-selected:hover": {
      color: "white",
      backgroundColor: selectedColor,
    },
  }));

  const [alignment, setAlignment] = React.useState('web');

  const handleChange = (event, newAlignment) => {
    if (newAlignment !== null) {
      setAlignment(newAlignment);
      onChangeCallback && onChangeCallback(newAlignment);
      }
  };

  return (
    <ToggleButtonGroup
      color="primary"
      value={alignment}
      exclusive
      onChange={handleChange}
      aria-label="Platform"
    >
      <ToggleButton value="Controlled" selectedColor="#03766b">Controlled Pagination</ToggleButton>
      <ToggleButton value="Progressive" selectedColor="#03766b">Progressive Pagination</ToggleButton>
    </ToggleButtonGroup>
  );
}