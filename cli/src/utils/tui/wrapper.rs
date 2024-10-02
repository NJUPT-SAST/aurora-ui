use crossterm::event::{KeyCode, KeyEvent};
use ratatui::{
    buffer::Buffer,
    layout::Rect,
    style::{
        palette::{material::BLACK, tailwind::SLATE},
        Color, Modifier, Style,
    },
    symbols::border,
    widgets::{Block, List, ListItem, Paragraph, StatefulWidget, Widget},
    DefaultTerminal,
};

use super::{
    component_list::{ComponentItem, ComponentList},
    split_area::split_area,
    tui_render::TuiRender,
};

const SELECTED_STYLE: Style = Style::new().bg(SLATE.c800).add_modifier(Modifier::BOLD);

#[derive(Debug, Default)]
pub struct Wrapper {
    exit: bool,
    component_list: ComponentList,
}

impl Wrapper {
    pub fn new() -> Self {
        Self {
            exit: false,
            component_list: ComponentList::new(),
        }
    }
    fn exit(&mut self) {
        self.exit = true;
    }

    fn render_list(&mut self, area: Rect, buf: &mut Buffer) {
        let block = Block::bordered()
            .title(" Select Components ")
            .border_set(border::THICK);

        let items: Vec<ListItem> = self
            .component_list
            .components
            .iter()
            .enumerate()
            .map(|(i, component_item)| ListItem::from(component_item))
            .collect();

        let list = List::new(items)
            .block(block)
            .highlight_style(SELECTED_STYLE)
            .highlight_symbol(">")
            .highlight_spacing(ratatui::widgets::HighlightSpacing::Always);

        StatefulWidget::render(list, area, buf, &mut self.component_list.state);
    }
}

impl Widget for &mut Wrapper {
    fn render(self, area: ratatui::prelude::Rect, buf: &mut ratatui::prelude::Buffer) {
        let (comment, outer, inner) = split_area(area);

        Paragraph::new("Use ↓↑ to move, ← to unselect, → to change status, g/G to go top/bottom.")
            .style(Style::default().fg(Color::Red))
            .centered()
            .render(comment[1], buf);

        let block = Block::bordered().title(" Info ").border_set(border::THICK);
        Paragraph::new("")
            .centered()
            .block(block)
            .render(inner[0], buf);

        let block = Block::bordered().title(" State ").border_set(border::THICK);
        Paragraph::new("")
            .centered()
            .block(block)
            .render(inner[1], buf);

        self.render_list(outer[0], buf);
    }
}

impl TuiRender for Wrapper {
    fn draw(&mut self, frame: &mut ratatui::Frame) {
        frame.render_widget(self, frame.area());
    }

    fn run(&mut self, terminal: &mut DefaultTerminal) -> Result<(), std::io::Error> {
        while !self.exit {
            terminal.draw(|frame| self.draw(frame))?;
            self.handle_events()?;
        }
        Ok(())
    }

    fn handle_key_event(&mut self, key_event: KeyEvent) {
        match key_event.code {
            KeyCode::Char('q') => self.exit(),
            _ => {}
        }
    }
}
