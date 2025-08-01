import { BrowserRouter, Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Home from "@/presentation/pages/Home";
import Search from "@/presentation/pages/Search";
import Setting from "./presentation/pages/Setting";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
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
