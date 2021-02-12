import React, { useState, useEffect } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';

export default function AddRacesModal(props: {
  race: any,
  onAdd: any,
  onEdit: any,
  onDelete: any,
  onOpen: any,
  onClose: any,
  open: any }) {

  const [competitorId, setCompetitorId] = useState('');
  const [trackId, setTrackId] = useState('');
  const [raceDate, setRaceDate] = useState('');
  const [timeSpent, setTimeSpent] = useState('');

  useEffect(() => {
    const loadValues = () => {
      const { race } = props;
      if (race) {
        setCompetitorId(race.competitorId);
        setTrackId(race.trackId);
        setRaceDate(race.raceDate);
        setTimeSpent(race.timeSpent);
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
        Adicionar Corrida
      </Button>
      <Dialog open={props.open} onClose={props.onClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Corrida</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="competitor"
            label="Competidor"
            type="number"
            value={competitorId}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setCompetitorId(e.target.value)}
            fullWidth
          />
                    <TextField
            margin="dense"
            id="track"
            label="Pista"
            type="number"
            value={trackId}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setTrackId(e.target.value)}
            fullWidth
          />
                    <TextField
            margin="dense"
            id="date"
            label="Data"
            type="date"
            value={raceDate}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setRaceDate(e.target.value)}
            fullWidth
          />
                    <TextField
            margin="dense"
            id="timeSpent"
            label="Tempo"
            type="number"
            value={timeSpent}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setTimeSpent(e.target.value)}
            fullWidth
          />
        </DialogContent>
        <DialogActions style={{marginTop: '30px'}}>
          {/* {props.race.id &&
          <Button onClick={() => props.onDelete(props.race.id)}
            style={{margin: '0 auto 0 0', color: 'red'}}
          >
            Deletar
          </Button>
          } */}
          <Button onClick={props.onClose} color="primary">
            Cancelar
          </Button>
          <Button onClick={() => {
            props.onAdd({
              id: props.race.id ?? props.race.id,
              competitorId: Number(competitorId),
              trackId: Number(trackId),
              raceDate,
              timeSpent: Number(trackId)
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
