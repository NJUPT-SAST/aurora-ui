use crossterm::event::{KeyCode, KeyEvent};
use ratatui::{
    buffer::Buffer,
    layout::Rect,
    style::{palette::tailwind::SLATE, Color, Modifier, Style},
    symbols::border,
    widgets::{Block, List, ListItem, Paragraph, StatefulWidget, Widget},
};

use super::{
    component_list::{ComponentList, Status},
    split_area::split_area,
    tui_render::TuiRender,
};

const SELECTED_STYLE: Style = Style::new().bg(SLATE.c800).add_modifier(Modifier::BOLD);

#[derive(Debug, Default)]
pub struct Tui {
    exit: bool,
    component_list: ComponentList,
}

impl Tui {
    pub fn new() -> Self {
        Self {
            exit: false,
            component_list: ComponentList::new(),
        }
    }
    fn exit(&mut self) {
        self.exit = true;
    }

    fn select_none(&mut self) {
        self.component_list.state.select(None);
    }

    fn select_next(&mut self) {
        self.component_list.state.select_next();
    }

    fn select_previous(&mut self) {
        self.component_list.state.select_previous();
    }

    fn select_first(&mut self) {
        self.component_list.state.select_first();
    }

    fn select_last(&mut self) {
        self.component_list.state.select_last();
    }

    fn toggle_status(&mut self) {
        if let Some(i) = self.component_list.state.selected() {
            self.component_list.components[i].status =
                match self.component_list.components[i].status {
                    Status::Select => Status::UnSelect,
                    Status::UnSelect => Status::Select,
                };
        }
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
            .map(|(_, component_item)| ListItem::from(component_item))
            .collect();

        let list = List::new(items)
            .block(block)
            .highlight_style(SELECTED_STYLE)
            .highlight_symbol(">")
            .highlight_spacing(ratatui::widgets::HighlightSpacing::Always);

        StatefulWidget::render(list, area, buf, &mut self.component_list.state);
    }
}

impl Widget for &mut Tui {
    fn render(self, area: ratatui::prelude::Rect, buf: &mut ratatui::prelude::Buffer) {
        let (comment, outer, inner) = split_area(area);

        Paragraph::new("Use 'j/k' to move, 'g/G' to go top/bottom, Space to toggle.")
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

impl TuiRender for Tui {
    fn draw(&mut self, frame: &mut ratatui::Frame) {
        frame.render_widget(self, frame.area());
    }

    fn handle_key_event(&mut self, key_event: KeyEvent) {
        match key_event.code {
            KeyCode::Char('q') | KeyCode::Esc => self.exit(),
            KeyCode::Char('j') | KeyCode::Down => self.select_next(),
            KeyCode::Char('k') | KeyCode::Up => self.select_previous(),
            KeyCode::Char('g') | KeyCode::Home => self.select_first(),
            KeyCode::Char('G') | KeyCode::End => self.select_last(),
            KeyCode::Char(' ') | KeyCode::Right => {
                self.toggle_status();
            }
            _ => {}
        }
    }

    fn get_exit(&self) -> bool {
        self.exit
    }
}
