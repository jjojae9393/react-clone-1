export type WorkbookCourseType = 'type' | 'elementary' | 'middle' | 'high';

export type WorkbookCourse = {
    type: WorkbookCourseType;
    id: number;
    title: string;
    isChecked: boolean;
}

export type WorkbookPopoverFilterProps = {
    open: boolean;
    rows: WorkbookCourse[];
    onChange: (value: WorkbookCourse[]) => void;
    onOpen: () => void;
    onClose: () => void;
    onInputInit: () => void;
}