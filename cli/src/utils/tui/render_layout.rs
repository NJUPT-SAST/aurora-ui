use ratatui::{
    buffer::Buffer,
    layout::Rect,
    symbols::border,
    widgets::{Block, Paragraph, Widget},
};

pub fn render_layout(title: String, area: Rect, buf: &mut Buffer) {
    let block = Block::bordered().title(title).border_set(border::THICK);
    Paragraph::new("")
        .centered()
        .block(block)
        .render(area, buf);
}
