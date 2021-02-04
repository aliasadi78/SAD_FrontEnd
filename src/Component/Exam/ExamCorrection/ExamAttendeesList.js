import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import axios from 'axios' ;
import serverURL from '../../../utils/serverURL';
import tokenConfig from '../../../utils/tokenConfig' ;
import { useHistory } from "react-router-dom";

const columns = [  
  {
    id: 'grade',
    label: <span style = {{fontFamily: 'Vazir'}}> نمره  </span>,
    minWidth:0,
    align: 'right',
    format: (value) => value.toLocaleString('en-US'),
  },  
  { id: 'name', label: <span style = {{fontFamily: 'Vazir'}}> نام و نام خانوادگی </span>, minWidth: 170
    , align : 'right' , format: (value) => value.toLocaleString('en-US') }
];

function createData(name, grade , username) {  
  return { name , grade , username };
}


const useStyles = makeStyles({
  root: {
    width: '100%',
  },
  container: {
    maxHeight: 440,
  },
});

export default function ExamAttendeesList(props) {
  const classes = useStyles();
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [rows , setRows] = React.useState([]);

  let history = useHistory();

  const examId = props.examId ;  
  var attlist = [] ;
  var ll = [] ;
  const [listLoad , setListLoad] = React.useState(false);

  if(listLoad == false)
    axios.get(serverURL() + "exam/" + examId + "/attendees" , tokenConfig() )
    .then(res => {        
      attlist.push(...res.data.attendees);        
      setListLoad(true);
      attlist.map( (att) => {
        ll.push(createData(att.firstname + " " + att.lastname , att.totalGrade , att.username));
      });

      setRows([...ll]);      

    })
    .catch(err => {        
        setListLoad(true);
    });
  

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <Paper className={classes.root}>
      <TableContainer className={classes.container}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (                
                    <TableCell
                    key={column.id}
                    align={column.align}
                    style={{ minWidth: column.minWidth , fontFamily: 'Vazir' }}
                    >                    
                        <p style = {{fontFamily: 'Vazir'}} >
                            {column.label}
                        </p>                    
                    </TableCell>                
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {
              return (
                <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
                  {columns.map((column) => {
                    const value = row[column.id];
                    console.log(row);
                    return (                      
                        <TableCell key={column.id} align={column.align}
                          onClick = {() => {
                            history.push("/exam/correction/" + examId + "/" + row['username']);
                          }}                        
                        >
                          {column.format && typeof value === 'number' ? column.format(value) : value}
                        </TableCell>                      
                    );
                  })}
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination        
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={rows.length}
        labelRowsPerPage = {<span style = {{fontFamily: 'Vazir'}}>
            تعداد دانش آموزان در هر صفحه 
        </span>}         
        rowsPerPage={rowsPerPage}
        page={page}
        onChangePage={handleChangePage}
        onChangeRowsPerPage={handleChangeRowsPerPage}
      />
    </Paper>
  );
}
