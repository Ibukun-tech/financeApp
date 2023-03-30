import { useState, useMemo } from "react";
import { useTheme, Box, Typography, Button } from "@mui/material";
import DashboardBox from "../../components/DashboardBox";
import { useGetKpisQuery } from "../../state/api";
import {
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  LineChart,
  Label,
  Legend,
  Line,
  ResponsiveContainer,
} from "recharts";
import FlexBetween from "../../components/FlexBetween";
import regression, { DataPoint } from "regression";
interface Props {}

const Predicitions = (props: Props) => {
  const { palette } = useTheme();
  const [isPredictions, setIsPredictions] = useState(false);
  const { data: kpiData } = useGetKpisQuery();
  const formatData = useMemo(() => {
    if (!kpiData) return [];
    const monthData = kpiData[0].monthlyData;
    const formatted: Array<DataPoint> = monthData.map(
      ({ revenue }, i: number) => {
        return [i, revenue];
      }
    );
    const regressionLine = regression.linear(formatted);
    return monthData.map(({ month, revenue }, i: number) => {
      return {
        name: month,
        "Actual Revenue": revenue,
        "Regression Line": regressionLine.points[i][1],
        "Predicted Revenue": regressionLine.predict(i + 12)[1],
      };
    });
  }, [kpiData]);
  return (
    <DashboardBox width="100%" height="100%" padding="1rem" overflow="hidden">
      <FlexBetween m="1rem 2.5rem" gap="0.3rem">
        <Box>
          <Typography variant="h3">Revenue and Predictions</Typography>
          <Typography variant="h6">
            charted revenue and predicted revenue based on a simple linear
            regression model
          </Typography>
        </Box>
        <Button
          onClick={() => setIsPredictions(!isPredictions)}
          sx={{
            color: palette.grey[900],
            backgroundColor: palette.grey[700],
            boxShadow: "0.1rem 0.1rem 0.1rem 0.1rem rgba(0,0,0,0.4)",
          }}
        >
          Show predicted Revenue for Next Year
        </Button>
      </FlexBetween>
      <ResponsiveContainer height="100%" width="100%">
        <LineChart
          data={formatData}
          margin={{
            top: 20,
            right: 74,
            left: 20,
            bottom: 80,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke={palette.grey[800]} />
          <XAxis dataKey="name" tickLine={false} style={{ fontSize: "10px" }}>
            <Label value="month" offset={-5} position="insideBottom" />
          </XAxis>
          <XAxis />
          <YAxis
            tickFormatter={(v) => `$${v}}`}
            axisLine={{ strokeWidth: "0" }}
            domain={[12000, 26000]}
            tickLine={false}
            style={{ fontSize: "10px" }}
          >
            <Label value="Revenue in USD " />
          </YAxis>
          <Tooltip />
          <Legend verticalAlign="top" />
          <Line
            dataKey="Actual Revenue"
            yAxisId="left"
            type="monotone"
            stroke={palette.primary.main}
            strokeWidth={0}
            dot={{ strokeWidth: 5 }}
          />
          <Line
            // dataKey="expenses"
            yAxisId="right"
            type="monotone"
            dataKey="Regression Line"
            stroke="#8884d8"
            dot={false}
          />
          {isPredictions && (
            <Line
              strokeDasharray="5 5"
              dataKey="Predicted Revenue"
              stroke={palette.secondary[500]}
            />
          )}
        </LineChart>
      </ResponsiveContainer>
    </DashboardBox>
  );
};
export default Predicitions;
