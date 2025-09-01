import {Button, Checkbox, CheckboxChangeEvent, Flex, Popover} from "antd";
import {CloseOutlined, RedoOutlined} from "@ant-design/icons";
import TuneIcon from "../../../common/components/icon/Tune";
import React, {useMemo} from "react";
import styled from "styled-components";
import {WorkbookPopoverFilterProps} from "../types";
import {WorkbookCourse, WorkbookCourseType} from "../types/WorkbookFilter";

const WorkbookPopoverFilter = (props: WorkbookPopoverFilterProps) => {
    // 재렌더링되지 않아야하는 연산값들은 항상 memo로 처리.
    // 상태관리를 useMemo 하나에서 전체를 관리
    const filterStats = useMemo(() => {
        const group = {
            type: props.rows.filter(e => e.type === 'type'),
            elementary: props.rows.filter(e => e.type === 'elementary'),
            middle: props.rows.filter(e => e.type === 'middle'),
            high: props.rows.filter(e => e.type === 'high'),
        }

        console.log("init course ??");

        return {
            elementary: {
                total: group.elementary.length,
                isAllChecked: group.elementary.length > 0
                    && group.elementary.every(e => e.isChecked)
            },
            middle: {
                total: group.middle.length,
                isAllChecked: group.middle.length > 0
                    && group.middle.every(e => e.isChecked)
            },
            high: {
                total: group.high.length,
                isAllChecked: group.high.length > 0
                    && group.high.every(e => e.isChecked)
            },
        }
    }, [props.rows])

    const handleCheckAll = (type: WorkbookCourseType, event: CheckboxChangeEvent) => {
        props.onChange(
            props.rows
                .map(e => {
                    if (e.type === type) {
                        return {...e, isChecked: event.target.checked};
                    } else {
                        return e;
                    }
                })
        );
    }

    const handleCheck = (item: WorkbookCourse) => {
        props.onChange(
            props.rows
                .map(e => {
                    if (e.id === item.id) {
                        return {...e, isChecked: !item.isChecked};
                    } else {
                        return e;
                    }
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
                                    checked={filterStats.elementary.isAllChecked}
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
                                    checked={filterStats.middle.isAllChecked}
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
                                    checked={filterStats.high.isAllChecked}
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