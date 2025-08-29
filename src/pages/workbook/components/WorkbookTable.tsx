import {Button, Empty, Flex, Pagination, Popover, Table, TableColumnsType, Tag} from "antd";
import WorkbookAddButton from "./WorkbookAddButton";
import {memo, useCallback, useMemo, useRef, useState} from "react";
import {ButtonColorType} from "antd/lib/button";
import {
    CopyOutlined,
    DeleteOutlined,
    DesktopOutlined,
    MoreOutlined,
    SettingOutlined,
    SyncOutlined
} from "@ant-design/icons";
import styled from "styled-components";
import MultiProgress from "react-multi-progress";
import {WorkbookTableProps, WorkbookTableRow} from "../types";

const MAX_VISIBLE_STUDENTS = 3;
const TABLE_ROW_SIZE = 10;

const WorkbookTableColumnEtc2Popover = memo(
    ({id, open, onOpenChange}: {
        id: number;
        open: boolean,
        onOpenChange: (open: boolean, id: number) => void;
    }) => {
        return (
            <Popover
                open={open}
                onOpenChange={(e) => onOpenChange(e, id)}
                trigger="click"
                placement="leftTop"
                arrow={false}
                content={
                    <Flex vertical>
                        <WorkbookTableRowModalGroup vertical gap={8}>
                            <span>다시 제출하기</span>
                            <Button type={"text"} icon={"+1"}>다음 회차 출제</Button>
                            <Button type={"text"} icon={<CopyOutlined/>}>그대로 복사 후 출제</Button>
                            <Button type={"text"} icon={<SyncOutlined/>}>문항 편집 후 출제</Button>
                            <div style={{background: "#d9d9d9", width: "auto", height: "1px"}}></div>
                            <Button type={"text"} icon={<SettingOutlined/>}>정보수정</Button>
                            <Button type={"text"} icon={<DesktopOutlined/>}>강의모드</Button>
                            <Button type={"text"} icon={<DeleteOutlined/>}>삭제하기</Button>
                        </WorkbookTableRowModalGroup>
                    </Flex>
                }
            >
                <Button type="text" onClick={() => onOpenChange(true, id)}>
                    <MoreOutlined style={{fontSize: '20px'}}/>
                </Button>
            </Popover>
        )
    },
    (prev, next) => prev.open === next.open && prev.id === next.id
);

