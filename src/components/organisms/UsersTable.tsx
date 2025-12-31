import TableRender from '../organisms/TableRender';
import { getUsers } from '@/src/actions/user.actions';

interface Props {
  search?: string;
  estado?: 'ACTIVO' | 'INACTIVO';
  page: number;
  limit: number;
}

const UsersTable = async ({ search, estado, page, limit }: Props) => {
    
  const { data: users, total } = await getUsers({
    search,
    estado,
    page,
    limit,
  });

  return (
    <TableRender
      users={users}
      total={total}
      currentPage={page}
      pageSize={limit}
    />
  );
};

export default UsersTable;
