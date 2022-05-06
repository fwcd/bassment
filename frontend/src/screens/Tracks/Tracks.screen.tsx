import { DataTable } from '@bassment/components/data/DataTable';
import React from 'react';

export function TracksScreen() {
  return (
    <DataTable
      headers={['Title', 'Artist', 'Demo']}
      data={[
        {
          Title: 'A song',
          Artist: 'Sample artist',
          Demo: '',
        },
        {
          Title: 'Another song',
          Artist: 'Another artist',
          Demo: '123',
        },
      ]}
    />
  );
}
