import { IDialog } from "../interfaces";
import { createDialogInstance } from ".";

export function prepareAlertDialog(windowID: number, tabID: number): IDialog {
    return createDialogInstance({
        type: "alert",
        association: {
            windowID,
            tabID,
        },
    });
}
