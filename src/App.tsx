import { BrowserRouter, Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Home from "@/presentation/pages/Home";
import Search from "@/presentation/pages/Search";
import Setting from "./presentation/pages/Setting";

const queryClient = new QueryClient();

function App() {
  // 배포 환경에서만 basename 적용
  const basename = import.meta.env.MODE === "production" ? "/weather-app" : "";

  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter basename={basename}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/search" element={<Search />} />
          <Route path="/setting" element={<Setting />} />
          {/* 추후 다른 페이지 추가 가능 */}
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  );
}

export default App;
