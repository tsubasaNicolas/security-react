export function Alert({ message }) {
  return (
    <div className="bg-red-100 border border-red text-red-700 px-4 py-3 rouded relative mb-2 text-center">
      <span className="sm:inline block">{message}</span>
    </div>
  );
}
