import React from 'react';
import { useTheme } from '@material-ui/core/styles';

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';

function Chart(props) {
  const { data } = props;
  const theme = useTheme();

  return (
    <ResponsiveContainer>
      <LineChart
        data={data}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip labelFormatter={(day) => `Day ${day}`} />
        <Legend />
        <Line type="monotone" dataKey="numberOfCases" name="Number of Cases" stroke={theme.palette.primary.main} activeDot={{ r: 8 }} />
        <Line type="monotone" dataKey="numberOfDeaths" name="Number of Deaths" stroke={theme.palette.text.secondary} />
        <Line type="monotone" dataKey="numberHospitalized" name="Number Hospitalized" stroke={theme.palette.tertiary.main} />
        <Line type="monotone" dataKey="numberInHospitalAtTheTime" name="Number in hospital at the time" stroke={theme.palette.quaternary.main} />
      </LineChart>
    </ResponsiveContainer>
  );
}

export default Chart;
