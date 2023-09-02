import {
  AddBox,
  ArrowDownward,
  Check,
  ChevronLeft,
  ChevronRight,
  Clear,
  DeleteOutline,
  Edit,
  FilterList,
  FirstPage,
  LastPage,
  SaveAlt,
  Search,
} from '@material-ui/icons'
import MaterialTable from 'material-table'
import React, { forwardRef } from 'react'

const icons = {
  Delete: forwardRef((props, ref) => (
    <DeleteOutline color="secondary" {...props} ref={ref} />
  )),
  Clear: forwardRef((props, ref) => (
    <Clear {...props} ref={ref} />
  )),
  Check: forwardRef((props, ref) => (
    <Check {...props} ref={ref} />
  )),
  Edit: forwardRef((props, ref) => (
    <Edit color="secondary" {...props} ref={ref} />
  )),
  Filter: forwardRef((props, ref) => (
    <FilterList color="secondary" {...props} ref={ref} />
  )),
  DetailPanel: forwardRef((props, ref) => (
    <ChevronRight color="secondary" {...props} ref={ref} />
  )),
  SortArrow: forwardRef((props, ref) => (
    <ArrowDownward {...props} ref={ref} />
  )),
  FirstPage: forwardRef((props, ref) => (
    <FirstPage {...props} ref={ref} />
  )),
  LastPage: forwardRef((props, ref) => (
    <LastPage {...props} ref={ref} />
  )),
  NextPage: forwardRef((props, ref) => (
    <ChevronRight {...props} ref={ref} />
  )),
  PreviousPage: forwardRef((props, ref) => (
    <ChevronLeft {...props} ref={ref} />
  )),
  Search: forwardRef((props, ref) => (
    <Search {...props} ref={ref} />
  )),
  ResetSearch: forwardRef((props, ref) => (
    <Clear {...props} ref={ref} />
  )),
  Add: forwardRef((props, ref) => (
    <AddBox {...props} ref={ref} />
  )),
  Export: forwardRef((props, ref) => (
    <SaveAlt {...props} ref={ref} />
  )),
}


export const MaterialTableWrapper = (props) => {
  const { title, columns, data, editable } = props
  return (
    <MaterialTable
      title={title}
      columns={columns}
      data={data}
      editable={editable}
      isLoading={false}
      options={{
        exportButton: true,
        search: false,
        sorting: false,
        draggable: false,
        exportAllData: true,
        paging: true,
        pageSizeOptions: [5, 10, 25, 50, 100],
        pageSize: 10,
        emptyRowsWhenPaging: false,
      }}
      localization={{
        header: {
          actions: '',
        },
      }}
      icons={icons}
    />)
}
