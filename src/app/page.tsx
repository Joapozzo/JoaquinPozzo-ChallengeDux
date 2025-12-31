import { Suspense } from 'react';
import HomeClient from '../components/pages/Homeclient';
import UsersTable from '../components/organisms/UsersTable';
import UsersLoadingSkeleton from '@/src/components/pages/HomaClientSkeleton';

interface HomeProps {
  searchParams: Promise<{
    search?: string;
    estado?: 'ACTIVO' | 'INACTIVO';
    page?: string;
    limit?: string;
  }>;
}

const Home = async ({ searchParams }: HomeProps) => {
  const params = await searchParams;

  const page = Number(params.page ?? 1);
  const limit = Number(params.limit ?? 10);

  return (
    <HomeClient searchParams={params}>
      <Suspense fallback={<UsersLoadingSkeleton />}>
        <UsersTable
          search={params.search}
          estado={params.estado}
          page={page}
          limit={limit}
        />
      </Suspense>
    </HomeClient>
  );
};

export default Home;
