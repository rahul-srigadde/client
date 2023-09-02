import React, { useEffect, useState } from 'react'
import { FormComponent } from './FormComponent';
import { MaterialTableWrapper } from './MaterialTableWrapper';
import { makeStyles, Typography } from '@material-ui/core'
import { useAPI } from './common/useAPI';


export const UserRegister = () => {
  const useStyles = makeStyles(theme => ({
    container: {
      display: 'flex',
      flexDirection: 'column',
      margin: '16px 16px 0px 16px',
      borderRadius: '4px',
      boxShadow:
        '0px 2px 1px -1px rgba(0,0,0,0.2), 0px 1px 1px 0px rgba(0,0,0,0.14), 0px 1px 3px 0px rgba(0,0,0,0.12)',
    },
    tableContainer: {
      margin: '15px,15px',
      position: 'relative',
      zIndex: 0,
    },
    containerBackground: {
      background: theme.palette.common.white,
    },
    containerStyle: {
      position: 'relative',
      overflow: 'hidden',
      padding: '6px 10px 0px 20px',
    },
  }))

  const classes = useStyles()
  const { doCall } = useAPI()
  const [data, setData] = useState([])

  const getUserRecords = async () => {
    doCall({
      method: 'get',
      url: 'user/users',
      //successMessage: 'hello rahul'
    }).then(
      (res) => {
        setData(res.data)
        console.log(res)
      },
      _err => {
        console.log(_err)
      },
    )
  }

  useEffect(() => {
    getUserRecords()
  }, [])
  const getColumns = () => {
    return [
      { title: 'Full Name', field: 'fullName' },
      { title: 'Mobile Number', field: 'mobileNo' },
      { title: 'Email Id', field: 'emailId' },
      {
        title: 'Job Type', field: 'jobType',
        lookup: { 'FT': 'FT', 'PT': 'PT', 'consultant': "consultant" }
      },
      { title: 'Date of Birth', field: 'dateOfBirth' },
      {
        title: 'Preferred Location', field: 'preferredLocation',
        lookup: { 'Chennai': 'Chennai', 'Hyderabad': 'Hyderabad', 'Bangalore': "Bangalore" }
      },
    ]
  }
  return (<>
    <Typography component="div">
      <Typography
        component="div"
        className={`${classes.container} ${classes.containerBackground}`}
      >
        <Typography component="div" className={classes.containerStyle}>
          <FormComponent />
        </Typography>
      </Typography>
    </Typography>
    <Typography
      component="div"
      className={`${classes.container} ${classes.tableContainer}`}
    >
      <MaterialTableWrapper
        title={"Users Records"}
        columns={getColumns()}
        data={data}
        editable={{
          onRowAdd: newData =>
            new Promise((resolve, reject) => {
              setTimeout(() => {
                setData([...data, newData]);

                resolve();
              }, 1000)
            }),
          onRowUpdate: (newData, oldData) =>
            new Promise((resolve, reject) => {
              setTimeout(() => {
                const dataUpdate = [...data];
                const index = oldData.tableData.id;
                dataUpdate[index] = newData;
                setData([...dataUpdate]);

                resolve();
              }, 1000)
            }),
          onRowDelete: oldData =>
            new Promise((resolve, reject) => {
              setTimeout(() => {
                const dataDelete = [...data];
                const index = oldData.tableData.id;
                dataDelete.splice(index, 1);
                setData([...dataDelete]);

                resolve()
              }, 1000)
            }),
        }} />
    </Typography>
  </>);
}