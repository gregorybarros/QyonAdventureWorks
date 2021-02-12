import React, { useState, useEffect } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';

export default function AddCompetitorsModal(props: {
  competitor: any,
  onAdd: any,
  onEdit: any,
  onDelete: any,
  onOpen: any,
  onClose: any,
  open: any }) {

  const [name, setName] = useState('');
  const [sex, setSex] = useState('');
  const [temperature, setTemperature] = useState('');
  const [weight, setWeight] = useState('');
  const [height, setHeight] = useState('');

  useEffect(() => {
    const loadValues = () => {
      const { competitor } = props;
      if (competitor) {
        setName(competitor.name);
        setSex(competitor.sex);
        setTemperature(competitor.temperature);
        setWeight(competitor.weight);
        setHeight(competitor.height);
      }
    }
    loadValues();
  }, [props]);


  return (
    <div>
      <Button
        onClick={props.onOpen}
        style={{marginTop: '20px', marginBottom: '20px'}}
        variant="contained"
        color="primary"
        >
        Adicionar Competidor
      </Button>
      <Dialog open={props.open} onClose={props.onClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Competidor</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Nome"
            type="text"
            value={name}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setName(e.target.value)}
            fullWidth
          />
          <TextField
            margin="dense"
            id="sex"
            label="Sexo"
            type="text"
            value={sex}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSex(e.target.value)}
            fullWidth
          />
          <TextField
            margin="dense"
            id="temperature"
            label="Temperatura"
            type="text"
            value={temperature}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setTemperature(e.target.value)}
            fullWidth
          />
          <TextField
            margin="dense"
            id="oz"
            label="Peso"
            type="text"
            value={weight}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setWeight(e.target.value)}
            fullWidth
          />
          <TextField
            margin="dense"
            id="height"
            label="Altura"
            type="text"
            value={height}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setHeight(e.target.value)}
            fullWidth
          />
        </DialogContent>
        <DialogActions style={{marginTop: '30px'}}>
          {props.competitor.id &&
          <Button onClick={() => props.onDelete(props.competitor.id)}
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
              id: props.competitor.id ?? props.competitor.id,
              name,
              sex,
              temperature: Number(temperature),
              weight: Number(weight),
              height: Number(height)
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
