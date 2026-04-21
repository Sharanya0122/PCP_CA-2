import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Home from '../pages/Home';
import OrderDetail from '../pages/OrderDetail';
import Filter from '../pages/Filter';
import Stats from '../pages/Stats';

const AppRouter = () => {
  return (
    <Router>
      <div>
        <nav>
          <Link to="/">Home</Link> |{" "}
          <Link to="/filter">Filter</Link> |{" "}
          <Link to="/stats">Stats</Link>
        </nav>

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/orders/:id" element={<OrderDetail />} />
          <Route path="/filter" element={<Filter />} />
          <Route path="/stats" element={<Stats />} />

          {/* Fallback route */}
          <Route path="*" element={<Home />} />
        </Routes>
      </div>
    </Router>
  );
};

export default AppRouter;