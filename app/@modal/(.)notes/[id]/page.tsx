import { fetchNoteById } from '@/lib/api';
import { notFound } from 'next/navigation';
import NotePreview from './NotePreview.client';

type Props = {
  params: { id: string };
};

export default async function NoteModal({ params }: Props) {
  const note = await fetchNoteById(params.id);

  if (!note) {
    notFound();
  }

  return <NotePreview note={note} />;
}