const WorkbookTable = (props: WorkbookTableProps) => {
    const activeTableRowPopoverIdRef = useRef<number | null>(null);
    const [activeTableRowPopoverId, setActiveTableRowPopoverId] = useState<number | null>(null);

    activeTableRowPopoverIdRef.current = activeTableRowPopoverId;

    const onOpenChange = useCallback((open: boolean, id: number) => {
        setActiveTableRowPopoverId(open ? id : null);
    }, []);

    const WorkbookTableEmptyText = useMemo(() => (
        <Empty
            style={{margin: "40px"}}
            description={
                <Flex gap={3} vertical={true}>
                    <span>내 학습지가 없습니다.</span>
                    <span>학습지를 새로 만들어 보세요.</span>
                </Flex>
            }>
            <WorkbookAddButton/>
        </Empty>
    ), []);

    const columns = useMemo<TableColumnsType<WorkbookTableRow>>(() => [
        {
            title: "학습지명", dataIndex: "workbook", key: "workbook",
            render: (_, record) => {
                const tagColor =
                    (record.workbook.type === '시중' && "#ed669b")
                    || (record.workbook.type === '교과' && "#725fec")
                    || "#b1e266";

                return (
                    <Flex vertical gap={6}>
                        <WorkbookTableRowTitle>
                            <Tag color={tagColor}>
                                {record.workbook.type}
                            </Tag>
                            <div>{record.workbook.title}</div>
                        </WorkbookTableRowTitle>
                        <WorkbookTableRowSubTitle>
                            {record.workbook.question}문항 | {record.workbook.createdAt} | {record.workbook.writer}
                        </WorkbookTableRowSubTitle>
                    </Flex>
                )
            }
        },
        {
            title: "과정", dataIndex: "course", key: "course", align: "center",
            render: (_, record) => {
                return (
                    <Flex vertical align={"center"}>
                        <span>{record.course.name}</span>
                        {record.course.etc && <span>({record.course.etc})</span>}
                    </Flex>
                )
            }
        },
        {
            title: "난이도", dataIndex: "level", key: "level", align: "center",
            render: (_, record) => {
                const progressElements: { value: number; color: string; }[] = [];

                if (record.level.concept > 0) {
                    progressElements.push({
                        value: 100 * (record.level.concept / record.workbook.question),
                        color: "#d9d9d9"
                    });
                }
                if (record.level.basic > 0) {
                    progressElements.push({
                        value: 100 * (record.level.basic / record.workbook.question),
                        color: "#b1e266"
                    });
                }
                if (record.level.skill > 0) {
                    progressElements.push({
                        value: 100 * (record.level.skill / record.workbook.question),
                        color: "#ffb968"
                    });
                }
                if (record.level.deepening > 0) {
                    progressElements.push({
                        value: 100 * (record.level.deepening / record.workbook.question),
                        color: "#ff7d7c"
                    });
                }

                // Space Split으로 간격마다 구분자 삽입 가능
                return (
                    <Flex vertical align={"center"} gap={5}>
                        <WorkbookTableRowProgressBar elements={progressElements}/>
                        <WorkbookTableRowProgressText align={"center"} justify={"center"}>
                            {
                                record.level.concept > 0 &&
                                <span style={{color: "#777"}}>개념 {record.level.concept}</span>
                            }
                            {
                                record.level.basic > 0 &&
                                <span style={{color: "#4caf50"}}>기본 {record.level.basic}</span>
                            }
                            {
                                record.level.skill > 0 &&
                                <span style={{color: "#d46b09"}}>실력 {record.level.skill}</span>
                            }
                            {
                                record.level.deepening > 0 &&
                                <span style={{color: "#cf1222"}}>심화 {record.level.deepening}</span>
                            }
                        </WorkbookTableRowProgressText>
                    </Flex>
                )
            }
        },
        {
            title: "제출기간", dataIndex: "date", key: "date", align: "center",
            render: (_, record) => {
                return (
                    <Flex vertical align={"center"}>
                        {
                            (record.date.start && record.date.end) &&
                            <>
                                <span>{record.date.start}</span>
                                <span>~&nbsp;{record.date.end}</span>
                            </>
                        }
                        {
                            !(record.date.start && record.date.end) &&
                            <span>기한없음</span>
                        }
                    </Flex>
                )
            }
        },
        {
            title: "학생", dataIndex: "student", key: "student", align: "center", minWidth: 82,
            render: (_, record) => {
                return (
                    <Flex vertical align={"center"}>
                        {
                            record.student.length === 0 &&
                            <WorkbookTableRowButton
                                color="primary"
                                ghost={true}
                                variant="outlined"
                            >
                                추가
                            </WorkbookTableRowButton>
                        }
                        {
                            (record.student.length > 0 && record.student.length < MAX_VISIBLE_STUDENTS) &&
                            <>
                                {
                                    record.student.map((name, i) => {
                                        return (
                                            <span>
                                                {name}{(i === 0 && record.student.length === 2) && <>,</>}
                                            </span>
                                        )
                                    })
                                }
                            </>
                        }
                        {
                            record.student.length >= MAX_VISIBLE_STUDENTS &&
                            <>
                                <span>{record.student[0]}</span>
                                <span>외 {record.student.length - 1}명</span>
                            </>
                        }
                    </Flex>
                )
            }
        },
        {
            title: "제출", dataIndex: "submit", key: "submit", align: "center", minWidth: 70,
            render: (_, record) => {
                return (
                    <Flex vertical align={"center"}>
                        {record.student.length === 0 && (<div>-</div>)}
                        {record.student.length > 0 &&
                            (<>
                                <div style={{color: "#1677ff"}}>{record.submit.success}/{record.student.length}명</div>
                                {record.submit.success > 0 && <div>{record.submit.average}점</div>}
                            </>)
                        }
                    </Flex>
                )
            }
        },
        {
            title: "회차", dataIndex: "round", key: "round", align: "center", minWidth: 45,
            render: (_, record) => {
                const buttonColor: Partial<Record<number, ButtonColorType>> = {
                    1: "green",
                    2: "red",
                };

                return (
                    <Flex vertical align={"center"} justify={"center"} gap={4}>
                        <span>{record.round}회</span>
                        <WorkbookTableRowRoundButton
                            color={buttonColor[record.round] ?? "primary"}
                            ghost={true}
                            variant={"outlined"}
                        >
                            +{record.round + 1}
                        </WorkbookTableRowRoundButton>
                    </Flex>
                )
            }
        },
        {
            dataIndex: "etc1", key: "etc1", align: "center", minWidth: 84,
            render: (_, record) => {
                return (
                    <Flex vertical align={"center"}>
                        <WorkbookTableRowButton
                            color="primary"
                            ghost={true}
                            variant="outlined"
                        >
                            출력하기
                        </WorkbookTableRowButton>
                    </Flex>
                )
            }
        },
        {
            dataIndex: "etc2", key: "etc2", align: "center", minWidth: 36,
            render: (_, record) => {
                return (
                    <WorkbookTableColumnEtc2Popover
                        id={record.id}
                        open={activeTableRowPopoverIdRef.current === record.id}
                        onOpenChange={onOpenChange}
                    />
                )
            }
        },
    ], []);

    return (
        <>
            <Table<WorkbookTableRow>
                className={"workbook-table"}
                rowKey={"id"}
                rowSelection={{type: "checkbox"}}
                pagination={false}
                locale={{emptyText: WorkbookTableEmptyText}}
                columns={columns}
                dataSource={props.dataSource}
            />
            {
                props.totalCount > 0 &&
                <Pagination
                    align="center"
                    defaultPageSize={TABLE_ROW_SIZE}
                    defaultCurrent={props.currentPage}
                    total={props.totalCount}
                    onChange={(_, record) => props.onClickPage(record)}
                />
            }
        </>
    )
}


