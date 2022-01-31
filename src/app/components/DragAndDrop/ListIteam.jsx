import React from 'react';
import { Draggable } from 'react-beautiful-dnd';
import { Avatar, DragItem, CardHeader, CardFooter, Author } from './styles';
import { useFullScreenDilog } from './hooks';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';

import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Slide from '@mui/material/Slide';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DatePicker from '@mui/lab/DatePicker';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const ListItem = ({ item, index }) => {
  const {
    fullScreen,
    handleClickOpen,
    handleClose,
    dilogData,
    value,
    setValue,
  } = useFullScreenDilog(index);

  return (
    <div>
      <Draggable draggableId={`${item.id}`} index={index}>
        {(provided, snapshot) => {
          return (
            <DragItem
              ref={provided.innerRef}
              snapshot={snapshot}
              {...provided.draggableProps}
              {...provided.dragHandleProps}
              onClick={() => handleClickOpen(item)}
            >
              <CardHeader>Content</CardHeader>
              <CardFooter>
                <span>{item.title}</span>
                <Author>
                  {item.id}
                  <Avatar src={item.url} />
                </Author>
              </CardFooter>
            </DragItem>
          );
        }}
      </Draggable>
      <Dialog
        fullScreen
        open={fullScreen}
        onClose={handleClose}
        TransitionComponent={Transition}
      >
        <AppBar sx={{ position: 'relative' }}>
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              onClick={handleClose}
              aria-label="close"
            ></IconButton>
            <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
              Details
            </Typography>
            <Button autoFocus color="inherit" onClick={handleClose}>
              Close
            </Button>
          </Toolbar>
        </AppBar>
        <DialogContent>
          <Box sx={{ flexGrow: 1 }}>
            <Grid container spacing={1}>
              <Grid item xs={4}>
                <img alt="Remy Sharp" src={dilogData.thumbnailUrl} />
              </Grid>
              <Grid item xs={4}>
                <p>{dilogData.title}</p>
                <p>{dilogData.title}</p>
                <p>{dilogData.title}</p>
                <p>{dilogData.title}</p>
              </Grid>
              <Grid item xs={4}>
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                  <DatePicker
                    label="Helper text example"
                    value={value}
                    onChange={newValue => {
                      setValue(newValue);
                    }}
                    renderInput={params => (
                      <TextField
                        {...params}
                        helperText={params?.inputProps?.placeholder}
                      />
                    )}
                  />
                </LocalizationProvider>
              </Grid>
            </Grid>
          </Box>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ListItem;
