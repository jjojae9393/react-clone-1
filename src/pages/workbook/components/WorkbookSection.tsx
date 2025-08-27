import styled from "styled-components";
import {
    Button,
    DatePicker,
    Dropdown,
    Empty,
    Flex,
    Input,
    Popover, Progress,
    Radio,
    Select,
    Space,
    Table,
    TableColumnsType,
    Tag,
    Tooltip,
} from "antd";
import {
    CalendarOutlined, CopyOutlined, DeleteOutlined,
    DesktopOutlined,
    DownOutlined,
    MoreOutlined, SettingOutlined,
    SyncOutlined,
    UnorderedListOutlined,
} from "@ant-design/icons";
import React, {useCallback, useMemo, useState} from "react";
import setupDayjs from "../../../common/utils/SetupDayjs";
import PaginationV1 from "../../../common/components/Pagination";
import WorkbookAddButton from "./WorkbookAddButton";
import WorkbookFilterModal from "./WorkbookFilterModal";
import TuneIcon from "../../../common/components/icon/Tune";
import {ButtonColorType} from "antd/lib/button";
import MultiProgress from "react-multi-progress";

type WorkbookValidateSearchMonth = { type: 'start' | 'end'; value: string | string[]; };
type SearchOption = { value: string; label: string };
type StateOption = { key: string; label: string };

interface WorkbookRow {
    id: number;
    workbook: {
        title: string;
        type: string;
        question: number;
        writer: string;
        createdAt: string;
    };
    course: {
        name: string;
        etc: string;
    };
    level: {
        basic: number;
        concept: number;
        skill: number;
        deepening: number;
    };
    date: {
        start: string;
        end: string;
    };
    student: string[];
    submit: {
        success: number;
        none: number;
        average: number;
    };
    round: number;
}

const dateFormat = "YYYY.MM";

const searchOptions: SearchOption[] = [
    {label: "제목", value: "title"},
    {label: "학생", value: "student"},
];

const stateOptions: StateOption[] = [
    {label: "사용중", key: "used"},
    {label: "삭제된", key: "deleted"},
];

const rows: WorkbookRow[] = [
    {
        id: 3,
        workbook: {
            title: "[교과서 - 지학사] 초등 4-2 (2022개정) 수학의힘 P.10 ~ P.17",
            type: "교과",
            question: 29,
            createdAt: '25.08.27',
            writer: '일반선생님'
        },
        course: {
            name: "초등 4-2",
            etc: "2022 개정"
        },
        level: {
            basic: 16,
            concept: 0,
            skill: 11,
            deepening: 2,
        },
        date: {
            start: "25.08.27",
            end: "25.09.11"
        },
        round: 1,
        student: ["안유진", "장원영", "이서", "가을"],
        submit: {
            success: 0,
            none: 0,
            average: 0
        }
    },
    {
        id: 2,
        workbook: {
            title: "[수매씽 유형] 중등 2-1 Book2 워크북(2022개정) P.4",
            type: "시중",
            question: 8,
            createdAt: '25.08.22',
            writer: '일반선생님'
        },
        course: {
            name: "중등 2-1",
            etc: "2022 개정"
        },
        level: {
            basic: 4,
            concept: 3,
            skill: 1,
            deepening: 0,
        },
        date: {
            start: "25.08.22",
            end: "25.08.30"
        },
        round: 1,
        student: [],
        submit: {
            success: 0,
            none: 0,
            average: 0
        }
    },
    {
        id: 1,
        workbook: {
            title: "[수매씽 유형] 중등 2-1 Book2 워크북(2022개정) P.4",
            type: "시중",
            question: 8,
            createdAt: '25.08.22',
            writer: '일반선생님'
        },
        course: {
            name: "중등 2-1",
            etc: "2022 개정"
        },
        level: {
            basic: 4,
            concept: 3,
            skill: 1,
            deepening: 0,
        },
        date: {
            start: "25.08.22",
            end: "25.08.30"
        },
        round: 1,
        student: ["홍길동", "임꺽정"],
        submit: {
            success: 1,
            none: 1,
            average: 80.0
        }
    },
];

