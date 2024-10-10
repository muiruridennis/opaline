import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const data = [
  { name: 'Jan', earnings: 4000 },
  { name: 'Feb', earnings: 3000 },
  { name: 'Mar', earnings: 5000 },
  { name: 'Apr', earnings: 7000 },
  { name: 'May', earnings: 6000 },
  { name: 'Jun', earnings: 8000 },
];

export const EarningsGraph = () => (
  <ResponsiveContainer width="100%" height={300}>
    <LineChart data={data}>
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="name" />
      <YAxis />
      <Tooltip />
      <Line type="monotone" dataKey="earnings" stroke="#8884d8" strokeWidth={2} />
    </LineChart>
  </ResponsiveContainer>
);
