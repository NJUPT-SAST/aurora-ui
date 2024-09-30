use ratatui::{DefaultTerminal, Frame};

pub trait TuiBase {
    fn run(&mut self, terminal: &mut DefaultTerminal) -> Result<(), std::io::Error> {
        Ok(())
    }

    fn handle_event(&mut self) -> Result<(), std::io::Error> {
        Ok(())
    }

    fn draw(&self, frame: &mut Frame) {}
}
