import React, {useState, useEffect} from 'react';
import api from '../../services/api';

import Container from '@material-ui/core/Container';

import { TracksTable, AddTracksModal } from '../../components/Tracks'

interface TracksDTO {
  id: number,
  descricao: string
}

const Tracks: React.FC = () => {
  const [tracks, setTracks] = useState<TracksDTO[]>([]);
  const [editTrack, setEditTrack] = useState({});
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setEditTrack({});
    setOpen(false);
  };

  useEffect(() => {
    getTracks();
  }, []);

  const getTracks = async (): Promise<void> => {
    const response = await api.get('tracks');
    setTracks(response.data);
  }

  const handleAddTrack = async (track: any) => {
    if (track.id) {
      const response = await api.put(`tracks/${track.id}`, track);
      const index = tracks.findIndex(c => c.id === track.id);
      const updateTracks = [...tracks];
      updateTracks[index] = response.data

      setTracks(updateTracks);
    } else {
      const response = await api.post('tracks', track);
      setTracks([...tracks, response.data]);
    }
  }

  const handleEditTrack = (editTrack: TracksDTO) => {
    setEditTrack(editTrack);
    setOpen(true);
  }

  const handleRemoveTrack = async (trackId: number) => {
    await api.delete(`tracks/${trackId}`);
    const filter = tracks.filter(c => c.id !== trackId);

    setTracks(filter);
    handleClose();
  }

  return (
    <Container>
      <h1>Pistas</h1>
      <AddTracksModal 
        onAdd={handleAddTrack}
        onEdit={handleEditTrack}
        onDelete={handleRemoveTrack}
        track={editTrack}
        open={open}
        onOpen={handleClickOpen}
        onClose={handleClose}
      />
      <TracksTable tracks={tracks} onEdit={handleEditTrack}/>
    </Container>
  )
};

export default Tracks;