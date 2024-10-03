use std::io;

use cli::utils::tui::{tui_render::TuiRender, tui::Tui};

fn main() -> io::Result<()> {
    let mut terminal = ratatui::init();
    let app_result = Tui::new().run(&mut terminal);
    ratatui::restore();
    app_result
}
