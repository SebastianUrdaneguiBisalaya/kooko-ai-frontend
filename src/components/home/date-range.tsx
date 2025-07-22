import { DatePicker } from "antd";
import { ConfigProvider } from 'antd';
import locale from 'antd/locale/es_ES';
import { Dayjs } from "dayjs";
import dayjs from 'dayjs';
import 'dayjs/locale/es-mx';
dayjs.locale('es-mx');

const { RangePicker } = DatePicker; 

type DateRangeValue = [Dayjs | null, Dayjs | null] | null;

type DateRangeProps = {
	onChange: (dates: DateRangeValue, dateString: [string, string]) => void;
}

export default function DateRange({ onChange }: DateRangeProps) {
	return (
		<ConfigProvider locale={locale}>
			<RangePicker
				className="custom-range-picker"
				onChange={onChange}
			/>
		</ConfigProvider>
	)
}