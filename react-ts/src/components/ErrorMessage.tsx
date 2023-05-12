interface ErrorProps {
  error: string;
}

export function ErrorMessage({ error }: ErrorProps) {
  return <p className="text-center text-red-500">{error}</p>;
}
