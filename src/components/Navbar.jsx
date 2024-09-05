import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import LiveTvIcon from '@mui/icons-material/LiveTv';
import { NavLink, useNavigate } from 'react-router-dom';
import { useAxios } from '../hooks/useAxios';
import { API_KEY } from '../hooks/useEnv';
import { AutoComplete } from 'antd';



export default function Navbar() {
    const [options, setOptions] = React.useState([])
    const navigate = useNavigate()

      function handleSearchMovie (e){
        useAxios().get(`/search/movie?query=${e}&include_adult=false&api_key=${API_KEY}`).then(res => {
          setOptions(res.data.results.map(item =>({value:item.title, id:item.id})));
        });
      }
      function handleChooseMovie (a, b) {
        navigate(`${b.id}`);
      }
  return (
      <AppBar color='transparent' position="static">
        <Toolbar className='pt-[10px] pb-[14px]'>
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
            <NavLink className={'text-[16px] py-[7px] duration-300 px-[8px]'} to={'/'}>NowPlaying</NavLink>
            <NavLink className={'text-[16px] py-[7px] duration-300 px-[8px]'} to={'/popular'}>Popular</NavLink>
            <NavLink className={'text-[16px] py-[7px] duration-300 px-[8px]'} to={'/top-rated'}>TopRated</NavLink>
            <NavLink className={'text-[16px] py-[7px] duration-300 px-[8px]'} to={'/up-coming'}>UpComing</NavLink>
          </Typography>
            <AutoComplete
            onSearch={handleSearchMovie}
            onSelect={handleChooseMovie}
              size='large'
              style={{width : 300}}
              allowClear
              options={options}
              placeholder="search movie"
            />
        </Toolbar>
      </AppBar>
  );
}
