import { FormControl, IconButton, InputAdornment, InputLabel, OutlinedInput, TextField } from "@mui/material";
import React from "react";
import LockIcon from '@mui/icons-material/Lock';
import { Visibility, VisibilityOff } from "@mui/icons-material";

    function InputAdornments() {
        const [showPassword, setShowPassword] = React.useState(false);
      
        const handleClickShowPassword = () => setShowPassword((show) => !show);

        const handleMouseDownPassword = (event) => {
            event.preventDefault();
          };
        
          const handleMouseUpPassword = (event) => {
            event.preventDefault();
          };
        
        return(

        
    <FormControl variant="outlined" fullWidth={true} color="inherit">
          <InputLabel htmlFor="outlined-adornment-password">Senha</InputLabel>
          <OutlinedInput
            id="outlined-adornment-password"
            type={showPassword ? 'text' : 'password'}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label={
                    showPassword ? 'hide the password' : 'display the password'
                  }
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                  onMouseUp={handleMouseUpPassword}
                  edge="end"
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
            label="Password"
            
          />
        </FormControl>
        )
    }
    

export default InputAdornments;