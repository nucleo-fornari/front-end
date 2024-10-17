import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';

export default function AlignItemsList() {
  return (
    <List className='w-full max-w-xs bg-blue-pastel'>
      <ListItem alignItems="center">
        <ListItemAvatar>
          <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
        </ListItemAvatar>
        <ListItemText
          primary="Julia Damacena de Moura"
        />
      </ListItem>
      <Divider variant="inset" component="li" />
      <ListItem alignItems="center">
        <ListItemAvatar>
          <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
        </ListItemAvatar>
        <ListItemText
          primary="Julia Damacena de Moura"
        />
      </ListItem>
      <Divider variant="inset" component="li" />
      <ListItem alignItems="center">
        <ListItemAvatar>
          <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
        </ListItemAvatar>
        <ListItemText
          primary="Julia Damacena de Moura"
        />
      </ListItem>
      <Divider variant="inset" component="li" />
      <ListItem alignItems="center">
        <ListItemAvatar>
          <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
        </ListItemAvatar>
        <ListItemText
          primary="Julia Damacena de Moura"
        />
      </ListItem>
      <Divider variant="inset" component="li" />
      <ListItem alignItems="center">
        <ListItemAvatar>
          <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
        </ListItemAvatar>
        <ListItemText
          primary="Julia Damacena de Moura"
        />
      </ListItem>
      <Divider variant="inset" component="li" />
      <ListItem alignItems="center">
        <ListItemAvatar>
          <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
        </ListItemAvatar>
        <ListItemText
          primary="Julia Damacena de Moura"
        />
      </ListItem>
      <Divider variant="inset" component="li" />
      <ListItem alignItems="center">
        <ListItemAvatar>
          <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
        </ListItemAvatar>
        <ListItemText
          primary="Julia Damacena de Moura"
        />
      </ListItem>
      <Divider variant="inset" component="li" />
      
      
    </List>
  );
}
