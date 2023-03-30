import React, { useMemo } from "react";
import { useTheme, Box, Typography } from "@mui/material";
import FlexBetween from "../../components/FlexBetween";
import BoxHeader from "../../components/Boxheader";
import {
  ZAxis,
  PieChart,
  Pie,
  Cell,
  AreaChart,
  BarChart,
  Bar,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  LineChart,
  Legend,
  Line,
  ResponsiveContainer,
  ScatterChart,
  Scatter,
} from "recharts";
import DashboardBox from "../../components/DashboardBox";
import { useGetProductsQuery, useGetKpisQuery } from "../../state/api";
interface Props {}
const pieData = [
  { name: "Group A", value: 600 },
  { name: "Group B", value: 400 },
];
const Row2 = (props: Props) => {
  const { data: operationalData } = useGetKpisQuery();
  const { data: productData } = useGetProductsQuery();
  const { palette } = useTheme();
  const pieColors = [palette.primary[800], palette.primary[300]];
  // console.log("data", data);
  const operationalExpenses = useMemo(() => {
    return (
      operationalData &&
      operationalData[0].monthlyData.map(
        ({ month, operationalExpenses, nonOperationalExpenses }) => {
          return {
            name: month.substring(0, 3),
            "Operational Expenses": operationalExpenses,
            "Non Operational Expenses": nonOperationalExpenses,
          };
        }
      )
    );
  }, [operationalData]);
  const productExpenseData = useMemo(() => {
    return (
      productData &&
      productData.map(({ _id, price, expense }) => {
        return {
          id: _id,
          price: price,
          expense: expense,
        };
      })
    );
  }, [productData]);
  return (
    <>
      <DashboardBox bgcolor="#ffff" gridArea="d">
        <BoxHeader
          title="Operational vs Non-Operational Expenses"
          subTitle="top line represents reveue, bottom line represents expenses "
          sideText="+4%"
        />
        <ResponsiveContainer height={250} width="100%">
          <LineChart
            data={operationalExpenses}
            margin={{
              top: 20,
              right: 0,
              left: -10,
              bottom: 55,
            }}
          >
            <CartesianGrid vertical={false} stroke={palette.grey[800]} />
            <XAxis
              dataKey="name"
              tickLine={false}
              style={{ fontSize: "10px" }}
            />
            <YAxis
              yAxisId="left"
              orientation="left"
              axisLine={false}
              tickLine={false}
              style={{ fontSize: "10px" }}
            />
            <YAxis
              yAxisId="right"
              orientation="right"
              axisLine={false}
              tickLine={false}
              style={{ fontSize: "10px" }}
            />
            <Tooltip />
            {/* <Legend height={20} wrapperStyle={{ margin: "0 0 10px 0" }} /> */}
            <Line
              dataKey="Non Operational Expenses"
              yAxisId="left"
              type="monotone"
              stroke={palette.tertiary[500]}
            />
            <Line
              // dataKey="expenses"
              yAxisId="right"
              type="monotone"
              dataKey="Operational Expenses"
              stroke={palette.primary.main}
            />
          </LineChart>
        </ResponsiveContainer>
      </DashboardBox>
      <DashboardBox bgcolor="#ffff" gridArea="e">
        <BoxHeader title="Campaigns and Targets" sideText="+4%" />
        <FlexBetween mt="0.25rem" gap="1.5rem" pr="1rem">
          <PieChart
            width={110}
            height={100}
            margin={{
              top: 0,
              right: -10,
              left: 10,
              bottom: 0,
            }}
          >
            <Pie
              data={pieData}
              innerRadius={18}
              outerRadius={38}
              paddingAngle={5}
              dataKey="value"
            >
              {pieData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={pieColors[index]} />
              ))}
            </Pie>
          </PieChart>
          <Box ml="-0.7rem" flexBasis="40%" textAlign="center">
            <Typography variant="h5">Target Sales</Typography>
            <Typography m="0.3rem 0" variant="h3" color={palette.primary[300]}>
              93
            </Typography>
            <Typography variant="h6">
              Finance Goals of the campaign that is desired
            </Typography>
          </Box>

          <Box flexBasis="40%">
            <Typography variant="h5">losses in Revenue</Typography>
            <Typography variant="h6">Losses are down by 20%</Typography>
            <Typography variant="h5" mt="0.4rem">
              ProfitMargins
            </Typography>
            <Typography variant="h6">
              Margins are up by 20% from last month
            </Typography>
          </Box>
        </FlexBetween>
      </DashboardBox>
      <DashboardBox bgcolor="#ffff" gridArea="f">
        <BoxHeader title="Product Prices vs Expenses" sideText="+4%" />
        <ResponsiveContainer width="100%" height={200}>
          <ScatterChart
            margin={{
              top: 20,
              right: 20,
              bottom: 20,
              left: -10,
            }}
          >
            <CartesianGrid stroke={palette.grey[800]} />
            <XAxis
              name="price"
              type="number"
              dataKey="price"
              axisLine={false}
              tickLine={false}
              style={{ fontSize: "10px" }}
              tickFormatter={(v) => `$${v}`}
            />
            <YAxis
              type="number"
              dataKey="expense"
              name="expense"
              axisLine={false}
              tickLine={false}
              style={{ fontSize: "10px" }}
              tickFormatter={(v) => `$${v}`}
            />
            <ZAxis type="number" range={[20]} />
            <Tooltip formatter={(v) => `$${v}`} />
            <Scatter
              name="Product  Expense Ratio"
              data={productExpenseData}
              fill={palette.tertiary[500]}
            />
          </ScatterChart>
        </ResponsiveContainer>
      </DashboardBox>
    </>
  );
};

export default Row2;
