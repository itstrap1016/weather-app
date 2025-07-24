interface LoadingProps {
  text: string;
}

function Loading({ text }: LoadingProps) {
  return (
    <div className="min-w-screen min-h-screen flex justify-center items-center">
      {text} 정보를 불러오는 중입니다...
      <span className="animate-spin">⏳</span>
    </div>
  );
}

export default Loading;