const WorkbookSection = () => {
    const [contents, setTableContents] = useState([]);
    const [contentTotalCount, setContentTotalCount] = useState(0);
    const [activePage, setActivePage] = useState(1);

    // Filter - Search Layer
    const [selectedSearchLabel, setSearchLabel] = useState("제목");
    const [selectedSearchStartMonth, setSearchStartMonth] = useState(() => {
        const before = setupDayjs().add(-3, "month");

        return setupDayjs(before, dateFormat);
    });
    const [selectedSearchEndMonth, setSearchEndMonth] = useState(() => {
        const now = setupDayjs();

        return setupDayjs(now, dateFormat);
    });

    // Filter - View Layer
    const [activeState, setActiveState] = useState("used");
    const [activeViewer, setActiveViewer] = useState<"list" | "calender">("list");

    const activeStateLabel = useMemo(
        () => stateOptions.find((i) => i.key === activeState)?.label ?? "",
        [activeState],
    );

    // Filter - Modal Layer
    const [activeFilterModal, setActiveFilterModal] = useState<boolean>(false);
    const [activeTableRowModalId, setActiveTableRowModalId] = useState<number | null>(null);
    const [activeCourseIds, setActiveCourseIds] = useState([]);

    // Search Callback
    const validateSearchMonth = useCallback(({type, value}: WorkbookValidateSearchMonth) => {
        if (!value) return;
        // 시작날짜가 종료날짜보다 앞서지말아야함.
        // 시작날짜와 종료날짜 사이의 간격은 최대 6개월.
    }, [selectedSearchStartMonth, selectedSearchEndMonth])

    // Table
    const columns: TableColumnsType<WorkbookRow> = [
        {
            title: "학습지명", dataIndex: "workbook",
            render: (_, record) => {
                const tagColor =
                    (record.workbook.type == '시중' && "#ed669b")
                    || (record.workbook.type == '교과' && "#725fec")
                    || "#b1e266";

                return (
                    <>
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
                    </>
                )
            }
        },
        {
            title: "과정", dataIndex: "course", align: "center",
            render: (_, record) => {
                return (
                    <>
                        <Flex vertical align={"center"}>
                            <span>{record.course.name}</span>
                            {record.course.etc && <span>({record.course.etc})</span>}
                        </Flex>
                    </>
                )
            }
        },
        {
            title: "난이도", dataIndex: "level", align: "center",
            render: (_, record) => {
                const progressElements = [];

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
            title: "제출기간", dataIndex: "date", align: "center",
            render: (_, record) => {
                return (
                    <>
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
                    </>
                )
            }
        },
        {
            title: "학생", dataIndex: "student", align: "center", minWidth: 82,
            render: (_, record) => {
                let init = 0;

                return (
                    <>
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
                                (record.student.length > 0 && record.student.length < 3) &&
                                <>
                                    {
                                        record.student.map((e) => {
                                            init += 1;
                                            return (
                                                <span>
                                                    {e}{(init == 1 && record.student.length == 2) && <>,</>}
                                                </span>
                                            )
                                        })
                                    }
                                </>
                            }
                            {
                                record.student.length >= 3 &&
                                <>
                                    <span>{record.student[0]}</span>
                                    <span>외 {record.student.length - 1}명</span>
                                </>
                            }
                        </Flex>
                    </>
                )
            }
        },
        {
            title: "제출", dataIndex: "submit", align: "center", minWidth: 70,
            render: (_, record) => {
                return (
                    <Flex vertical align={"center"}>
                        {record.student.length == 0 && (<div>-</div>)}
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
            title: "회차", dataIndex: "round", align: "center", minWidth: 45,
            render: (_, record) => {
                const addRound = record.round + 1;
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
                            +{addRound}
                        </WorkbookTableRowRoundButton>
                    </Flex>
                )
            }
        },
        {
            dataIndex: "etc1", align: "center", minWidth: 84,
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
            dataIndex: "etc2", align: "center", minWidth: 36,
            render: (_, record) => {
                const openPopover = activeTableRowModalId === record.id;

                return (
                    <>
                        <Popover
                            open={openPopover}
                            onOpenChange={(e) => setActiveTableRowModalId(e ? record.id : null)}
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
                            <Button type="text" onClick={() => setActiveTableRowModalId(record.id)}>
                                <MoreOutlined style={{fontSize: '20px'}}/>
                            </Button>
                        </Popover>
                    </>
                )
            }
        },
    ];

    return (
        <Flex gap={16} vertical>
            <WorkbookFilters>
                <Space style={{flexWrap: "nowrap", whiteSpace: "nowrap"}}>
                    <Space.Compact style={{maxWidth: "200px"}}>
                        <Select
                            className={"workbook-filter-select"}
                            defaultValue={selectedSearchLabel}
                            options={searchOptions}
                            onChange={(e) => setSearchLabel(e)}
                        />
                        <Input placeholder={"검색"}/>
                    </Space.Compact>
                    <Tooltip
                        placement="top"
                        title={
                            <Flex gap={3} vertical={true}>
                                <span>검색이 안되는 과거의 데이터가 있다면,</span>
                                <span>월별 검색을 통해 검색해주세요.</span>
                                <span>검색범위는 최대 6개월입니다.</span>
                            </Flex>
                        }>
                        <WorkbookDatePickerIncFilters
                            picker="month"
                            format={dateFormat}
                            allowClear={false}
                            defaultValue={selectedSearchStartMonth}
                            onChange={(value, dateRange) => {
                                validateSearchMonth({type: 'start', value: dateRange})
                            }}
                        />
                        &nbsp;~&nbsp;
                        <WorkbookDatePickerIncFilters
                            picker="month"
                            format={dateFormat}
                            allowClear={false}
                            defaultValue={selectedSearchEndMonth}
                            onChange={(value, dateRange) => {
                                validateSearchMonth({type: 'end', value: dateRange})
                            }}
                        />
                    </Tooltip>
                    <Button
                        icon={<TuneIcon/>}
                        iconPosition={"end"}
                        onClick={() => setActiveFilterModal(true)}>
                        필터 선택
                    </Button>
                    <WorkbookFilterModal
                        open={activeFilterModal}
                        value={[]}
                        filters={[]}
                        onInit={() => setActiveCourseIds([])}
                        onClose={() => {
                            setActiveFilterModal(false);
                        }}
                    ></WorkbookFilterModal>
                </Space>
                <Space style={{flexWrap: "nowrap", whiteSpace: "nowrap"}}>
                    <Dropdown
                        menu={{
                            items: stateOptions,
                            selectable: true,
                            selectedKeys: [activeState],
                            onClick: (e) => setActiveState(e.key),
                        }}
                    >
                        <Button>
                            <Space>
                                {activeStateLabel}
                                <DownOutlined/>
                            </Space>
                        </Button>
                    </Dropdown>
                    <Radio.Group
                        value={activeViewer}
                        style={{whiteSpace: 'nowrap'}}
                        onChange={(e) => setActiveViewer(e.target.value)}
                    >
                        <Radio.Button value="list">
                            <UnorderedListOutlined/>
                        </Radio.Button>
                        <Radio.Button value="calender">
                            <CalendarOutlined/>
                        </Radio.Button>
                    </Radio.Group>
                </Space>
            </WorkbookFilters>
            <Table<WorkbookRow>
                className={"workbook-table"}
                rowKey={"id"}
                rowSelection={{type: "checkbox"}}
                columns={columns}
                locale={{
                    emptyText:
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
                }}
                dataSource={rows}
                pagination={false}
            />
            {contentTotalCount > 0 && <PaginationV1 currentPage={activePage} total={contentTotalCount}/>}
        </Flex>
    );
};

export default WorkbookSection;

const WorkbookFilters = styled(Flex)`
    && {
        align-items: flex-start;
        justify-content: space-between;
    }
`;

const WorkbookDatePickerIncFilters = styled(DatePicker)`
    max-width: 100px;
    min-width: 100px;
`;

const WorkbookTableRowProgressBar = styled(MultiProgress)`
    && {
        width: 100%;
        height: 8px;
    }
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
    && {
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
    }
`;

const WorkbookTableRowSubTitle = styled(Flex)`
    && {
        color: #777;
        font-size: 14px;
        font-weight: 500;
        line-height: 1;
    }
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
    && {
        width: auto;
        height: 28px;
        padding: 0 10px;
    }
`;

const WorkbookTableRowRoundButton = styled(Button)`
    && {
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
    }
`;
