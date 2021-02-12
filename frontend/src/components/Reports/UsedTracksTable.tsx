import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

export default function UsedTracksTable(props: { dataTable: any }) {
  const classes = useStyles();

  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} size="small" aria-label="a dense table">
        <TableHead>
          <TableRow>
            <TableCell>Pista</TableCell>
            <TableCell align="right">Competidor</TableCell>
            <TableCell align="right">Data</TableCell>
            <TableCell align="right">Tempo</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {props.dataTable.map((row: any) => (
            <TableRow 
            key={row.id}>
              <TableCell component="th" scope="row">
                {row.track.description}
              </TableCell>
              <TableCell align="right">{row.competitor.name}</TableCell>
              <TableCell align="right">{row.raceDate}</TableCell>
              <TableCell align="right">{row.timeSpent}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
