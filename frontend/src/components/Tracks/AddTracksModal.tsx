import React, { useState, useEffect } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';

export default function AddTracksModal(props: {
  track: any,
  onAdd: any,
  onEdit: any,
  onDelete: any,
  onOpen: any,
  onClose: any,
  open: any }) {

  const [description, setDescription] = useState('');

  useEffect(() => {
    const loadValues = () => {
      const { track } = props;
      if (track) {
        setDescription(track.description);
      }
    }
    loadValues();
  }, [props])


  return (
    <div>
      <Button
        onClick={props.onOpen}
        style={{marginTop: '20px', marginBottom: '20px'}}
        variant="contained"
        color="primary"
        >
        Adicionar Pista
      </Button>
      <Dialog open={props.open} onClose={props.onClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Pista</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="description"
            label="Descrição"
            type="text"
            value={description}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setDescription(e.target.value)}
            fullWidth
          />
        </DialogContent>
        <DialogActions style={{marginTop: '30px'}}>
          {props.track.id &&
          <Button onClick={() => props.onDelete(props.track.id)}
            style={{margin: '0 auto 0 0', color: 'red'}}
          >
            Deletar
          </Button>
          }
          <Button onClick={props.onClose} color="primary">
            Cancelar
          </Button>
          <Button onClick={() => {
            props.onAdd({
              id: props.track.id ?? props.track.id,
              description,
            });
            props.onClose();
          }
          } color="primary">
            Salvar
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
