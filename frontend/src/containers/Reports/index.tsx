import React, { useEffect, useState } from 'react';
import api from '../../services/api';

import { 
  UsedTracksTable,
  AverageTimeCompetitorsTable,
  NoRunCompetitorsTable
} from '../../components/Reports';

import Container from '@material-ui/core/Container';
import Paper from '@material-ui/core/Paper';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';

interface DataTableDTO {

}

const Reports: React.FC = () => {
  const [value, setValue] = useState(0);
  const [dataTable, setDataTable] = useState<DataTableDTO[]>([]);

  useEffect(() => {
    loadData();
  }, [])

  const loadData = async (averageTime:any = {}) => {
    const response = await api.get('races?_expand=competitor&_expand=track');
    if (averageTime.track) { 
      let count = 0;
      response.data.map((res: any) => {
        return count = count + res.timeSpent;
      });
      count = count / response.data.length;
      averageTime.timeSpent = count;
      setDataTable([...response.data, averageTime]);
    } else {
      setDataTable(response.data);
    }
  };

  const handleChange = async (event: React.ChangeEvent<{}>, newValue: number) => {
    event.preventDefault();
    setDataTable([]);
    setValue(newValue);

    if (newValue === 1) {      
      loadData({ 
        id: '',
        competitor: { name: '' },
        track:{ description: '' },
        timeSpent: 12,
        raceDate: 'TEMPO MÉDIO:' });
    }
    else if (newValue === 2) {
      const response = await api.get('competitors?_embed=races');
      let competitors: any = [];
      
      response.data.map((competitor: any)=> {
        return competitor.races.length === 0 && competitors.push(competitor);
      })
      setDataTable(competitors);
    } else {
      loadData();
    }
  };
  return (
    <Container>
      <h1>Relatórios</h1>
        <Paper square style={{marginTop: '40px'}}>
        <Tabs
          value={value}
          indicatorColor="primary"
          textColor="primary"
          onChange={handleChange}
          aria-label="disabled tabs example"
          centered
        >
          <Tab label="Pistas Utilizadas" />
          <Tab label="Competidores Tempo Médio" />
          <Tab label="Competidores Não Correram" />
        </Tabs>
      </Paper>
      {value === 0 ? 
      <UsedTracksTable dataTable={dataTable}/> :
      value === 1 ?
      <AverageTimeCompetitorsTable dataTable={dataTable}/> :
      <NoRunCompetitorsTable dataTable={dataTable}/> }
    </Container>
  )
};

export default Reports;