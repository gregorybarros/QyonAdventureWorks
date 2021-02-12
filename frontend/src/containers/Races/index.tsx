import React, {useState, useEffect} from 'react';
import api from '../../services/api';

import Container from '@material-ui/core/Container';

import { RacesTable, AddRacesModal } from '../../components/Races'

interface RacesDTO {
  id: number,
  competidor_id: string,
  pista_corrida_id: string,
  data_corrida: string,
  tempo_gasto: string
}

const Races: React.FC = () => {
  const [races, setRaces] = useState<RacesDTO[]>([]);
  const [editRace, setEditRace] = useState({});
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setEditRace({});
    setOpen(false);
  };

  useEffect(() => {
    getRaces();
  }, []);

  const getRaces = async (): Promise<void> => {
    const response = await api.get('races?_expand=competitor&_expand=track');
    setRaces(response.data);
  }

  const handleAddRace = async (race: RacesDTO) => {
    if (race.id) {
      const response = await api.put(`races/${race.id}`, race);
      const index = races.findIndex(c => c.id === race.id);
      const updateRaces = [...races];
      updateRaces[index] = response.data

      setRaces(updateRaces);
    } else {
      const response = await api.post('races', race);
      setRaces([...races, response.data]);
    }
  }

  const handleEditRace = (editRace: RacesDTO) => {
    setEditRace(editRace);
    setOpen(true);
  }

  const handleRemoveRace = async (raceId: number) => {
    await api.delete(`races/${raceId}`);
    const filter = races.filter(c => c.id !== raceId);

    setRaces(filter);
    handleClose();
  }

  return (
    <Container>
      <h1>Corridas</h1>
      <AddRacesModal 
        onAdd={handleAddRace}
        onEdit={handleEditRace}
        onDelete={handleRemoveRace}
        race={editRace}
        open={open}
        onOpen={handleClickOpen}
        onClose={handleClose}
      />
      <RacesTable 
        onEdit={handleEditRace}
        races={races}
      />
    </Container>
  )
};

export default Races;