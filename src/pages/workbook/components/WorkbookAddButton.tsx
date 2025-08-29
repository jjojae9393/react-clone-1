import {Button} from "antd";
import {useNavigate} from "react-router";
import React from "react";

const WorkbookAddButton = React.memo(() => {
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
})

export default WorkbookAddButton;