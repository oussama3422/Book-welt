import React from "react";
import styled from "styled-components";
import Heading from "../../ui/Heading";
import {
  Cell,
  Legend,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
} from "recharts";
import { useDarkMode } from "../../context/DarkModeContext";

// Styled component for the chart box
const ChartBox = styled.div`
  /* Box */
  background-color: var(--color-grey-0);
  border: 1px solid var(--color-grey-100);
  border-radius: var(--border-radius-md);
  padding: 2.4rem 3.2rem;
  grid-column: 3 / span 2;

  & > *:first-child {
    margin-bottom: 1.6rem;
  }

  & .recharts-pie-label-text {
    font-weight: 600;
  }
`;

// Initial data structure for the chart
const startDataLight = [
  { duration: "1 night", value: 0, color: "#0088FE" },
  { duration: "2 nights", value: 0, color: "#00C49F" },
  { duration: "3 nights", value: 0, color: "#FFBB28" },
  { duration: "4-5 nights", value: 0, color: "#FF8042" },
  { duration: "6-7 nights", value: 0, color: "#D0B10F" },
  { duration: "8-14 nights", value: 0, color: "#A95A90" },
  { duration: "15-21 nights", value: 0, color: "#C78F42" },
  { duration: "21+ nights", value: 0, color: "#6A4C93" },
];

const startDataDark = [
  { duration: "1 night", value: 0, color: "#FF6347" },
  { duration: "2 nights", value: 0, color: "#20B2AA" },
  { duration: "3 nights", value: 0, color: "#FFD700" },
  { duration: "4-5 nights", value: 0, color: "#FF4500" },
  { duration: "6-7 nights", value: 0, color: "#ADFF2F" },
  { duration: "8-14 nights", value: 0, color: "#FF69B4" },
  { duration: "15-21 nights", value: 0, color: "#FF8C00" },
  { duration: "21+ nights", value: 0, color: "#9370DB" },
];

// Function to prepare the data for the chart
function prepareData(startData, stays) {
  function incArrayValue(arr, field) {
    return arr.map((obj) =>
      obj.duration === field ? { ...obj, value: obj.value + 1 } : obj
    );
  }

  // Ensure stays is an array
  const data = (stays || [])
    .reduce((arr, cur) => {
      const num = cur.numNights;
      if (num === 1) return incArrayValue(arr, "1 night");
      if (num === 2) return incArrayValue(arr, "2 nights");
      if (num === 3) return incArrayValue(arr, "3 nights");
      if ([4, 5].includes(num)) return incArrayValue(arr, "4-5 nights");
      if ([6, 7].includes(num)) return incArrayValue(arr, "6-7 nights");
      if (num >= 8 && num <= 14) return incArrayValue(arr, "8-14 nights");
      if (num >= 15 && num <= 21) return incArrayValue(arr, "15-21 nights");
      if (num >= 21) return incArrayValue(arr, "21+ nights");
      return arr;
    }, startData)
    .filter((obj) => obj.value > 0); // Filter out categories with zero values

  return data;
}
function DurationChart({ confirmedStats }) {
  const { isDarkMode } = useDarkMode();

  const startDate = isDarkMode ? startDataDark : startDataLight;

  const data = prepareData(startDate, confirmedStats);

  console.log("data", data);

  return (
    <ChartBox>
      <Heading as="h3">Stay duration summary</Heading>

      <ResponsiveContainer width="100%" height={240}>
        <PieChart>
          <Pie
            data={data}
            nameKey="duration"
            dataKey="value"
            innerRadius={85}
            outerRadius={110}
            cx="40%"
            cy="50%"
            paddingAngle={2}
          >
            {data.map((entry) => (
              <Cell
                stroke={entry.color}
                fill={entry.color}
                key={entry.duration}
              />
            ))}
          </Pie>
          <Tooltip />
          <Legend
            verticalAlign="middle"
            align="right"
            width="30%"
            layout="vertical"
            iconSize={15}
            iconType="circle"
          />
        </PieChart>
      </ResponsiveContainer>
    </ChartBox>
  );
}

export default DurationChart;
