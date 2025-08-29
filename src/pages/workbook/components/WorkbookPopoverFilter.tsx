import {Button, Checkbox, CheckboxChangeEvent, Flex, Popover} from "antd";
import {CloseOutlined, RedoOutlined} from "@ant-design/icons";
import TuneIcon from "../../../common/components/icon/Tune";
import React from "react";
import styled from "styled-components";
import {WorkbookPopoverFilterProps} from "../types";
import {WorkbookCourse, WorkbookCourseType} from "../types/WorkbookFilter";

const WorkbookPopoverFilter = (props: WorkbookPopoverFilterProps) => {
    const [checkTypeElementary, setCheckTypeElementary] = React.useState(false);
    const [checkTypeMiddle, setCheckTypeMiddle] = React.useState(false);
    const [checkTypeHigh, setCheckTypeHigh] = React.useState(false);

    const handleCheckAll = (type: WorkbookCourseType, event: CheckboxChangeEvent) => {
        switch (type) {
            case "elementary":
                setCheckTypeElementary(event.target.checked);
                break;
            case "middle":
                setCheckTypeMiddle(event.target.checked);
                break;
            case "high":
                setCheckTypeHigh(event.target.checked);
                break;
        }

        props.onChange(
            props.rows
                .filter(e => e.type === type)
                .map(e => {
                    return {...e, isChecked: event.target.checked};
                })
        );
    }

    const handleCheck = (item: WorkbookCourse) => {
        props.onChange(
            props.rows
                .filter(e => e.id === item.id)
                .map(e => {
                    return {...e, isChecked: item.isChecked ? false : true};
                })
        );
    }

    return (
        <Popover
            open={props.open}
            onOpenChange={(next) => (next ? props.onOpen() : props.onClose())}
            arrow={false}
            trigger="click"
            placement="bottom"
            styles={{
                body: {
                    padding: '0 10px',
                    border: '1px solid #d9d9d9',
                    borderRadius: 8,
                }
            }}
            content={
                <WorkbookPopoverFlex>
                    <Flex vertical={true} gap={20} style={{padding: "20px"}}>
                        <WorkbookPopoverTopbarFlex style={{height: "32px"}}>
                            <div>타입</div>
                        </WorkbookPopoverTopbarFlex>

                        <Flex vertical gap={8}>
                            {
                                props.rows
                                    .filter(e => e.type === "type")
                                    .map(item => (
                                        <Checkbox
                                            value={item}
                                            key={item.id}
                                            checked={item.isChecked}
                                            onChange={() => handleCheck(item)}
                                        >
                                            {item.title}
                                        </Checkbox>
                                    ))
                            }
                        </Flex>
                    </Flex>
                    <Flex vertical={true} gap={20} style={{padding: "20px"}}>
                        <WorkbookPopoverTopbarFlex>
                            <div>과정</div>
                            <div>
                                <Button
                                    type="text"
                                    variant={"text"}
                                    ghost={true}
                                    icon={<RedoOutlined/>}
                                    iconPosition={"start"}
                                    onClick={props.onInputInit}
                                >
                                    초기화
                                </Button>
                                <WorkbookPopoverCloseButton
                                    type="text"
                                    icon={<CloseOutlined/>}
                                    onClick={props.onClose}>
                                </WorkbookPopoverCloseButton>
                            </div>
                        </WorkbookPopoverTopbarFlex>
                        <Flex gap={20}>
                            <Flex vertical gap={8}>
                                <Checkbox
                                    key={'elementary_checked_all'}
                                    checked={checkTypeElementary}
                                    onChange={e => handleCheckAll('elementary', e)}
                                >
                                    초등 전체
                                </Checkbox>
                                {
                                    props.rows
                                        .filter(e => e.type === "elementary")
                                        .map(item => (
                                            <Checkbox
                                                value={item}
                                                key={item.id}
                                                checked={item.isChecked}
                                                onChange={() => handleCheck(item)}
                                            >
                                                {item.title}
                                            </Checkbox>
                                        ))
                                }
                            </Flex>
                            <Flex vertical gap={8}>
                                <Checkbox
                                    key={'middle_checked_all'}
                                    checked={checkTypeMiddle}
                                    onChange={e => handleCheckAll('middle', e)}
                                >
                                    중등 전체
                                </Checkbox>
                                {
                                    props.rows
                                        .filter(e => e.type === "middle")
                                        .map(item => (
                                            <Checkbox
                                                value={item}
                                                key={item.id}
                                                checked={item.isChecked}
                                                onChange={() => handleCheck(item)}
                                            >
                                                {item.title}
                                            </Checkbox>
                                        ))
                                }
                            </Flex>
                            <Flex vertical gap={8}>
                                <Checkbox
                                    key={'high_checked_all'}
                                    checked={checkTypeHigh}
                                    onChange={e => handleCheckAll('high', e)}
                                >
                                    고등 전체
                                </Checkbox>
                                {
                                    props.rows
                                        .filter(e => e.type === "high")
                                        .map(item => (
                                            <Checkbox
                                                value={item}
                                                key={item.id}
                                                checked={item.isChecked}
                                                onChange={() => handleCheck(item)}
                                            >
                                                {item.title}
                                            </Checkbox>
                                        ))
                                }
                            </Flex>
                        </Flex>
                    </Flex>
                </WorkbookPopoverFlex>
            }
        >
            <Button
                icon={<TuneIcon/>}
                iconPosition={"end"}
                onClick={props.onOpen}>
                필터 선택
            </Button>
        </Popover>
    )
}

const WorkbookPopoverFlex = styled(Flex)`
    > :first-child {
        flex: 0 0 auto;
        min-width: 0;
        border-right: 1px solid #d9d9d9;
    }

    > :nth-child(2) {
        flex: 1 1 auto;
        min-width: 0;
    }
`;

const WorkbookPopoverCloseButton = styled(Button)`
    && {
        span {
            color: #9dabc2;
        }
    }
`;

const WorkbookPopoverTopbarFlex = styled(Flex)`
    && {
        width: 100%;
        align-items: center;
        flex-direction: row;
        color: #1677ff;
        font-size: 15px;
        font-weight: 700;
        line-height: normal;

        .ant-btn-variant-text {
            color: #1677ff;
        }

        .ant-btn-variant-text:hover {
            color: #1677ff;
        }
    }

    > :first-child {
        flex: 0 0 auto;
        min-width: 0;
        white-space: nowrap;
    }

    > :nth-child(2) {
        display: flex;
        justify-content: flex-end;
        align-items: center;

        gap: 8px;
        flex: 1 1 auto;
        min-width: 0;
    }
`

export default WorkbookPopoverFilter;