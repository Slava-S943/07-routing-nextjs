'use client';

import { useState, useEffect } from 'react';
import { useQuery, keepPreviousData } from '@tanstack/react-query';
import { useDebouncedCallback } from 'use-debounce';

import { fetchNotes } from '@/lib/api';

import NoteList from '@/components/NoteList/NoteList';
import SearchBox from '@/components/SearchBox/SearchBox';
import Pagination from '@/components/Pagination/Pagination';
import Modal from '@/components/Modal/Modal';
import NoteForm from '@/components/NoteForm/NoteForm';

import type { FetchNotesResponse } from '@/lib/api';

import css from './NotesPage.module.css';

type Props = {
  tag: string;
};

export default function NotesClient({ tag }: Props) {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleSearch = useDebouncedCallback((value: string) => {
    setSearch(value);
    setPage(1);
  }, 500);

  useEffect(() => {
    setPage(1);
  }, [tag]);

  const { data, isLoading, isError } = useQuery<FetchNotesResponse>({
    queryKey: ['notes', page, search, tag],
    queryFn: () =>
      fetchNotes({
        page,
        perPage: 12,
        search: search,
      }),
    placeholderData: keepPreviousData,
  });

  if (isLoading) return <p>Loading notes...</p>;
  if (isError) return <p>Failed to load notes.</p>;

  return (
    <div className={css.app}>
      <div className={css.toolbar}>
        <button onClick={() => setIsModalOpen(true)} className={css.button}>
          Create note
        </button>

        <SearchBox value={search} onChange={handleSearch} />
      </div>

      {data && <NoteList notes={data.notes} />}

      {data && data.totalPages > 1 && (
        <Pagination page={page} totalPages={data.totalPages} setPage={setPage} />
      )}

      {isModalOpen && (
        <Modal onClose={() => setIsModalOpen(false)}>
          <NoteForm
            onSuccess={() => setIsModalOpen(false)}
            onCancel={() => setIsModalOpen(false)}
          />
        </Modal>
      )}
    </div>
  );
}
