import NotesClient from './Notes.client';

type Props = {
  params: {
    slug?: string[];
  };
};

export default function FilterNotesPage({ params }: Props) {
  const tag = params.slug?.[0] ?? 'all';

  return <NotesClient tag={tag} />;
}
