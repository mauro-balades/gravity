
window.defineUserTheme = (theme) => {
    document.body.style.setProperty('--gr-button-background', theme.button_background)
    document.body.style.setProperty('--gr-primary-background', theme.primary_background)
    document.body.style.setProperty('--gr-secondary-background', theme.secondary_background)
    document.body.style.setProperty('--gr-button-radius', theme.button_radius)
    document.body.style.setProperty('--gr-dialog-radius', theme.dialog_radius)
    document.body.style.setProperty('--gr-input-radius', theme.input_radius)
    document.body.style.setProperty('--gr-primary-color', theme.primary_color)
    document.body.style.setProperty('--gr-secondary-color', theme.secondary_color)

    // TODO:
    // document.getElementsByTagName('core-browser-view').style.setProperty('--gr-system-font', )
}
