interface ErrorProps {
  error: string;
}

export function ErrorMessage({ error }: ErrorProps) {
  return <p className="error-message">{error}</p>;
}
