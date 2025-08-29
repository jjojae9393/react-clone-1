import styled from "styled-components";
import {Button, DatePicker, Dropdown, Flex, Input, Radio, Select, Space, Tooltip,} from "antd";
import {CalendarOutlined, CloseOutlined, DownOutlined, RedoOutlined, UnorderedListOutlined,} from "@ant-design/icons";
import React, {useCallback, useEffect, useMemo, useState} from "react";
import setupDayjs from "../../../common/utils/SetupDayjs";
import {WorkbookTableRow} from "../types";
import WorkbookTable from "./WorkbookTable";
import WorkbookPopoverFilter from "./WorkbookPopoverFilter";
import {WorkbookCourse} from "../types/WorkbookFilter";

type WorkbookValidateSearchMonth = { type: 'start' | 'end'; value: string | string[]; };

const searchOptions = [
    {label: "제목", value: "title"},
    {label: "학생", value: "student"},
] satisfies { label: string; value: string; }[];

const stateOptions = [
    {label: "사용중", key: "used"},
    {label: "삭제된", key: "deleted"},
] satisfies { label: string; key: string; }[];


// const WorkbookSearchBar = React.memo(() => (),(prev,next) => prev)

const WorkbookSection = () => {
    const [rows, setRows] = useState<WorkbookTableRow[]>([]);
    const [totalCount, setTotalCount] = useState<number>(0);
    const [activePage, setActivePage] = useState<number>(1);

    // Filter - Search Layer
    const [selectedSearchLabel, setSearchLabel] = useState<string>("제목");
    const [activeSearchValue, setSearchValue] = useState<string | null>(null);

    const [selectedSearchStartMonth, setSearchStartMonth] = useState(() => {
        const before = setupDayjs().add(-3, "month");

        return setupDayjs(before, "YYYY.MM");
    });
    const [selectedSearchEndMonth, setSearchEndMonth] = useState(() => {
        const now = setupDayjs();

        return setupDayjs(now, "YYYY.MM");
    });

    // Filter - View Layer
    const [activeState, setActiveState] = useState("used");
    const [activeViewer, setActiveViewer] = useState<"list" | "calendar">("list");

    const activeStateLabel = useMemo(
        () => stateOptions.find((i) => i.key === activeState)?.label ?? "",
        [activeState],
    );

    // Filter - Modal Layer
    const [activePopoverFilter, setActivePopoverFilter] = useState<boolean>(false);
    const [activeCourses, setActiveCourses] = useState<WorkbookCourse[]>([]);
    const [courses, setCourses] = useState<WorkbookCourse[]>([]);

    console.log(courses);
    console.log(activeCourses);

    // Search Callback
    const validateSearchMonth = useCallback(({type, value}: WorkbookValidateSearchMonth) => {
        if (!value) return;
        // 시작날짜가 종료날짜보다 앞서지말아야함.
        // 시작날짜와 종료날짜 사이의 간격은 최대 6개월.
    }, [selectedSearchStartMonth, selectedSearchEndMonth]);

    const handleCheckCourse = useCallback((changeCourses: WorkbookCourse[]) => {
        setCourses(prev => {
            const next = prev.map((course) => {
                for (let i = 0; i < changeCourses.length; i++) {
                    if (course.id === changeCourses[i].id) {
                        return {...course, isChecked: changeCourses[i].isChecked};
                    }
                }

                return course;
            });

            return next;
        });
    }, []);

    const handleInitCheckCourse = useCallback(() => {
        setCourses(prev => {
            return prev.map((course) => {
                if (course.isChecked) return {...course, isChecked: false}

                return course;
            });
        })
        setActiveCourses([]);
    }, []);

    useEffect(() => {
        const id = setTimeout(() => {
            const newRows: WorkbookTableRow[] = [
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

            const receivedWorkbookCourses: WorkbookCourse[] = [
                {type: "type", id: 1, title: "시중교재", isChecked: false},
                {type: "type", id: 2, title: "교과서", isChecked: false},
                {type: "type", id: 3, title: "매쓰홀릭", isChecked: false},
                {type: "type", id: 4, title: "모의고사 기출", isChecked: false},
                {type: "elementary", id: 5, title: "초등 3-1(2022 개정)", isChecked: false},
                {type: "elementary", id: 6, title: "초등 3-2(2022 개정)", isChecked: false},
                {type: "elementary", id: 7, title: "초등 4-1(2022 개정)", isChecked: false},
                {type: "elementary", id: 8, title: "초등 4-2(2022 개정)", isChecked: false},
                {type: "middle", id: 9, title: "중등 1-1(2022 개정)", isChecked: false},
                {type: "middle", id: 10, title: "중등 1-2(2022 개정)", isChecked: false},
                {type: "middle", id: 11, title: "중등 2-1(2022 개정)", isChecked: false},
                {type: "middle", id: 12, title: "중등 2-2(2022 개정)", isChecked: false},
                {type: "high", id: 13, title: "공통수학1(2022 개정)", isChecked: false},
                {type: "high", id: 14, title: "공통수학2(2022 개정)", isChecked: false},
                {type: "high", id: 15, title: "미적분1(2022 개정)", isChecked: false},
            ];

            setRows(newRows);
            setTotalCount(newRows.length);
            setCourses(receivedWorkbookCourses);
        }, 1500);

        return () => clearTimeout(id);
    }, [])

    useEffect(() => {
        setActiveCourses(courses.filter(e => e.isChecked));
    }, [courses]);

    return (
        <Flex gap={16} vertical>
            <WorkbookSearch>
                <Space style={{flexWrap: "nowrap", whiteSpace: "nowrap"}}>
                    <Space.Compact style={{maxWidth: "200px"}}>
                        <SelectWrapper>
                            <Select
                                options={searchOptions}
                                defaultValue={selectedSearchLabel}
                                onChange={(e) => setSearchLabel(e)}
                            />
                        </SelectWrapper>
                        <Input
                            onChange={(prev) => setSearchValue(prev.target.value)}
                            placeholder={"검색"}
                        />
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
                        <WorkbookDatePicker
                            picker="month"
                            format="YYYY.MM"
                            allowClear={false}
                            defaultValue={selectedSearchStartMonth}
                            onChange={(value, dateRange) => {
                                validateSearchMonth({type: 'start', value: dateRange})
                            }}
                        />
                        &nbsp;~&nbsp;
                        <WorkbookDatePicker
                            picker="month"
                            format="YYYY.MM"
                            allowClear={false}
                            defaultValue={selectedSearchEndMonth}
                            onChange={(value, dateRange) => {
                                validateSearchMonth({type: 'end', value: dateRange})
                            }}
                        />
                    </Tooltip>
                    <WorkbookPopoverFilter
                        open={activePopoverFilter}
                        rows={courses}
                        onOpen={() => setActivePopoverFilter(true)}
                        onClose={() => setActivePopoverFilter(false)}
                        onChange={handleCheckCourse}
                        onInputInit={handleInitCheckCourse}
                    />
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
                        <Radio.Button value="calendar">
                            <CalendarOutlined/>
                        </Radio.Button>
                    </Radio.Group>
                </Space>
            </WorkbookSearch>
            {
                activeCourses.length > 0 &&
                (
                    <Flex gap={10} wrap={true}>
                        {
                            activeCourses.map((value, index) => {
                                return (
                                    <WorkbookFilterTag onClick={() => true}>
                                        {value.title}<CloseOutlined/>
                                    </WorkbookFilterTag>
                                )
                            })
                        }
                        <WorkbookFilterInitTag
                            onClick={() => setActiveCourses([])}><RedoOutlined/>초기화
                        </WorkbookFilterInitTag>
                    </Flex>
                )
            }
            <WorkbookTable
                dataSource={rows}
                totalCount={totalCount}
                currentPage={activePage}
                onClickPage={(page: number) => setActivePage(page)}
            />
        </Flex>
    );
};

export default WorkbookSection;

const SelectWrapper = styled.div`
    && .ant-select-selector {
        background: #fafafa;
    }
`;

const WorkbookSearch = styled(Flex)`
    align-items: flex-start;
    justify-content: space-between;
`;

const WorkbookDatePicker = styled(DatePicker)`
    max-width: 100px;
    min-width: 100px;
`;

const WorkbookFilterTag = styled.div`
    display: inline-flex;
    justify-content: center;
    align-items: center;
    flex-shrink: 0;
    gap: 5px;
    height: 28px;
    padding: 5px 10px;
    cursor: pointer;
    box-sizing: border-box;
    border-radius: 14px;
    border: 1px solid #1677ff;
    background: #e5f2fd;
    color: #1677ff;
    font-size: 13px;
    font-weight: 600;
    line-height: normal;
`;

const WorkbookFilterInitTag = styled(WorkbookFilterTag)`
    border: none;
    background: none;

    &:hover {
        background: #f1f3f5;
    }
`;
