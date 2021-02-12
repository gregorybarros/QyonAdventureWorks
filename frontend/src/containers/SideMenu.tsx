import React, {useState} from 'react';
import { Link } from 'react-router-dom';

import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Collapse from '@material-ui/core/Collapse';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import DashboardIcon from '@material-ui/icons/Dashboard';
import AssessmentIcon from '@material-ui/icons/Assessment';
import AddIcon from '@material-ui/icons/Add';
import StorageIcon from '@material-ui/icons/Storage';
import DirectionsRunIcon from '@material-ui/icons/DirectionsRun';
import MapIcon from '@material-ui/icons/Map';
import FlagIcon from '@material-ui/icons/Flag';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: '100%',
      maxWidth: 360,
      backgroundColor: theme.palette.background.paper,
    },
    nested: {
      paddingLeft: theme.spacing(4),
    },
  }),
);
const SideMenu = () => {
  const classes = useStyles();
  const [openRegister, setOpenRegister] = useState(false);

  const handleOpenRegister = () => {
    setOpenRegister(!openRegister);
  };


  return (
    <List
      component="nav"
      aria-labelledby="nested-list-subheader"
      className={classes.root}
    >
      <ListItem button component={Link} to="/" >
        <ListItemIcon>
          <DashboardIcon />
        </ListItemIcon>
        <ListItemText primary="Dashboard" />
      </ListItem>
      <ListItem button onClick={handleOpenRegister}>
        <ListItemIcon>
          <StorageIcon />
        </ListItemIcon>
        <ListItemText primary="Cadastros" />
        {openRegister ? <ExpandLess /> : <ExpandMore />}
      </ListItem>
      <Collapse in={openRegister} timeout="auto" unmountOnExit>       
          <ListItem button component={Link} to="/competitors" >
            <ListItemIcon>
              <DirectionsRunIcon />
            </ListItemIcon>
            <ListItemText primary="Competidores" />
          </ListItem>
          <ListItem button component={Link} to="/tracks" >
            <ListItemIcon>
              <MapIcon />
            </ListItemIcon>
            <ListItemText primary="Pistas" />
          </ListItem>
          <ListItem button component={Link} to="/races" >
            <ListItemIcon>
              <FlagIcon />
            </ListItemIcon>
            <ListItemText primary="Corridas" />
          </ListItem>
      </Collapse>
      <ListItem button component={Link} to="/reports" >
        <ListItemIcon>
          <AssessmentIcon />
        </ListItemIcon>
        <ListItemText primary="Relatórios" />
      </ListItem>
    </List>
  );
}

export default SideMenu;
