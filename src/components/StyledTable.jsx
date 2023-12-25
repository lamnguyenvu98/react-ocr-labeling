import {
  DataGrid,
  gridPageCountSelector,
  gridPageSelector,
  useGridApiContext,
  useGridSelector,
} from '@mui/x-data-grid';
import { styled, createTheme } from '@mui/material/styles';
import Pagination from '@mui/material/Pagination';
import PaginationItem from '@mui/material/PaginationItem';

export const changeTheme = (theme = 'dark') => {
    // theme is 'light' or 'dark'
    return createTheme({
        palette: {
            mode: theme
        }
    })
} 

function customCheckbox(theme) {
    return {
      '& .MuiCheckbox-root svg': {
        width: 16,
        height: 16,
        backgroundColor: 'transparent',
        border: `1px solid ${
          theme.palette.mode === 'light' ? '#d9d9d9' : 'rgb(67, 67, 67)'
        }`,
        borderRadius: 2,
      },
      '& .MuiCheckbox-root svg path': {
        display: 'none',
      },
      '& .MuiCheckbox-root.Mui-checked:not(.MuiCheckbox-indeterminate) svg': {
        backgroundColor: '#888efff4',
        borderColor: '#888efff4',
      },
      '& .MuiCheckbox-root.Mui-checked .MuiIconButton-label:after': {
        position: 'absolute',
        display: 'table',
        border: '2px solid #fff',
        borderTop: 0,
        borderLeft: 0,
        transform: 'rotate(45deg) translate(-50%,-50%)',
        opacity: 1,
        transition: 'all .2s cubic-bezier(.12,.4,.29,1.46) .1s',
        content: '""',
        top: '50%',
        left: '39%',
        width: 5.71428571,
        height: 9.14285714,
      },
      '& .MuiCheckbox-root.MuiCheckbox-indeterminate .MuiIconButton-label:after': {
        width: 8,
        height: 8,
        backgroundColor: '#888efff4',
        transform: 'none',
        top: '39%',
        border: 0,
      },
    };
  }

export const StyledDataGrid = styled(DataGrid)(({ theme }) => ({
    border: 0,
    color:
      theme.palette.mode === 'light' ? 'rgb(0,0,0)' : 'rgba(255,255,255,0.85)',
    fontFamily: [
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(','),
    WebkitFontSmoothing: 'auto',
    letterSpacing: 'normal',
    '& .MuiDataGrid-columnsContainer': {
      backgroundColor: theme.palette.mode === 'light' ? '#fafafa' : '#1d1d1d',
    },
    '& .MuiDataGrid-iconSeparator': {
      display: 'none',
    },
    '& .MuiDataGrid-columnHeader, .MuiDataGrid-cell': {
      borderRight: `2px solid ${
        theme.palette.mode === 'light' ? '#f0f0f0' : '#303030'
      }`,
      backgroundColor:
        theme.palette.mode === 'light' ? '#f0f0f0' : '#181818',
    },
    '& .MuiDataGrid-columnHeader': {
      // color:
      //   theme.palette.mode === 'light' ? '#1d1d1d' : '#646cff',
      fontSize: 20
    },
    '& .MuiDataGrid-columnsContainer, .MuiDataGrid-cell': {
      borderBottom: `2px solid ${
        theme.palette.mode === 'light' ? '#f0f0f0' : '#303030'
      }`,
    },
    '& .MuiDataGrid-cell': {
      color:
        theme.palette.mode === 'light' ? 'rgba(0,0,0,.85)' : 'rgba(255,255,255,0.65)',
      backgroundColor:
        theme.palette.mode === 'light' ? '#f0f0f0' : '#181818'
    },
    '& .MuiPaginationItem-root': {
        borderRadius: 2,
        color: 
            theme.palette.mode === 'light' ? 'rgba(0,0,0,.45)' : 'rgba(255,255,255,0.85)',
        backgroundColor:
            theme.palette.mode === 'light' ? 'rgba(0,0,0,0.85)' : '#646cff'
    },
    '& .MuiDataGrid-root .MuiDataGrid-columnSeparator .MuiDataGrid-rowSeparator': {
        borderColor: `1px solid ${
            theme.palette.mode === 'light' ? '#303030' : '#f0f0f0'
        }`
    },
    ...customCheckbox(theme),
  }));
  
export function CustomPagination() {
    const apiRef = useGridApiContext();
    const page = useGridSelector(apiRef, gridPageSelector);
    const pageCount = useGridSelector(apiRef, gridPageCountSelector);
  
    return (
      <Pagination
        color="primary"
        variant="outlined"
        shape="rounded"
        showFirstButton={true}
        showLastButton={true}
        page={page + 1}
        count={pageCount}
        // @ts-expect-error
        renderItem={(props2) => <PaginationItem {...props2} disableRipple />}
        onChange={(event, value) => apiRef.current.setPage(value - 1)}
        sx={{
            '& .MuiPaginationItem-root': {
                color: '#white',
            }
        }}
      />
    );
  }