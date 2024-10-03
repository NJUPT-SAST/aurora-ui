use std::fmt::format;

use crossterm::event::{KeyCode, KeyEvent};
use ratatui::{
    buffer::Buffer,
    layout::Rect,
    style::{palette::tailwind::SLATE, Color, Modifier, Style},
    symbols::border,
    widgets::{Block, List, ListItem, Paragraph, StatefulWidget, Widget, Wrap},
};

use super::{
    component_list::{ComponentItem, ComponentList, Status},
    split_area::split_area,
    tui_render::TuiRender,
};

const SELECTED_STYLE: Style = Style::new().bg(SLATE.c800).add_modifier(Modifier::BOLD);

#[derive(Debug, Default)]
pub struct Tui {
    exit: bool,
    component_list: ComponentList,
    selected_items: Vec<String>,
}

impl Tui {
    pub fn new() -> Self {
        Self {
            exit: false,
            component_list: ComponentList::new(),
            selected_items: Vec::new(),
        }
    }
    fn exit(&mut self) {
        self.exit = true;
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
                    Status::Select => {
                        self.selected_items
                            .retain(|x| x != &self.component_list.components[i].title);
                        Status::UnSelect
                    }
                    Status::UnSelect => {
                        self.selected_items
                            .push(self.component_list.components.get(i).unwrap().title.clone());
                        Status::Select
                    }
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

    fn render_selected_item(&self, area: Rect, buf: &mut Buffer) {
        let info = if let Some(select_index) = self.component_list.state.selected() {
            self.component_list.components[select_index].info.clone()
        } else {
            "Nothing selected...".to_string()
        };

        let block = Block::bordered().title(" Info ").border_set(border::THICK);

        Paragraph::new(info)
            .block(block)
            .wrap(Wrap { trim: false })
            .render(area, buf);
    }

    fn render_status(&self, area: Rect, buf: &mut Buffer) {
        // let select_state = format!()
        let state_show = format!("Select components {:?}", &self.selected_items);
        let block = Block::bordered().title(" State ").border_set(border::THICK);

        Paragraph::new(state_show)
            .block(block)
            .wrap(Wrap { trim: false })
            .render(area, buf);
    }
}

impl Widget for &mut Tui {
    fn render(self, area: ratatui::prelude::Rect, buf: &mut ratatui::prelude::Buffer) {
        let (comment, outer, inner) = split_area(area);

        Paragraph::new("Use 'j/k' to move, 'g/G' to go top/bottom, Space to toggle.")
            .style(Style::default().fg(Color::Red))
            .centered()
            .render(comment[1], buf);

        self.render_list(outer[0], buf);

        self.render_selected_item(inner[0], buf);

        self.render_status(inner[1], buf);
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
