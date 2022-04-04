import { AppBar, Avatar, Menu, MenuItem, Toolbar, Typography } from '@material-ui/core';
import { Add, Apps } from '@material-ui/icons';
import React from 'react';
import { CreateClass, JoinClass } from '..';
import { useLocalContext } from '../../context/context';
import { useStyles } from './style';

const Header = ({children}) => 
{
  const classes = useStyles();

  const [anchorEl , setAnchorEl] = React.useState(null);

  const handleClick = (event) => setAnchorEl(event.currentTarget);

  const handleClose = () => setAnchorEl(null);

  const {setCreateClassDialog , setJoinClassDialog , loggedInUser , logout ,} = useLocalContext();

  const handleCreate = () => {
    handleClose();
    setCreateClassDialog(true);
  };

  const handleJoin = () => {
    handleClose();
    setJoinClassDialog(true);
  };


  return(
    <div className={classes.root}>
    <AppBar className={classes.appBar} position="static">
      <Toolbar className={classes.toolbar}>
        <div className={classes.headerWrapper}>
          {children}
          
          <Typography variant="h5" className={classes.title}>
            Online
          </Typography>
          <Typography variant="h6" className={classes.title}>
             Classroom
          </Typography>
          
        </div>
        <div className={classes.header__wrapper__right}>
          <Add onClick={handleClick} className={classes.icon} />
          <Apps className={classes.icon} />
          <Menu
          id='simple-menu'
          anchorEl={anchorEl}
          keepMounted
          open={Boolean(anchorEl)}
          onclose={handleClose}
          >
            <MenuItem onClick = {handleJoin}>Join class</MenuItem>
            <MenuItem onClick = {handleCreate}>Create class</MenuItem>
          </Menu>

          <div>
            <Avatar onClick={() => logout()} src={loggedInUser?.photoURL} className={classes.icon} />
          </div>

        </div>
      </Toolbar>
    </AppBar>
    <CreateClass />
    <JoinClass />
    
    </div>
  );
  
};

export default Header;
