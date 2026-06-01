import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query';

import NotesClient from './Notes.client';
import { fetchNotes } from '@/lib/api';
import type { NoteTag } from '@/types/note';

type Props = {
  params: Promise<{
    slug?: string[];
  }>;
};

export default async function FilterNotesPage({ params }: Props) {
  const resolvedParams = await params;

  const raw = resolvedParams.slug?.[0] ?? 'all';

  const tag: NoteTag | undefined = raw === 'all' ? undefined : (raw as NoteTag);

  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ['notes', raw],
    queryFn: () =>
      fetchNotes({
        page: 1,
        perPage: 12,
        tag,
      }),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NotesClient tag={raw as NoteTag} />
    </HydrationBoundary>
  );
}
