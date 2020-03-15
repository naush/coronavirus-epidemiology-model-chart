import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { withRouter } from 'react-router-dom';
import MenuIcon from '@material-ui/icons/Menu';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import IconButton from '@material-ui/core/IconButton';

const useStyles = makeStyles(theme => ({
  menuButton: {
    marginRight: theme.spacing(2),
  },
}));

function Navigator(props) {
  const [anchor, setAnchor] = useState(null);
  const classes = useStyles();

  const handleOpen = (event) => {
    setAnchor(event.currentTarget);
  };

  const handleClose = (path) => () => {
    if (path) {
      props.history.push(path);
    }

    setAnchor(null);
  };

  return (
    <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
      <MenuIcon onClick={handleOpen} />
      <Menu
        anchorEl={anchor}
        keepMounted
        open={Boolean(anchor)}
        onClose={handleClose()}
      >
        <MenuItem onClick={handleClose('/')}>Projection</MenuItem>
        <MenuItem onClick={handleClose('/safe-group-size')}>Safe Group Size</MenuItem>
      </Menu>
    </IconButton>
  );
}

export default withRouter(Navigator);
