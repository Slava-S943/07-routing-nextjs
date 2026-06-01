import { fetchNoteById } from '@/lib/api';
import { notFound } from 'next/navigation';
import NoteModalClient from '../NoteModalClient';

type Props = {
  params: { id: string };
};

export default async function NoteModal({ params }: Props) {
  const note = await fetchNoteById(params.id);

  if (!note) {
    notFound();
  }

  return <NoteModalClient note={note} />;
}
