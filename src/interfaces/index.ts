
export interface ITheme {
    id: number;
    light: boolean;
    button_radius: string;
    input_radius: string;
    dialog_raius: string;
    primary_color: string;
    secondary_color: string;
    primary_background: string;
    secondary_background: string;
    name: string;
}

export interface IUser {
    id: number;
    name: string;
    theme_id: number;
    theme: ITheme;
}
