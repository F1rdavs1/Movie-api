import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import LiveTvIcon from '@mui/icons-material/LiveTv';
import { NavLink } from 'react-router-dom';
import { Autocomplete, TextField } from '@mui/material';



export default function Navbar() {
    const options = [
        { label: 'The Godfather', id: 1 },
        { label: 'Pulp Fiction', id: 2 },
      ];
  return (
      <AppBar color='transparent' position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="open drawer"
            sx={{ mr: 2 }}
          >
            <LiveTvIcon />
          </IconButton>
          <Typography
            className='flex space-x-4'
            variant="h6"
            noWrap
            component="div"
            sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' } }}
          >
            <NavLink className={'text-[16px]'} to={'/'}>NowPlaying</NavLink>
            <NavLink className={'text-[16px]'} to={'/popular'}>Popular</NavLink>
            <NavLink className={'text-[16px]'} to={'/top-rated'}>TopRated</NavLink>
            <NavLink className={'text-[16px]'} to={'/up-coming'}>UpComing</NavLink>
          </Typography>
          <Autocomplete
            disablePortal
            options={options}
            sx={{ width: 300 }}
            renderInput={(params) => <TextField {...params} label="Movie" />}
            />
        </Toolbar>
      </AppBar>
  );
}
