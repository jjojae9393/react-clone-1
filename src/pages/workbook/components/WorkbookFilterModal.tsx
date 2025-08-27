import {Button, Checkbox, Flex, Modal} from "antd";
import {CloseOutlined, RedoOutlined} from "@ant-design/icons";
import styled from "styled-components";

type WorkbookFilterOption = { label: string; value: string };
type WorkbookFilterModalProps = {
    open: boolean;
    value: string[];
    filters: {
        name: string;
        options: WorkbookFilterOption[];
    }[];
    onInit: () => void;
    onClose: () => void;
}

const WorkbookFilterModal = ({open, value, filters, onInit, onClose}: WorkbookFilterModalProps) => {
    return (
        <WorkbookModal
            open={open}
            keyboard={true}
            mask={false}
            maskClosable={true}
            closable={false}
            footer={null}
            onCancel={onClose}
        >
            <WorkbookModalFlex>
                <Flex vertical={true} gap={20} style={{padding: "20px"}}>
                    <WorkbookModalTopbarFlex style={{height: "32px"}}>
                        <div>타입</div>
                    </WorkbookModalTopbarFlex>
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
                    <WorkbookModalTopbarFlex>
                        <div>과정</div>
                        <div>
                            <Button
                                type="text"
                                variant={"text"}
                                ghost={true}
                                icon={<RedoOutlined/>}
                                iconPosition={"start"}
                                onClick={onInit}
                            >
                                초기화
                            </Button>
                            <WorkbookModalCloseButton
                                type="text"
                                icon={<CloseOutlined/>}
                                onClick={onClose}>
                            </WorkbookModalCloseButton>
                        </div>
                    </WorkbookModalTopbarFlex>
                    <Flex gap={20} style={{padding: "20px"}}>
                        <Checkbox.Group></Checkbox.Group>
                        <Checkbox.Group></Checkbox.Group>
                        <Checkbox.Group></Checkbox.Group>
                    </Flex>
                </Flex>
            </WorkbookModalFlex>
        </WorkbookModal>
    )
};

export default WorkbookFilterModal;

const WorkbookModal = styled(Modal)`
    && {
        .ant-modal-content {
            border: 1px solid #d9d9d9;
            padding: 0 10px;
        }
    }
`;

const WorkbookModalFlex = styled(Flex)`
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

const WorkbookModalCloseButton = styled(Button)`
    && {
        span {
            color: #9dabc2;
        }
    }
`;

const WorkbookModalTopbarFlex = styled(Flex)`
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