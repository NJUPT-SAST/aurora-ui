use ratatui::{DefaultTerminal, Frame};
pub trait TuiBase {
    fn run(&mut self, terminal: &mut DefaultTerminal) -> Result<(), std::io::Error>;

    fn handle_events(&mut self) -> Result<(), std::io::Error>;

    fn draw(&self, frame: &mut Frame);
}
