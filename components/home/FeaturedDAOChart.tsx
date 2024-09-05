import CPIChartForOP from "../common/CPIChartForOp";
import CPIChartofDAOs from "../common/CPIChartofDAOs";
import LineGraph from "../common/LineGraph";

const FeaturedDAOChart: React.FC = () => {
    return <>
        <CPIChartofDAOs />
        <LineGraph />
        <CPIChartForOP />

    </>
}

export default FeaturedDAOChart;