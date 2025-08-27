import React, {useState} from "react";
import styled from "styled-components";
import {Flex, Tabs, type TabsProps} from "antd";
import WorkbookSection from "./components/WorkbookSection";
import WorkbookAddButton from "./components/WorkbookAddButton";
import WorkbookBeforeSection from "./components/WorkbookBeforeSection";

const items: TabsProps["items"] = [
    {key: "workbook", label: "내 학습지"},
    {key: "workbook-before", label: "내 학습지(이전)"},
    {key: "private-homework", label: "개인과제"},
    {key: "marked-textbook", label: "스스로채점 학습(이전)"},
];

const WorkbookPage = () => {
    const [activeKey, setActiveKey] = useState<string>("workbook");

    return (
        <>
            <WorkbookTopbarTabs
                tabBarExtraContent={{
                    right: (
                        <WorkbookAddButton/>
                    ),
                }}
                items={items}
                defaultActiveKey={activeKey}
                onChange={setActiveKey}
            />
            {activeKey === "workbook" && <WorkbookSection/>}
            {activeKey === "workbook-before" && <WorkbookBeforeSection></WorkbookBeforeSection>}
            {activeKey === "private-homework" && <Flex></Flex>}
            {activeKey === "marked-textbook" && <Flex></Flex>}
        </>
    );
};

const WorkbookTopbarTabs = styled(Tabs)`
    && {
        .ant-tabs-nav {
            display: flex;
            align-items: center;
            width: 100%
        }

        .ant-tabs-nav::before {
            border-bottom: none;
        }

        .ant-tabs-ink-bar {
            height: 3px;
        }

        .ant-tabs-nav-wrap {
            order: 1;
            flex: 0 0 auto !important;
            min-width: 0;
        }

        .ant-tabs-tab + .ant-tabs-tab {
            margin-left: 20px;
        }

        .ant-tabs-tab-btn {
            font-size: 16px;
            font-weight: 500;
            transition: none;
        }

        .ant-tabs-tab-active .ant-tabs-tab-btn {
            font-weight: 700;
        }

        .ant-tabs-extra-content {
            order: 2;
            display: flex;
            flex: 1 1 auto;
            min-width: 0;
            align-items: center;
            justify-content: flex-start;
            white-space: nowrap;
            margin-left: 20px;
        }
    }
`;

export default WorkbookPage;