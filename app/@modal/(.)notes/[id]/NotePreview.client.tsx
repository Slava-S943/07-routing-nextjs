'use client';

import { useRouter } from 'next/navigation';
import css from './modal.module.css';

type Props = {
  note: {
    id: string;
    title: string;
    content: string;
  };
};

export default function NotePreview({ note }: Props) {
  const router = useRouter();

  return (
    <div className={css.backdrop} onClick={() => router.back()}>
      <div className={css.modal} onClick={e => e.stopPropagation()}>
        <h2>{note.title}</h2>
        <p>{note.content}</p>

        <button onClick={() => router.back()}>Close</button>
      </div>
    </div>
  );
}
