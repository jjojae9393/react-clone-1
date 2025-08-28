import styled from "styled-components";
import {Button, DatePicker, Dropdown, Flex, Input, Radio, Select, Space, Tag, Tooltip,} from "antd";
import {CalendarOutlined, DownOutlined, UnorderedListOutlined,} from "@ant-design/icons";
import React, {useCallback, useEffect, useMemo, useState} from "react";
import setupDayjs from "../../../common/utils/SetupDayjs";
import {WorkbookTableRow} from "../types";
import WorkbookTable from "./WorkbookTable";
import WorkbookPopoverFilter from "./WorkbookPopoverFilter";

type WorkbookValidateSearchMonth = { type: 'start' | 'end'; value: string | string[]; };

const searchOptions = [
    {label: "제목", value: "title"},
    {label: "학생", value: "student"},
] satisfies { label: string; value: string; }[];

const stateOptions = [
    {label: "사용중", key: "used"},
    {label: "삭제된", key: "deleted"},
] satisfies { label: string; key: string; }[];

const WorkbookSection = () => {
    const [rows, setRows] = useState<WorkbookTableRow[]>([]);
    const [totalCount, setTotalCount] = useState<number>(0);
    const [activePage, setActivePage] = useState<number>(1);

    // Filter - Search Layer
    const [selectedSearchLabel, setSearchLabel] = useState<string>("제목");
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
    const [activeCourseIds, setActiveCourseIds] = useState([]);

    // Search Callback
    const validateSearchMonth = useCallback(({type, value}: WorkbookValidateSearchMonth) => {
        if (!value) return;
        // 시작날짜가 종료날짜보다 앞서지말아야함.
        // 시작날짜와 종료날짜 사이의 간격은 최대 6개월.
    }, [selectedSearchStartMonth, selectedSearchEndMonth]);

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

            setRows(newRows);
            setTotalCount(newRows.length);
        }, 1500);

        return () => clearTimeout(id);
    }, [rows])

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
                            format="YYYY.MM"
                            allowClear={false}
                            defaultValue={selectedSearchStartMonth}
                            onChange={(value, dateRange) => {
                                validateSearchMonth({type: 'start', value: dateRange})
                            }}
                        />
                        &nbsp;~&nbsp;
                        <WorkbookDatePickerIncFilters
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
                        onOpen={() => setActivePopoverFilter(true)}
                        onClose={() => setActivePopoverFilter(false)}
                        onInputInit={() => setActiveCourseIds([])}
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
            </WorkbookFilters>
            {
                // activeCourseIds.length > 0 &&
                true &&
                (
                    <Flex gap={3} wrap={true}>
                        <Tag color="processing" closable={true}>테스트 1</Tag>
                        <Tag color="processing">테스트 1</Tag>
                        <Tag color="processing">테스트 1</Tag>
                        <Tag color="processing">테스트 1</Tag>
                        <Tag color="processing">테스트 1</Tag>
                        <Tag color="processing">테스트 1</Tag>
                        <Tag color="processing">테스트 1</Tag>
                        <Tag color="processing">테스트 1</Tag>
                        <Tag color="processing">테스트 1</Tag>
                        <Tag color="processing">테스트 1</Tag>
                        <Tag color="processing">테스트 1</Tag>
                        <Tag color="processing">테스트 1</Tag>
                        <Tag color="processing">테스트 1</Tag>
                        <Tag color="processing">테스트 1</Tag>
                    </Flex>
                )
            }
            <WorkbookTable
                dataSource={rows}
                currentPage={activePage}
                totalCount={totalCount}
            />
        </Flex>
    );
};

export default WorkbookSection;

const WorkbookFilters = styled(Flex)`
    align-items: flex-start;
    justify-content: space-between;
`;

const WorkbookDatePickerIncFilters = styled(DatePicker)`
    max-width: 100px;
    min-width: 100px;
`;
