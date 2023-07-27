
enum COLORS {
    background_screen = '#FCFBFC',
    background_bottom_sheet = '#FFFFFF',
    main_text = '#000000',
    sub_text = '#3E3E3E',
    section_line = '#F4EEEE',
    button_long_background = '#5B58AD',
    button_text = '#FFFFFF',
    button_circle_background = '#455EFF',
    filter_button_background = '#D9D9D9',
    input_text_placeholder = '#AAA9C0',
    tab_inactive_text = '#696969',
    tabs_border = 'rgba(0, 0, 0, 0.08)'
};

enum FONT {
    Helvetica = 'Helvetica',
  }

const TEXT_STYLE = {
    regularSmallText: {
      fontFamily: FONT.Helvetica,
      fontSize: 16,
      fontWeight: "400",
    },
    boldSmallText: {
        fontFamily: FONT.Helvetica,
        fontSize: 16,
        fontWeight: '700',
      },
}

export { COLORS, TEXT_STYLE, FONT }