use ratatui::widgets::Widget;

pub struct Tui {
    exit: bool,
}

impl Tui {
    fn exit(&mut self) {
        self.exit = true;
    }
}

impl Widget for &Tui {
    fn render(self, area: ratatui::prelude::Rect, buf: &mut ratatui::prelude::Buffer)
    where
        Self: Sized,
    {
    }
}
