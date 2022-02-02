import React from 'react';
import { Draggable } from 'react-beautiful-dnd';
import { Avatar, DragItem, CardHeader, CardFooter, Author } from './styles';
import { useFullScreenDilog } from './hooks';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import Box from '@mui/material/Box';
import DialogTitle from '@mui/material/DialogTitle';
import DialogActions from '@mui/material/DialogActions';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DatePicker from '@mui/lab/DatePicker';

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
        fullScreen={false}
        maxWidth={'lg'}
        open={fullScreen}
        onClose={handleClose}
      >
        <DialogTitle>Details</DialogTitle>
        <DialogContent>
          <Box
            noValidate
            component="form"
            sx={{
              display: 'flex',
              flexDirection: 'column',
              m: 'auto',
              width: 'fit-content',
              height: '500',
            }}
          >
            <Grid container spacing={1}>
              <Grid item xs={4}>
                <Box
                  component="img"
                  sx={{
                    height: 233,
                    width: 165,
                    borderRadius: 50,
                    maxHeight: { xs: 233, md: 167 },
                    maxWidth: { xs: 350, md: 250 },
                  }}
                  src={dilogData.thumbnailUrl}
                />
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
        <DialogActions>
          <Button onClick={handleClose}>Close</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default ListItem;
