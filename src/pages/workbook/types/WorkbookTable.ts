export type WorkbookTableRow = {
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
};

export type WorkbookTableProps = {
    dataSource: WorkbookTableRow[];
    totalCount: number;
    currentPage: number;
};