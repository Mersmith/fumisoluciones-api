export interface Menu {
    id?: number;
    label: string;
    icon?: string | null;
    route?: string | null;
    parent_id?: number | null;
    orden: number;
    created_at?: string;
    updated_at?: string;

    parent?: Menu | null;
    children?: Menu[];
    paginas?: any[];
}
