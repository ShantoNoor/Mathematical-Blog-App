import { useState } from 'react';
import {InputBase} from '@mui/material'
import SearchIcon from '@mui/icons-material/Search';
import ClearIcon from "@mui/icons-material/Clear";
import { styled, alpha } from '@mui/material/styles';

const SearchComponent = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('md')]: {
    marginLeft: theme.spacing(1),
    width: 'auto',
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '26ch',
      '&:focus': {
        width: '30ch',
      },
    },
  },
}));

const Search = ({underline, handelSearchChange, searchValue}) => {
  const handelChange = (event) => {
    const value = event.target.value;
    handelSearchChange(value)
  }
  const handleClear = () => {
    handelSearchChange('')
  };

  return (
    <SearchComponent>
      <SearchIconWrapper>
        <SearchIcon />
      </SearchIconWrapper>
      <StyledInputBase
        placeholder="Search Blogs"
        inputProps={{ 'aria-label': 'search' }}
        sx={{borderBottom: underline ? '1px solid #000':'', transition: 'all 500ms'}}
        onChange={handelChange}
        value={searchValue}
        endAdornment={
          searchValue && (
            <ClearIcon
              sx={{ color: underline ? alpha("#000", 1.0) : alpha("#FFF", 1.0), cursor: "pointer", marginRight: 2 }}
              onClick={handleClear}
            />
          )
        }
      />
    </SearchComponent>
  )
}

export default Search