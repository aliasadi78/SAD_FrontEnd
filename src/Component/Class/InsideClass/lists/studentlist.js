import React from 'react';
import axios from 'axios' ;
import serverURL from '../../../../utils/serverURL' ;
import tokenConfig from  '../../../../utils/tokenConfig' ;

import PropTypes from 'prop-types';
import M_RTL from "../../../M_RTL";
import clsx from 'clsx';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import { LightenDarkenColor } from 'lighten-darken-color'; 
import { lighten, makeStyles , withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import RemoveCircleRoundedIcon from '@material-ui/icons/RemoveCircleRounded';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Checkbox from '@material-ui/core/Checkbox';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import DeleteIcon from '@material-ui/icons/Delete';
import Material_RTL from '../../../Material_RTL';

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort(array, comparator) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

const headCells = [
  { id: 'name', numeric: false, disablePadding: false, label: 'عکس' },
  { id: 'name', numeric: false, disablePadding: false, label: 'نام' },
  { id: 'calories', numeric: false, disablePadding: false, label: 'ایمیل' },
  { id: 'fat', numeric: true, disablePadding: false, label: 'نمره' },
  // { id: 'carbs', numeric: true, disablePadding: false, label: 'Carbs (g)' },
  { id: 'protein', numeric: true, disablePadding: false, label: 'حذف' },
];

function EnhancedTableHead(props) {
  const { classes, onSelectAllClick, order, orderBy, numSelected, rowCount, onRequestSort } = props;
  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow>
        <TableCell padding="checkbox">
          <Checkbox
            indeterminate={numSelected > 0 && numSelected < rowCount}
            checked={rowCount > 0 && numSelected === rowCount}
            onChange={onSelectAllClick}
            inputProps={{ 'aria-label': 'select all desserts' }}
          />
        </TableCell>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={headCell.numeric ? 'right' : 'left'}
            padding={headCell.disablePadding ? 'none' : 'default'}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <TableSortLabel
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : 'asc'}
              onClick={createSortHandler(headCell.id)}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <span className={classes.visuallyHidden}>
                  {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                </span>
              ) : null}
            </TableSortLabel>
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

const StyledTableRow = withStyles((theme) => ({
  root: {  
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
    },
  },
}))(TableRow);

EnhancedTableHead.propTypes = {
  classes: PropTypes.object.isRequired,
  numSelected: PropTypes.number.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  onSelectAllClick: PropTypes.func.isRequired,
  order: PropTypes.oneOf(['asc', 'desc']).isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired,
};

const useToolbarStyles = makeStyles((theme) => ({
  root: {
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(1),    
  },
  highlight:
    theme.palette.type === 'light'
      ? {
          color: theme.palette.secondary.main,
          backgroundColor: lighten(theme.palette.secondary.light, 0.85),
        }
      : {
          color: theme.palette.text.primary,
          backgroundColor: theme.palette.secondary.dark,
        },
  title: {
    flex: '1 1 100%',  
  },
}));

const EnhancedTableToolbar = (props) => {
  const classes = useToolbarStyles();
  const { numSelected } = props;

  return (
    <Toolbar
      className={clsx(classes.root, {
        [classes.highlight]: numSelected > 0,
      })}
    >
      {numSelected > 0 ? (
        <Typography className={classes.title} style={{fontFamily: 'Vazir' , color : 'white' }} color="inherit" variant="subtitle1" component="div">
          {numSelected} نفر انتخاب شده 
        </Typography>
      ) : (
        <Typography className={classes.title} style={{fontFamily: 'Vazir' , color : '#3D5A80' }} variant="h6" id="tableTitle" component="div">
          دانش آموزان 
        </Typography>
      )}

      {numSelected > 0 && (
        <Tooltip title="Delete">
          <Button onClick={() => {
            props.selected.forEach(element => {
              removeMember(element.name , props.classId);
            });
          }} aria-label="delete">
            <DeleteIcon style={{color : 'white '}} />
          </Button>
        </Tooltip>  
      )}
    </Toolbar>
  );
};

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
  },
  paper: {
    width: '100%',
    marginBottom: theme.spacing(2),
  },
  table: {
    minWidth: 750,
  },
  visuallyHidden: {
    border: 0,
    clip: 'rect(0 0 0 0)',
    height: 1,
    margin: -1,
    overflow: 'hidden',
    padding: 0,
    position: 'absolute',
    top: 20,
    width: 1,
  },
}));

