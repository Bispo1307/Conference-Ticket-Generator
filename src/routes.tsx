import { BrowserRouter, Route, Routes } from "react-router";
import { Home } from "./pages/Home";
import { Ticket } from "./pages/Ticket";
import { NotFound } from "./pages/NotFound";

export const RoutesApp = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/generate" element={<Ticket />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
};
