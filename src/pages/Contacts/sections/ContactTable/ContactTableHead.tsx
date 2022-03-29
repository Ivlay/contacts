import { useCallback } from 'react';

import { Contact } from 'src/store/components/contacts/types';

import { useAppActions, useAppSelector } from 'src/store/hooks';

import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import TableSortLabel from '@mui/material/TableSortLabel';

const ContactTableHead: React.FC = () => {
  const dataTable = useAppSelector((state) => state.contacts.data[0]);
  const searchParams = useAppSelector((state) => state.contacts.searchParams);

  const { updateSearchParams } = useAppActions();

  const handleChangeSort = useCallback(
    (key: keyof Contact) => {
      const isDesc = searchParams._order === 'desc';

      updateSearchParams({_sort: key, _order: isDesc ? 'asc' : 'desc'});
    },
    [updateSearchParams, searchParams],
  );

  return (
    <TableHead>
      <TableRow>
        {(Object.keys(dataTable || {}) as Array<keyof Contact>)?.map((key) => (
          key === 'id' ? (
            <TableCell key={key} padding="checkbox" />
          ) : (
            <TableCell
              align="center"
              key={key}
            >
              <TableSortLabel
                active={searchParams._sort === key}
                direction={searchParams._order}
                onClick={handleChangeSort.bind(null, key)}
              >
                {key}
              </TableSortLabel>
            </TableCell>
          )
        ))}
      </TableRow>
    </TableHead>
  );
}

export default ContactTableHead;