// remove a member ------------------------------------------------------------------------
function removeMember(username , classId ) {
  console.log("sdlkjfaldf");
  axios.delete(serverURL() + "class/" + classId + "/members/" + username , tokenConfig())
  .then(res =>{

  })
  .catch(err =>{
    console.log(err);
  })
};

export default function Studentlist(props) {
  const classes = useStyles();
  const [order, setOrder] = React.useState('asc');
  const [orderBy, setOrderBy] = React.useState('calories');
  const [selected, setSelected] = React.useState([]);  
  const [members , setMembers] = React.useState([]);  

  const [adminName , setAdminName] = React.useState(null);
  const [userName , setUserName] = React.useState(null);
  const [isAdmin , setIsAdmin] = React.useState(false);

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };
  //check if admin or not--------------------------------------------------------------------
  axios.get(serverURL() + "class/" + props.classId , tokenConfig())
  .then(res=>{ setAdminName(res.data.firstname + " " + res.data.lasstname)    })
  .catch(err=>{console.log(err);});

  axios.get(serverURL() + "user", tokenConfig())
  .then(res=>{
     setUserName(res.data.user.firstname + " " + res.data.user.lasstname);
      if(userName == adminName)
        setIsAdmin(true);
    })
  .catch(err=>{console.log(err);});
  // get members -----------------------------------------------------------------------------
  axios.get(serverURL() + "class/" + props.classId + "/members" , tokenConfig())
  .then(res=>{    
    setMembers([...res.data.members])
    console.log(res);
    console.log(members.length);
  })
  .catch(err=>{
    console.log(err);
  });
  
  //------------------------------------------------------------------------------------------

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelecteds = members.map((n) => n.name);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event, name) => {
    const selectedIndex = selected.indexOf(name);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1),
      );
    }

    setSelected(newSelected);
  };

  const isSelected = (name) => selected.indexOf(name) !== -1;  

  return (
    <div className={classes.root}>       
    <Material_RTL>
      <M_RTL>
        {/* <EnhancedTableToolbar selected = {selected} numSelected={selected.length} /> */}
        <TableContainer>
          <Table
            className={classes.table}
            aria-labelledby="tableTitle"
            size={'medium'}
            aria-label="enhanced table"
          >              
            <EnhancedTableHead
              classes={classes}
              numSelected={selected.length}
              order={order}
              orderBy={orderBy}
              onSelectAllClick={handleSelectAllClick}
              onRequestSort={handleRequestSort}
              rowCount={members.length}
            />
            <TableBody>
              {stableSort(members, getComparator(order, orderBy))                
                .map((row, index) => {
                  const isItemSelected = isSelected(row.username);
                  const labelId = `enhanced-table-checkbox-${index}`;

                  return (
                    <StyledTableRow                      
                      // hover
                      onClick={(event) => handleClick(event, row.username)}
                      role="checkbox"
                      aria-checked={isItemSelected}
                      tabIndex={-1}
                      key={row.username}
                      selected={isItemSelected}
                    >
                      <TableCell padding="checkbox">
                        <Checkbox
                          checked={isItemSelected}
                          inputProps={{ 'aria-labelledby': labelId }}
                        />                        
                      </TableCell>
                      <TableCell align = "center">
                        <Avatar alt="Remy Sharp" src={row.avatar} />
                      </TableCell>
                      <TableCell component="th" id={labelId} scope="row" padding="none">
                        {row.firstname + " " + row.lastname}
                      </TableCell>
                      <TableCell align="left">{row.email}</TableCell>
                      <TableCell align="right">10</TableCell>
                      <TableCell align="right">
                        { isAdmin == true &&
                          <Button onClick={() => {removeMember(row.username , props.classId)}}>
                            <RemoveCircleRoundedIcon style={{color : '#E63946'}} />
                          </Button>  
                        }
                      </TableCell>                      
                    </StyledTableRow>
                  );
                })}              
            </TableBody>
          </Table>
        </TableContainer>     
        </M_RTL>         
        </Material_RTL>
    </div>
  );
}
