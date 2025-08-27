import {Button} from "antd";
import {useNavigate} from "react-router";

const WorkbookAddButton = () => {
    const navigate = useNavigate();

    return (
        <Button
            type={'primary'}
            style={{
                fontWeight: 500
            }}
            onClick={() => navigate('/workbook/new')}
        >
            +&nbsp;&nbsp;새 학습지 만들기
        </Button>
    )
}

export default WorkbookAddButton;