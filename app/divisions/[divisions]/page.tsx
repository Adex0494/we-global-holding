interface Props {
  params: { division: string };
}

export default function DivisionPage({ params }: Props) {
  return (
    <div className="min-h-screen text-white p-10">
      <h1 className="text-4xl font-bold capitalize">
        {params.division} Division
      </h1>
      <p className="mt-4 text-lg opacity-80">Page under construction...</p>
    </div>
  );
}
