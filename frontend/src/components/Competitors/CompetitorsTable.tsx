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

export default function DenseTable(props: { competitors: any, onEdit: any }) {
  const classes = useStyles();
  
  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} size="small" aria-label="a dense table">
        <TableHead>
          <TableRow>
            <TableCell>Nome</TableCell>
            <TableCell align="right">Sexo</TableCell>
            <TableCell align="right">Temperatura&nbsp;(grau)</TableCell>
            <TableCell align="right">Peso&nbsp;(kg)</TableCell>
            <TableCell align="right">Altura&nbsp;(m)</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {props.competitors.map((row: any) => (
            <TableRow 
            key={row.id}
            style={{cursor:'pointer'}}
            onClick={() => props.onEdit(row)}>
              <TableCell component="th" scope="row">
                {row.name}
              </TableCell>
              <TableCell align="right">{row.sex}</TableCell>
              <TableCell align="right">{row.temperature}</TableCell>
              <TableCell align="right">{row.weight}</TableCell>
              <TableCell align="right">{row.height}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
