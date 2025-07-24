function Error() {
  return (
    <div className="min-w-screen min-h-screen flex justify-center items-center text-red-500 gap-2">
      오류가 발생했습니다. 잠시 후 다시 시도해주세요.
      <span className="text-2xl">❌</span>
    </div>
  );
}

export default Error;
