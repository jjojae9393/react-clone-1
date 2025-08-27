import Icon from "@ant-design/icons";
import type {CustomIconComponentProps} from "@ant-design/icons/lib/components/Icon";
import {ReactComponent as TuneSvg} from "./tune.svg";

const TuneIcon = (props: Partial<CustomIconComponentProps>) => (
    <Icon component={TuneSvg} {...props} />
);

export default TuneIcon;
