import React, { useState, useEffect } from 'react';
import api from '../../services/api';

import Container from '@material-ui/core/Container';

import { AddCompetitorsModal, CompetitorsTable } from '../../components/Competitors'

interface CompetitorsDTO {
  id: number,
  name: string,
  sex: string,
  temperature: string,
  weight: string,
  height: string
}

const Competitors: React.FC = () => {
  const [competitors, setCompetitors] = useState<CompetitorsDTO[]>([]);
  const [editCompetitor, setEditCompetitor] = useState({});
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setEditCompetitor({});
    setOpen(false);
  };

  useEffect(() => {
    getCompetitors();
  }, []);

  const getCompetitors = async (): Promise<void> => {
    const response = await api.get('competitors');
    setCompetitors(response.data);
  }

  const handleAddCompetitor = async (competitor: CompetitorsDTO) => {
    if (competitor.id) {
      const response = await api.put(`competitors/${competitor.id}`, competitor);
      const index = competitors.findIndex(c => c.id === competitor.id);
      const updateCompetitors = [...competitors];
      updateCompetitors[index] = response.data

      setCompetitors(updateCompetitors);
    } else {
      const response = await api.post('competitors', competitor);
      setCompetitors([...competitors, response.data]);
    }
  }

  const handleEditCompetitor = (editCompetitor: CompetitorsDTO) => {
    setEditCompetitor(editCompetitor);
    setOpen(true);
  }

  const handleRemoveCompetitor = async (competitorId: number) => {
    await api.delete(`competitors/${competitorId}`);
    const filter = competitors.filter(c => c.id !== competitorId);

    setCompetitors(filter);
    handleClose();
  }

  return (
    <Container>
      <h1>Competidores</h1>
      <AddCompetitorsModal
        onAdd={handleAddCompetitor}
        onEdit={handleEditCompetitor}
        onDelete={handleRemoveCompetitor}
        competitor={editCompetitor}
        open={open}
        onOpen={handleClickOpen}
        onClose={handleClose}
      />
      <CompetitorsTable 
        onEdit={handleEditCompetitor}
        competitors={competitors}
      />
    </Container>
  )
};

export default Competitors;