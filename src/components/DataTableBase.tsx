import React from 'react';
import DataTable from 'react-data-table-component';

// Credits : https://react-data-table-component.netlify.app/?path=/docs/getting-started-patterns--page
export default function DataTableBase(props: any): JSX.Element {
    return ( <DataTable
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