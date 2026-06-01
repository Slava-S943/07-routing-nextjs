import { QueryClient, dehydrate, HydrationBoundary } from '@tanstack/react-query';
import { fetchNotes } from '@/lib/api';
import NoteList from '@/components/NoteList/NoteList';
import type { Note } from '@/types/note';

type Props = {
  params: { slug: string };
};

type NotesResponse = {
  notes: Note[];
};

export default async function FilterNotesPage({ params }: Props) {
  const tag = params.slug ?? 'all';

  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ['notes', 'filter', tag],
    queryFn: () =>
      fetchNotes({
        page: 1,
        perPage: 12,
        search: tag === 'all' ? '' : tag,
      }),
  });

  const data = queryClient.getQueryData<NotesResponse>(['notes', 'filter', tag]);

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <div>
        <h1>Notes filtered by: {tag}</h1>

        <NoteList notes={data?.notes ?? []} />
      </div>
    </HydrationBoundary>
  );
}
