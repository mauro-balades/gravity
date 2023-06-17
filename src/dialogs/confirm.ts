import { IDialog } from "../interfaces";
import { createDialogInstance } from ".";

export function prepareConfirmDialog(windowID: number, tabID: number): IDialog {
    return createDialogInstance({
        type: "confirm",
        association: {
            windowID,
            tabID,
        },
    });
}
