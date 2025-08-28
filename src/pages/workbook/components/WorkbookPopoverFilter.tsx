import {Button, Checkbox, Flex, Popover} from "antd";
import {CloseOutlined, RedoOutlined} from "@ant-design/icons";
import TuneIcon from "../../../common/components/icon/Tune";
import React from "react";
import styled from "styled-components";

type WorkbookPopoverFilterProps = {
    open: boolean;
    onOpen: () => void;
    onClose: () => void;
    onInputInit: () => void;
}

const WorkbookPopoverFilter = (props: WorkbookPopoverFilterProps) => {
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
                        <Checkbox.Group
                            style={{width: "100%"}}
                        >
                            <Flex vertical gap={8}>
                                <Checkbox key={1} value={1}>
                                    테스트 1
                                </Checkbox>
                                <Checkbox key={2} value={2}>
                                    테스트 2
                                </Checkbox>
                                <Checkbox key={3} value={3}>
                                    테스트 3
                                </Checkbox>
                                <Checkbox key={4} value={4}>
                                    테스트 4
                                </Checkbox>
                            </Flex>
                        </Checkbox.Group>
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
                        <Flex gap={20} style={{padding: "20px"}}>
                            <Checkbox.Group></Checkbox.Group>
                            <Checkbox.Group></Checkbox.Group>
                            <Checkbox.Group></Checkbox.Group>
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