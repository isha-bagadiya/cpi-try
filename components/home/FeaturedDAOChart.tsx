// import CPIChartForOP from "../common/CPIChartForOp";
import dynamic from "next/dynamic";
// import CPIChartofDAOs from "../common/CPIChartofDAOs";
// import LineGraph from "../common/LineGraph";

const CPIChartofDAOs = dynamic(() => import("../common/CPIChartofDAOs"), {
  ssr: false,
  loading: () => <div className="h-[500px] animate-pulse bg-white rounded-lg w-full opacity-50" />,
});
const LineGraph = dynamic(() => import("../common/LineGraph"), {
  ssr: false,
  loading: () => <div className="h-[500px] animate-pulse bg-white rounded-lg w-full opacity-50" />,
});
const CPIChartForOP = dynamic(() => import("../common/CPIChartForOp"), {
  ssr: false,
  loading: () => <div className="h-[500px] animate-pulse bg-white rounded-lg w-full opacity-50" />,
});

const FeaturedDAOChart: React.FC = () => {
  return (
    <>
      <CPIChartofDAOs />
      <LineGraph />
      <CPIChartForOP />
    </>
  );
};

export default FeaturedDAOChart;
