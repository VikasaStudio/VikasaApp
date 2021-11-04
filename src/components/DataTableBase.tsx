import React from 'react';
import DataTable from 'react-data-table-component';
const selectProps = { indeterminate: (isIndeterminate: boolean) => isIndeterminate };

// Credits : https://react-data-table-component.netlify.app/?path=/docs/getting-started-patterns--page

function DataTableBase(props: any): JSX.Element {
    return (
        <DataTable
            dense
            direction="ltr"
            fixedHeaderScrollHeight="200px"
            responsive
            striped
            subHeaderAlign="right"
            columns={props.columns}
            data={props.data}
            {...props}
        />
    );
}

export default DataTableBase;