const WorkbookTableRowProgressBar = styled(MultiProgress)`
    width: 100%;
    height: 8px;
`;

const WorkbookTableRowProgressText = styled(Flex)`
    & > span {
        font-size: 12px;
        font-weight: 500;
    }

    & > span + span::before {
        content: "|";
        margin: 0 4px;
        color: #999;
    }
`;

const WorkbookTableRowTitle = styled(Flex)`
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
    font-size: 16px;
    font-weight: 700;
    line-height: 1.5;

    & > .ant-tag {
        display: inline-flex;
        align-items: center;
        font-size: 13px;
        font-weight: 700;
        line-height: 1;
        padding: 3px;
        flex: 0 0 auto;
        white-space: nowrap;
    }

    & > div {
        flex: 1 1 auto;
        min-width: 0;
        white-space: normal;
        word-break: break-word;
    }
`;

const WorkbookTableRowSubTitle = styled(Flex)`
    color: #777;
    font-size: 14px;
    font-weight: 500;
    line-height: 1;
`;

const WorkbookTableRowModalGroup = styled(Flex)`
    & > span {
        font-size: 13px;
        font-weight: 600;
        color: #999;
        margin: 6px 0px 0px 10px;
        justify-content: flex-start;
    }

    & > .ant-btn {
        width: 100%;
        height: 28px;
        font-weight: 500;
        justify-content: flex-start;
    }
`;

const WorkbookTableRowButton = styled(Button)`
    width: auto;
    height: 28px;
    padding: 0 10px;
`;

const WorkbookTableRowRoundButton = styled(Button)`
    display: inline-flex;
    padding: 8px;
    height: 28px;
    flex-shrink: 0;
    border-radius: 6px;
    text-align: center;
    justify-content: center;
    align-items: center;
    font-size: 14px;
    font-style: normal;
    font-weight: 600;
    line-height: normal;
`;

export default WorkbookTable;