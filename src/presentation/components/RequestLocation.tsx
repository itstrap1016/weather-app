interface RequestLocationProps {
  error: string | null;
  requestPermission: () => void;
}

function RequestLocation({ error, requestPermission }: RequestLocationProps) {
  return (
    <section className="min-w-screen min-h-screen flex justify-center items-center">
      <h2 className="sr-only">위치권한 재요청</h2>
      <p className="mb-4">{error}</p>
      <button
        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        onClick={requestPermission}
      >
        위치 권한 다시 요청
      </button>
    </section>
  );
}

export default RequestLocation;
