use crossterm::{
    event::{KeyCode, KeyEvent},
    style::Stylize,
};
use ratatui::{
    style::{Color, Style},
    symbols::border,
    widgets::{Block, Paragraph, Widget},
};

use super::{render_layout::render_layout, split_area::split_area, tui_render::TuiRender};

#[derive(Debug, Default)]
pub struct Wrapper {
    counter: u8,
    exit: bool,
}

impl Wrapper {
    fn exit(&mut self) {
        self.exit = true;
    }

    fn increment_counter(&mut self) {
        self.counter += 1;
    }

    fn decrement_counter(&mut self) {
        self.counter -= 1;
    }
}

impl Widget for &Wrapper {
    fn render(self, area: ratatui::prelude::Rect, buf: &mut ratatui::prelude::Buffer) {
        let (comment, outer, inner) = split_area(area);

        Paragraph::new("Use ↓↑ to move, ← to unselect, → to change status, g/G to go top/bottom.")
            .style(Style::default().fg(Color::Red))
            .centered()
            .render(comment[1], buf);

        let block = Block::bordered()
            .title(" Select Components ")
            .border_set(border::THICK);
        Paragraph::new("")
            .centered()
            .block(block)
            .render(outer[0], buf);

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
    }
}

impl TuiRender for Wrapper {
    fn draw(&self, frame: &mut ratatui::Frame) {
        frame.render_widget(self, frame.area());
    }

    fn run(&mut self, terminal: &mut ratatui::DefaultTerminal) -> Result<(), std::io::Error> {
        while !self.exit {
            terminal.draw(|frame| self.draw(frame))?;
            self.handle_events()?;
        }
        Ok(())
    }

    fn handle_key_event(&mut self, key_event: KeyEvent) {
        match key_event.code {
            KeyCode::Char('q') => self.exit(),
            KeyCode::Left => self.decrement_counter(),
            KeyCode::Right => self.increment_counter(),
            _ => {}
        }
    }
}
