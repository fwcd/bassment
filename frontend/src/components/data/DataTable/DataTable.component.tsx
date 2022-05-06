import { useDataTableStyles } from '@bassment/components/data/DataTable/DataTable.style';
import { DataTableRow } from '@bassment/components/data/DataTableRow';
import React, { useState } from 'react';
import { FlatList } from 'react-native';

interface DataTableProps {
  headers: string[];
  initialWidths?: number[];
  data?: { [key: string]: string }[];
}

export function DataTable(props: DataTableProps) {
  const styles = useDataTableStyles();
  // TODO: Assert that initialWidths.length == headers.length
  const [widths, setWidths] = useState(
    props.initialWidths ?? props.headers.map(_ => 200),
  );

  return (
    // TODO: Horizontal scroll?
    <FlatList
      style={styles.table}
      data={props.data}
      ListHeaderComponent={
        <DataTableRow headers={props.headers} widths={widths} even />
      }
      renderItem={({ item, index: i }) => (
        <DataTableRow
          headers={props.headers}
          widths={widths}
          even={i % 2 === 1}
          item={item}
        />
      )}
    />
  );
}
