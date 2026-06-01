type Props = {
  children: React.ReactNode;
  sidebar: React.ReactNode;
};

export default function NotesFilterLayout({ children, sidebar }: Props) {
  return (
    <div>
      {sidebar}
      {children}
    </div>
  );
}
