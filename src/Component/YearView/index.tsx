import MonthView from "../../Component/MonthView";
import { DateColorsConfig } from "../../Const/colors";

interface IProps {
  isSimple?: boolean; // 是否為簡單模式
  dateColorsConfig: DateColorsConfig; // 行事曆資料
  year: number; // 年分
  onClick: (date: Date) => void; // 事件控制: 點擊事件
}

const YearView = ({ year, dateColorsConfig, isSimple, onClick }: IProps) => {
  const renderYearView = () => 
    Array.from(Array(12), (v, k) => (
      <MonthView
        key={+new Date(year, k)}
        monthDate={new Date(year, k)}
        dateColorsConfig={dateColorsConfig}
        isSimple={isSimple}
        onClick={onClick}
      />
    ));

  return <div className='year-view'>{renderYearView()}</div>;
};

// props 預設值
YearView.defaultProps = {
  isSimple: true,
}

export default YearView;
