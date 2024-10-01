use crossterm::event::{self, Event, KeyEvent, KeyEventKind};
use ratatui::{DefaultTerminal, Frame};
pub trait TuiRender {
    fn handle_events(&mut self) -> Result<(), std::io::Error> {
        match event::read()? {
            // it's important to check that the event is a key press event as
            // crossterm also emits key release and repeat events on Windows.
            Event::Key(key_event) if key_event.kind == KeyEventKind::Press => {
                self.handle_key_event(key_event)
            }
            _ => {}
        };
        Ok(())
    }

    fn run(&mut self, terminal: &mut DefaultTerminal) -> Result<(), std::io::Error>;

    fn draw(&self, frame: &mut Frame);

    fn handle_key_event(&mut self, key_event: KeyEvent);
}
